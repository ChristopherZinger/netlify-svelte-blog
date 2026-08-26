export type Vec3 = { x: number; y: number; z: number };
export type Vec2 = { x: number; y: number };
export type Face = [Vec3, Vec3, Vec3];

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 600;
export const FOCAL_LENGTH = 500; // perspective focal length
export const CAMERA_Z = 400; // camera distance from origin
export const ASCII_RAMP = '@%#*+=-:. ';

export function luminance(r: number, g: number, b: number): number {
	// 0..255 perceived brightness
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function luminanceToChar(
	lum: number,
	ramp: string = ASCII_RAMP
): string {
	const n = ramp.length - 1;
	const idx = Math.max(0, Math.min(n, Math.floor((lum / 255) * n)));
	return ramp[idx];
}

export function toScreen(v: Vec3): Vec2 {
	const z = v.z + CAMERA_Z;
	const safeZ = z === 0 ? Number.EPSILON : z;
	const x = (v.x * FOCAL_LENGTH) / safeZ;

	// invert y because canvas y increases downward
	const y = (-v.y * FOCAL_LENGTH) / safeZ;
	return { x: x + CANVAS_WIDTH / 2, y: y + CANVAS_HEIGHT / 2 };
}

export function rotateX(v: Vec3, r: number): Vec3 {
	const c = Math.cos(r);
	const s = Math.sin(r);
	return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

export function rotateY(v: Vec3, r: number): Vec3 {
	const c = Math.cos(r);
	const s = Math.sin(r);
	return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

export function rotateZ(v: Vec3, r: number): Vec3 {
	const c = Math.cos(r);
	const s = Math.sin(r);
	return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
}

export function rotate(v: Vec3, axis: 'x' | 'y' | 'z', radian: number): Vec3 {
	switch (axis) {
		case 'x':
			return rotateX(v, radian);
		case 'y':
			return rotateY(v, radian);
		case 'z':
			return rotateZ(v, radian);
	}
}

function degToRad(deg: number): number {
	return deg * (Math.PI / 180);
}

export function moveBy({
	point,
	vec
}: {
	point: Vec3;
	vec: Vec3;
}): Vec3 {
	return {
		x: point.x + vec.x,
		y: point.y + vec.y,
		z: point.z + vec.z
	};
}
