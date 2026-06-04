import {
	moveBy,
	rotateY,
	rotateZ,
	type Vec3,
	type Face
} from './geom-utils';

const createCircle = (radius: number, segments: number): Vec3[] => {
	const p0 = { x: 0, y: radius, z: 0 };
	const points = [];
	for (let i = 0; i < segments; i++) {
		const angleRad = (i / segments) * 2 * Math.PI;
		const p = rotateZ(p0, angleRad);
		points.push(p);
	}
	return points;
};

type DoughInfo = {
	circle: { radius: number; segments: number };
	dough: { radius: number; segments: number };
};

export const createDoughPts = ({
	circle,
	dough
}: DoughInfo): Vec3[][] => {
	let c0 = createCircle(circle.radius, circle.segments);
	const doughRadius = dough.radius;
	c0 = c0.map((p) =>
		moveBy({ point: p, vec: { x: doughRadius, y: 0, z: 0 } })
	);

	const doughPoints = [];
	for (let i = 0; i < dough.segments; i++) {
		const angleRad = (i / dough.segments) * 2 * Math.PI;
		const p = c0.map((p) => rotateY(p, angleRad));
		doughPoints.push(p);
	}
	return doughPoints;
};

export function createDoughFaces(info: DoughInfo): Face[] {
	const doughPts = createDoughPts(info);
	return createDoughWireframeFaces(doughPts);
}

export function createDoughWireframeFaces(doughPts: Vec3[][]): Face[] {
	const doughFaces: Face[] = [];
	doughPts.forEach((circle, cIdx) => {
		let nextCircle = doughPts[cIdx + 1];
		if (!nextCircle) {
			nextCircle = doughPts[0];
		}

		circle.forEach((point, pIdx) => {
			{
				const p2 = nextCircle[pIdx];
				let p3 = circle[pIdx + 1];
				if (!p3) {
					p3 = circle[0];
				}
				doughFaces.push([point, p2, p3]);
			}
			{
				let p1 = nextCircle[pIdx + 1];
				if (!p1) {
					p1 = nextCircle[0];
				}
				let p2 = circle[pIdx + 1];
				if (!p2) {
					p2 = circle[0];
				}
				const p3 = nextCircle[pIdx];
				doughFaces.push([p1, p2, p3]);
			}
		});
	});

	return doughFaces;
}
