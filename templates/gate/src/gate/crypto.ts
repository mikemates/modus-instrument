/* The browser half of the password gate: make the key from the password, the same way the build did
   (PBKDF2-SHA-256 → AES-256-GCM), and open what the build sealed: a 12-byte IV, then the ciphertext and its tag. */

const bytes = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const base64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));

/** Web Crypto is there in every current browser, on https and on localhost. */
export const supported = () => typeof window !== 'undefined' && !!window.crypto?.subtle && window.isSecureContext;

export async function deriveKey(password: string, salt: string, iterations: number): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: bytes(salt), iterations, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
}

/** Opens a sealed payload. A wrong key fails the tag check and throws. */
export function unseal(sealed: ArrayBuffer | Uint8Array, key: CryptoKey): Promise<ArrayBuffer> {
  const all = sealed instanceof Uint8Array ? sealed : new Uint8Array(sealed);
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: all.slice(0, 12) }, key, all.slice(12));
}

export const sealedFrom = (b64: string) => bytes(b64);

/** "Remember on this device" keeps the key, not the password. */
export const exportKey = async (key: CryptoKey) => base64(await crypto.subtle.exportKey('raw', key));
export const importKey = (raw: string) => crypto.subtle.importKey('raw', bytes(raw), { name: 'AES-GCM' }, true, ['decrypt']);
