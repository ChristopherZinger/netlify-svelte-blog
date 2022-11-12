import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

export const appUser = writable<null | User>(null);
