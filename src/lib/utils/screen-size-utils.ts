export enum SCREEN_SIZES {
	sm = 'sm',
	md = 'md',
	lg = 'lg'
}

export const BREAKPOINTS: Record<SCREEN_SIZES, number> = {
	[SCREEN_SIZES.sm]: 0,
	[SCREEN_SIZES.md]: 768,
	[SCREEN_SIZES.lg]: 1024
};
