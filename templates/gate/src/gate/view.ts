/* The entry page's markup: a cover and the form, in the book's tokens and type. Wide screens set the cover beside the
   form; phones stack them. Plain HTML, not React: the gate stays small and can't share modules with the encrypted site. */
import { gateCopy as copy } from './copy';
import { WORDMARK } from './logo-paths';

const logo = `<svg viewBox="${WORDMARK.viewBox}" fill="currentColor" role="img" aria-label="Modus Create" focusable="false" class="block h-[18px] w-auto shrink-0 self-start text-logo sm:h-[22px]">${WORDMARK.paths.map((d) => `<path d="${d}"/>`).join('')}</svg>`;

const tag = copy.tag
  ? `<div class="flex"><span class="inline-flex shrink-0 items-center whitespace-nowrap rounded-tag border border-control-edge px-[7px] py-[3px] text-tag uppercase text-ink">${copy.tag}</span></div>`
  : '';

export const warnIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-[3px] shrink-0"><path d="M7 1.8 13 12.2H1L7 1.8Z"/><path d="M7 5.8v3M7 10.6v.01"/></svg>`;

/** The password form: the field with a Show toggle, the error line (announced), Remember, and the violet button.
    The hidden username names the password for a password manager. */
const form = `
  <form id="gate-form" novalidate class="flex flex-col gap-4">
    <input type="text" name="username" autocomplete="username" value="${copy.product}" hidden />
    <div class="flex flex-col gap-2">
      <label for="gate-password" class="text-body font-semibold text-ink">${copy.password}</label>
      <div class="relative">
        <input id="gate-password" name="password" type="password" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" aria-describedby="gate-about gate-error"
          class="h-12 w-full rounded-control border border-control-edge bg-panel pl-4 pr-[76px] font-body text-ui-m text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-negative disabled:cursor-not-allowed" />
        <button id="gate-show" type="button" aria-label="${copy.showLabel}" aria-controls="gate-password"
          class="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 cursor-pointer rounded-pill px-3 font-body text-ui-s font-semibold text-ink-2 hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus disabled:cursor-not-allowed disabled:text-ink-3 disabled:hover:bg-transparent">${copy.show}</button>
      </div>
      <p id="gate-error" role="alert" class="m-0 flex gap-2 text-body leading-snug text-negative empty:hidden"></p>
    </div>
    <label class="flex cursor-pointer items-center gap-2.5 self-start text-body text-ink-2">
      <input id="gate-remember" type="checkbox" checked class="size-4 cursor-pointer accent-[var(--color-action)]" />${copy.remember}
    </label>
    <button id="gate-submit" type="submit"
      class="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-pill bg-action px-6 font-body text-ui-m font-semibold text-on-action transition-colors duration-150 hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus aria-disabled:cursor-progress disabled:cursor-not-allowed disabled:border disabled:border-dashed disabled:border-hairline-strong disabled:bg-transparent disabled:text-ink-3">${copy.submit}</button>
  </form>`;

const mailto = `mailto:${copy.help.email}?subject=${encodeURIComponent(copy.help.subject)}`;
/** Who to ask, when there's someone: the address shown as well as linked, with Copy beside it. */
const help = copy.help.email
  ? `
  <p class="m-0 text-body leading-relaxed text-ink-2">
    ${copy.help.lead} Email ${copy.help.name ? `${copy.help.name} at` : ''}
    <a href="${mailto}" class="font-semibold text-ink underline decoration-hairline-strong underline-offset-[3px] hover:text-signal-text hover:decoration-current">${copy.help.email}</a>
    <button id="gate-copy" type="button" class="ml-0.5 inline-flex h-7 cursor-pointer items-center rounded-pill px-2.5 align-middle font-body text-ui-s font-semibold text-ink-2 hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"><span>${copy.copy}</span><span class="sr-only">${copy.copyHidden}</span></button>
    <span id="gate-copied" role="status" class="sr-only"></span>
  </p>`
  : '';

const inside = copy.inside.length
  ? `
  <div class="flex flex-col gap-3">
    <span class="mi-label text-ink-3">${copy.insideLabel}</span>
    <ul class="m-0 grid list-none grid-cols-1 gap-x-10 p-0 sm:grid-cols-2">
      ${copy.inside.map((c) => `<li class="flex flex-col gap-0.5 border-t border-hairline py-3"><span class="text-ui-m font-semibold text-ink">${c.name}</span><span class="text-body text-ink-2">${c.line}</span></li>`).join('')}
    </ul>
  </div>`
  : '';

/* Wide screens: the cover on the left (with what's inside under it, if listed), the form on the right. Phones: the cover,
   the form, then what's inside. */
export const page = `
  <main class="grid min-h-screen grid-cols-1 bg-ground lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
    <section class="mi-dots flex flex-col gap-10 border-hairline px-4 pb-10 pt-8 sm:px-10 sm:pt-10 lg:col-start-1 lg:row-start-1 lg:justify-between lg:border-r lg:px-16 lg:pb-8 lg:pt-12">
      ${logo}
      <div class="flex flex-col gap-6">
        ${tag}
        <h1 class="m-0 max-w-[14em] text-[length:var(--layout-hero)] font-normal leading-[1.03] tracking-[-0.04em] text-ink">${copy.cover.claim}</h1>
        <p id="gate-about" class="m-0 mi-measure text-body-l text-ink-2">${copy.cover.lede}</p>
      </div>
    </section>
    <section aria-labelledby="gate-title" class="flex flex-col justify-center border-t border-hairline px-4 py-10 sm:px-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-t-0 lg:px-14">
      <div class="flex w-full max-w-[400px] flex-col gap-6">
        <h2 id="gate-title" class="m-0 text-title text-ink">${copy.formTitle}</h2>
        <div data-gate-body>${form}</div>
        ${help}
      </div>
    </section>
    ${inside || copy.footer ? `<section class="mi-dots border-t border-hairline px-4 pb-10 pt-8 sm:px-10 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-t-0 lg:px-16 lg:pb-10 lg:pt-6">
      ${inside}
      ${copy.footer ? `<p class="m-0 ${inside ? 'pt-6' : ''} text-caption text-ink-3">${copy.footer}</p>` : ''}
    </section>` : ''}
  </main>`;

/** While a remembered key opens the site (and only if that's slow), the form gives way to one quiet line. */
export const openingNote = `<p class="m-0 text-ui-m text-ink-2" role="status">${copy.openingNote}</p>`;
