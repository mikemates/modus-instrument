/* The entry page: the page's first script, before the site. It asks for the password, makes the key, opens the
   encrypted site and runs it; "Remember on this device" keeps the key so the reader isn't asked again. The page's
   styles and fonts load here, so the entry page and the site share them. */
import '@fontsource-variable/manrope';
import '../styles/index.css';
import { gateCopy as copy } from './copy';
import { deriveKey, exportKey, importKey, sealedFrom, supported, unseal } from './crypto';
import { openingNote, page, warnIcon } from './view';

type Config =
  | { mode: 'dev'; check: string; salt: string; iterations: number }
  | { mode: 'build'; payload: string; salt: string; iterations: number };

const config = JSON.parse(document.getElementById('gate-config')?.textContent || '{}') as Config;
const STORE = 'modus-gate';
const root = document.getElementById('gate')!;

/** The site couldn't be fetched. */
class NetworkError extends Error {}
/** The password was right, but this browser couldn't run the site. */
class RunError extends Error {}

/** Opens and runs the site with this key. A wrong key fails AES-GCM's tag check, so it throws before anything runs. */
async function openSite(key: CryptoKey) {
  if (config.mode === 'dev') {
    const ok = new TextDecoder().decode(await unseal(sealedFrom(config.check), key));
    if (ok !== 'ok') throw new Error('wrong');
    // Development only: the site's modules load as usual. A build leaves this line out.
    if (import.meta.env.DEV) await import('../main');
    return;
  }
  let sealed: ArrayBuffer;
  try {
    const res = await fetch(config.payload);
    if (!res.ok) throw new Error(String(res.status));
    sealed = await res.arrayBuffer();
  } catch {
    throw new NetworkError();
  }
  const code = await unseal(sealed, key);
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  try {
    await import(/* @vite-ignore */ url);
  } catch (err) {
    console.error(err);
    throw new RunError();
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** The browser's storage, where it's allowed: reading `localStorage` itself throws when a browser blocks it. */
const stores = () => {
  const found: Storage[] = [];
  try { found.push(localStorage); } catch { /* blocked */ }
  try { found.push(sessionStorage); } catch { /* blocked */ }
  return found;
};
const remembered = (): string | null => {
  for (const store of stores()) {
    try {
      const saved = JSON.parse(store.getItem(STORE) || 'null') as { salt: string; key: string } | null;
      if (saved?.salt === config.salt) return saved.key;
    } catch { /* unreadable */ }
  }
  return null;
};
/** Keeps the key, not the password: on this device with Remember ticked, otherwise until the tab closes. */
const remember = async (key: CryptoKey, keep: boolean) => {
  try {
    const value = JSON.stringify({ salt: config.salt, key: await exportKey(key) });
    (keep ? localStorage : sessionStorage).setItem(STORE, value);
  } catch { /* storage unavailable: the reader will be asked next time */ }
};
const forget = () => { for (const s of stores()) try { s.removeItem(STORE); } catch { /* ignore */ } };

/** The site is running: the entry page steps aside, and the site starts from the top like any page (a phone reader may
    have scrolled down to the form). This runs before the site's first render, so a link to a section still lands there. */
const done = () => { root.remove(); window.scrollTo(0, 0); };

/** Copy beside the contact's address puts it on the clipboard. Where the browser won't allow that, it selects the address so
    the reader can copy it themselves. */
function wireCopy() {
  const button = root.querySelector<HTMLButtonElement>('#gate-copy');
  const status = root.querySelector<HTMLElement>('#gate-copied');
  const word = button?.firstElementChild;
  if (!button || !status || !word) return;
  let reset = 0;
  button.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(copy.help.email);
      copied = true;
    } catch {
      const link = root.querySelector('a[href^="mailto:"]');
      const selection = window.getSelection();
      if (link && selection) {
        const range = document.createRange();
        range.selectNodeContents(link);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    word.textContent = copied ? copy.copied : copy.selected;
    status.textContent = copied ? copy.copiedNote : copy.selectedNote;
    window.clearTimeout(reset);
    reset = window.setTimeout(() => { word.textContent = copy.copy; status.textContent = ''; }, 2500);
  });
}

/** Puts the entry page on screen. */
function render() {
  root.innerHTML = page;
  wireCopy();
}

/** Shows the entry page, ready for the password. `notice` explains why a returning reader is being asked. */
function showForm(notice?: string) {
  render();
  const form = root.querySelector<HTMLFormElement>('#gate-form')!;
  const input = root.querySelector<HTMLInputElement>('#gate-password')!;
  const show = root.querySelector<HTMLButtonElement>('#gate-show')!;
  const error = root.querySelector<HTMLParagraphElement>('#gate-error')!;
  const submit = root.querySelector<HTMLButtonElement>('#gate-submit')!;
  const keep = root.querySelector<HTMLInputElement>('#gate-remember')!;

  /** The line under the field. `invalid` outlines the field too, for a password that needs fixing. */
  const say = (message: string, invalid = true) => {
    error.innerHTML = message ? `${warnIcon}<span>${message}</span>` : '';
    input.setAttribute('aria-invalid', message && invalid ? 'true' : 'false');
  };
  const busy = (on: boolean) => {
    submit.setAttribute('aria-disabled', String(on));
    submit.textContent = on ? copy.opening : copy.submit;
    form.setAttribute('aria-busy', String(on));
  };

  show.addEventListener('click', () => {
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    show.textContent = reveal ? copy.hide : copy.show;
    show.setAttribute('aria-label', reveal ? copy.hideLabel : copy.showLabel);
    input.focus();
  });
  input.addEventListener('input', () => { if (error.textContent) say(''); });

  // Disabled with a reason: without Web Crypto the site can't be opened here, so say why and what to do.
  if (!supported()) {
    say(window.isSecureContext === false ? copy.errors.insecure : copy.errors.unsupported, false);
    for (const el of [input, show, submit, keep]) el.disabled = true;
    return;
  }
  if (notice) say(notice, false);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    const password = input.value;
    if (!password) { say(copy.errors.empty); input.focus(); return; }
    say('');
    busy(true);
    try {
      const key = await deriveKey(password, config.salt, config.iterations);
      await openSite(key);
      done();
      void remember(key, keep.checked);
    } catch (err) {
      busy(false);
      if (err instanceof NetworkError) say(copy.errors.network, false);
      else if (err instanceof RunError) say(copy.errors.unsupported, false);
      else say(copy.errors.wrong);
      input.focus();
      input.select();
    }
  });
  // Ready to type, without scrolling past the cover on a short phone.
  input.focus({ preventScroll: true });
}

async function start() {
  const saved = supported() ? remembered() : null;
  if (!saved) return showForm();
  // A returning reader goes straight in. The entry page only shows, with a quiet "Opening…" line, if that's slow.
  const slow = setTimeout(() => {
    render();
    const body = root.querySelector('[data-gate-body]');
    if (body) body.innerHTML = openingNote;
  }, 400);
  try {
    await openSite(await importKey(saved));
    clearTimeout(slow);
    done();
  } catch (err) {
    clearTimeout(slow);
    if (err instanceof NetworkError) return showForm(copy.errors.network);
    if (err instanceof RunError) return showForm(copy.errors.unsupported);
    // The password has changed since this device remembered it: ask again.
    forget();
    showForm();
  }
}

void start();
