/* The entry page's password. The build encrypts the site with a key made from it, so nothing can be read until it's
   entered, on any host. To change it, edit `password` (or set SITE_PASSWORD where the site is built), rebuild and send
   the new one: everyone is asked again. Anyone who can open this repository can read it, and the content too, so keep
   the repository private. */
export default {
  password: process.env.SITE_PASSWORD || '__PASSWORD__',
  /** Fixed, so a reader who chose "Remember on this device" isn't asked again after an update. */
  salt: '__SALT__',
  /** PBKDF2-SHA-256 rounds: slow enough to make guessing expensive, quick for one reader (well under a second on a laptop). */
  iterations: 600000,
  /** Two or three phrases that only appear inside the protected site (a headline, a client's term). The build stops if
      an unencrypted file carries one, which catches the entry page importing the site's modules by mistake. */
  sentinels: [],
};
