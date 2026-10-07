// Builds the Design System artifact's files from this codebase, so the two never drift.
//   npm run ds:build  →  design-system-dist/project/…  (then publish those files to the Design System artifact)
// Output: tokens.json, README.md (brand book), fonts/, components/bundle.js + bundle.css + index.d.ts + lib/,
//         components/<Name>/README.md + preview.html for every entry in scripts/ds-spec.mjs, components/Cover/.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { components, NAMESPACE } from './ds-spec.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'design-system-dist/project');
const w = (p, s) => { mkdirSync(dirname(join(out, p)), { recursive: true }); writeFileSync(join(out, p), s); };
rmSync(resolve(root, 'design-system-dist'), { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Tokens and the brand book
cpSync(resolve(root, 'tokens/tokens.json'), join(out, 'tokens.json'));
cpSync(resolve(root, 'design-system/README.md'), join(out, 'README.md'));
cpSync(resolve(root, 'design-system/Cover.preview.html'), join(out, 'components/Cover/preview.html'), { recursive: true });
// Logos: the SVGs are uploaded to the artifact's asset store (the index records them); only the group's README is a file.
cpSync(resolve(root, 'design-system/assets/Logos/README.md'), join(out, 'assets/Logos/README.md'));

// 2. Fonts: the files tokens.json lists, from kit/brand-fonts
for (const f of JSON.parse(readFileSync(resolve(root, 'tokens/tokens.json'), 'utf8')).type.fonts) cpSync(resolve(root, 'kit/brand-fonts', f.file.replace(/^fonts\//, '')), join(out, f.file));

// 3. The component bundle: one classic script assigning window.ModusInstrument, React from the page's globals
const reactGlobals = {
  name: 'react-globals',
  setup(b) {
    b.onResolve({ filter: /^(react|react-dom|react-dom\/client|react\/jsx-runtime|react\/jsx-dev-runtime)$/ }, (a) => ({ path: a.path, namespace: 'g' }));
    b.onLoad({ filter: /.*/, namespace: 'g' }, (a) => {
      if (a.path === 'react') return { contents: 'module.exports = window.React;', loader: 'js' };
      if (a.path.startsWith('react-dom')) return { contents: 'module.exports = window.ReactDOM;', loader: 'js' };
      return {
        contents: 'var R = window.React; function jsx(t, p, k) { return k === undefined ? R.createElement(t, p) : R.createElement(t, Object.assign({}, p, { key: k })); } module.exports = { jsx: jsx, jsxs: jsx, jsxDEV: jsx, Fragment: R.Fragment };',
        loader: 'js',
      };
    });
  },
};
const result = await build({
  entryPoints: [resolve(root, 'src/index.ts')],
  bundle: true, format: 'iife', globalName: NAMESPACE, platform: 'browser', target: 'es2019', minify: true, write: false,
  jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, plugins: [reactGlobals], logLevel: 'warning',
});
let js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '\\x3C!--');
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: NAMESPACE, components: components.map((c) => ({ name: c.name })) })} */\n`;
w('components/bundle.js', header + js);

// 4. The stylesheet, compiled against the token NAMES only (values come from the page's tokens.css)
const cssTmp = join(tmpdir(), 'mi-ds.css');
execFileSync('npx', ['@tailwindcss/cli', '-i', resolve(root, 'src/styles/design-system.css'), '-o', cssTmp, '--minify'], { cwd: root, stdio: 'pipe' });
const css = readFileSync(cssTmp, 'utf8');
if (/<\/style/i.test(css)) throw new Error('bundle.css contains </style');
w('components/bundle.css', css);

// 5. React 18 UMD builds so previews are live without a CDN
const libTmp = join(tmpdir(), 'mi-react18');
rmSync(libTmp, { recursive: true, force: true });
mkdirSync(libTmp, { recursive: true });
execFileSync('npm', ['pack', 'react@18.3.1', 'react-dom@18.3.1', '--silent'], { cwd: libTmp, stdio: 'pipe' });
for (const tgz of readdirSync(libTmp).filter((f) => f.endsWith('.tgz'))) execFileSync('tar', ['-xzf', tgz, '-C', libTmp, '--one-top-level=' + tgz.replace('.tgz', '')], { cwd: libTmp });
const pkgDir = (n) => join(libTmp, readdirSync(libTmp).find((d) => d.startsWith(n + '-') && !d.endsWith('.tgz')), 'package');
w('components/lib/react.production.min.js', readFileSync(join(pkgDir('react'), 'umd/react.production.min.js'), 'utf8'));
w('components/lib/react-dom.production.min.js', readFileSync(join(pkgDir('react-dom'), 'umd/react-dom.production.min.js'), 'utf8'));

// 6. Types as documentation: every exported interface and type alias from the source
const srcFiles = ['components/Logo.tsx', 'components/Button.tsx', 'components/Primitives.tsx', 'components/Controls.tsx', 'components/States.tsx', 'components/Accordion.tsx', 'patterns/Cards.tsx', 'patterns/Navigation.tsx', 'patterns/Chapters.tsx', 'patterns/Maps.tsx', 'patterns/Benchmarks.tsx', 'patterns/RoiModel.tsx', 'patterns/roi.ts'];
const decls = [];
for (const f of srcFiles) {
  const src = readFileSync(resolve(root, 'src', f), 'utf8');
  const re = /export (interface|type) [\s\S]*?(?=\nexport |\n(?:const|function|\/\*)|$)/g;
  for (const m of src.match(re) ?? []) {
    let block = m.trim();
    if (block.startsWith('export interface')) {
      let depth = 0, end = 0;
      for (let i = block.indexOf('{'); i < block.length; i++) { if (block[i] === '{') depth++; if (block[i] === '}') { depth--; if (!depth) { end = i + 1; break; } } }
      block = block.slice(0, end);
    } else block = block.split('\n')[0];
    decls.push(`// from src/${f}\n${block.replace(/^export /, 'export declare ').replace('declare interface', 'interface').replace('declare type', 'type')}`);
  }
}
w('components/index.d.ts', `/* Modus Instrument — prop types, generated from src/ by scripts/build-design-system.mjs. Documentation, not type-checked. */\nimport type { ReactNode, ComponentProps } from 'react';\n\n${decls.join('\n\n')}\n`);

// 7. A README and a live preview per component
const esc = (s) => s.replace(/"/g, '&quot;');
for (const c of components) {
  const list = (xs) => xs.map((x) => `- ${x}`).join('\n');
  w(`components/${c.name}/README.md`, `# ${c.name}\n\n${c.summary}\n\n## When to use\n\n${list(c.use)}\n\n## Avoid\n\n${list(c.avoid)}\n\n## What you provide\n\n${c.provides}\n\n## Import\n\n\`\`\`tsx\nimport { ${c.name} } from '@/index'; // or window.${NAMESPACE}.${c.name} from the bundle\n\`\`\`\n`);
  w(`components/${c.name}/preview.html`, `<!-- @dsCard group="${esc(c.group)}" height=${c.height}${c.width ? ` width=${c.width}` : ''} -->
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>${c.name} — preview</title>
<style>body{margin:0;padding:24px;background:var(--color-ground);color:var(--color-ink);font-family:var(--font-body)}</style>
</head>
<body>
<div id="root"></div>
<script>
var M = window.${NAMESPACE}, h = React.createElement, S = M.samples;
ReactDOM.createRoot(document.getElementById('root')).render(${c.preview});
</script>
</body>
</html>
`);
}

// 8. Report
const count = (d) => readdirSync(d, { recursive: true }).filter((f) => !existsSync(join(d, f)) || !readdirSync(dirname(join(d, f))).includes(f) || true).length;
console.log(`design system → ${out}\n  ${components.length} components · bundle ${(js.length / 1024).toFixed(0)} KB · css ${(css.length / 1024).toFixed(0)} KB · ${count(out)} entries`);
