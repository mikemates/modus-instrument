import { clsx, type ClassValue } from 'clsx';

/** Joins class names. Components put their own classes first so a consumer's className can extend them. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
