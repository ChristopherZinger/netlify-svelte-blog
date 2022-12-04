import { BREAKPOINTS, SCREEN_SIZES } from '$lib/utils/screen-size-utils';
import { derived, writable } from 'svelte/store';

export const screenWidth = writable<null | number>(null);

export const screenSize = derived(screenWidth, ($width) => {
	if (!$width) {
		return SCREEN_SIZES.sm;
	} else if ($width >= BREAKPOINTS[SCREEN_SIZES.lg]) {
		return SCREEN_SIZES.lg;
	} else if ($width >= BREAKPOINTS[SCREEN_SIZES.md]) {
		return SCREEN_SIZES.md;
	} else {
		return SCREEN_SIZES.sm;
	}
});
