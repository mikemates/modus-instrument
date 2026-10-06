/* The entry page's words. Kept apart from the site's own copy: the gate can't share modules with the encrypted site.
   Edit freely; keep [Prospect] until the client is confirmed. */
export const gateCopy = {
  /** The site's name. A password manager files the password under it. */
  product: '__TITLE__',
  /** A tag above the claim, such as "Preview" or "Example". Leave it empty to show none. */
  tag: 'Preview',
  cover: {
    claim: 'Prepared for [Prospect].',
    lede: 'Enter the password you were sent to open it.',
  },
  formTitle: 'Open the prototype',
  password: 'Password',
  show: 'Show',
  hide: 'Hide',
  showLabel: 'Show password',
  hideLabel: 'Hide password',
  submit: 'Open the prototype',
  opening: 'Opening…',
  openingNote: 'Opening the prototype…',
  remember: 'Remember on this device',
  /** Who to ask for the password. Leave `email` empty to show no help line. The address is shown as well as linked: a
      mail link does nothing in a browser with no email app set up. */
  help: { lead: 'Need the password?', name: '', email: '', subject: 'Access to __TITLE__' },
  copy: 'Copy',
  copyHidden: ' email address',
  copied: 'Copied',
  copiedNote: 'Email address copied',
  selected: 'Selected',
  selectedNote: 'Email address selected. Copy it with Ctrl+C or ⌘C.',
  /** An optional list of what's inside, one line each. Leave it empty to show none. */
  insideLabel: 'Inside',
  inside: [] as { name: string; line: string }[],
  /** A line under the cover (or under what's inside), such as "An example by Modus Create". Leave it empty to show none. */
  footer: '',
  errors: {
    empty: 'Enter the password to open the prototype.',
    wrong: 'That password didn’t work. Check it and try again.',
    network: 'The prototype couldn’t load. Check your connection and try again.',
    unsupported: 'This browser can’t open the prototype. Try a current version of Chrome, Edge, Firefox or Safari.',
    insecure: 'The prototype only opens over a secure link. Use the https:// address you were sent.',
  },
};
