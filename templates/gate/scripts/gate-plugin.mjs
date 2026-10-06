// The password gate's build step. The site's code (src/main.tsx and everything it imports) is built as its own file,
// then encrypted with AES-256-GCM under a key made from the password (PBKDF2-SHA-256). Only the encrypted file ships.
// The entry page (src/gate/) asks for the password, makes the same key in the browser, decrypts the file and runs it.
// Without the password nothing can be read, on any host.
//
// In `npm run dev` the gate works the same way, against a small encrypted check instead of the whole site.
import { createCipheriv, createHash, pbkdf2Sync, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import gate from '../gate.config.mjs';

const CONFIG_TAG = /<script type="application\/json" id="gate-config">[^<]*<\/script>/;
const SENTINELS = gate.sentinels ?? [];

/** Encrypts bytes for the gate: a fresh 12-byte IV, then AES-256-GCM's ciphertext and tag, as WebCrypto reads them. */
function seal(plain, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([iv, body, cipher.getAuthTag()]);
}

export function gatePlugin() {
  if (!gate.password || gate.password.length < 12) throw new Error('gate.config.mjs: the password must be at least 12 characters.');
  const key = pbkdf2Sync(gate.password, Buffer.from(gate.salt, 'base64'), gate.iterations, 32, 'sha256');
  const params = { salt: gate.salt, iterations: gate.iterations };
  let outDir = 'dist';
  let base = '/';
  let payload = null;

  return {
    name: 'modus-gate',
    // The site builds as a second entry, separate from the entry page, so it can be encrypted on its own.
    config(_, env) {
      if (env.command === 'build') return { build: { sourcemap: false, rollupOptions: { input: { index: 'index.html', site: 'src/main.tsx' } } } };
    },
    configResolved(c) { outDir = resolve(c.root, c.build.outDir); base = c.base; },
    // Dev: the gate checks the password against an encrypted "ok", then loads the site's modules as usual.
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.server) return html;
        const check = seal(Buffer.from('ok'), key).toString('base64');
        return html.replace(CONFIG_TAG, `<script type="application/json" id="gate-config">${JSON.stringify({ mode: 'dev', check, ...params })}</script>`);
      },
    },
    generateBundle(_, bundle) {
      const site = Object.values(bundle).find((f) => f.type === 'chunk' && f.isEntry && f.name === 'site');
      if (!site) this.error('The gate found no site chunk to encrypt.');
      // Loaded from memory, the site can't fetch other chunks: it has to be one self-contained file.
      if (site.imports.length || site.dynamicImports.length) this.error(`The site must build as one file, but it imports ${[...site.imports, ...site.dynamicImports].join(', ')}. Don't import the site's modules from src/gate/.`);
      const sealed = seal(Buffer.from(site.code, 'utf8'), key);
      const name = `assets/site-${createHash('sha256').update(sealed).digest('hex').slice(0, 10)}.bin`;
      delete bundle[site.fileName];
      for (const f of Object.keys(bundle)) if (f.startsWith(site.fileName)) delete bundle[f];
      this.emitFile({ type: 'asset', fileName: name, source: sealed });
      payload = `${base}${name}`;
      // Nothing else may carry the site's content in plain text.
      for (const f of Object.values(bundle)) {
        const text = f.type === 'chunk' ? f.code : typeof f.source === 'string' ? f.source : null;
        const hit = text && SENTINELS.find((s) => text.includes(s));
        if (hit) this.error(`${f.fileName} carries the site's content in plain text ("${hit}"). The entry page must not import the site's modules.`);
      }
    },
    // Last, once every file is written: tell the entry page where the encrypted site is.
    writeBundle() {
      const file = join(outDir, 'index.html');
      const html = readFileSync(file, 'utf8');
      if (!CONFIG_TAG.test(html)) throw new Error('index.html has lost its gate-config tag.');
      writeFileSync(file, html.replace(CONFIG_TAG, `<script type="application/json" id="gate-config">${JSON.stringify({ mode: 'build', payload, ...params })}</script>`));
      for (const s of SENTINELS) if (html.includes(s)) throw new Error(`index.html carries the site's content in plain text ("${s}").`);
    },
  };
}
