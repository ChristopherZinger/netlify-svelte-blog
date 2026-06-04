<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CANVAS_HEIGHT,
		CANVAS_WIDTH,
		type Face,
		moveBy,
		rotate,
		toScreen,
		type Vec2,
		type Vec3
	} from './geom-utils';
	import {
		createDoughFaces,
		createDoughPts,
		createDoughWireframeFaces
	} from './dough-utils';

	let canvas: HTMLCanvasElement;
	const canvasSettings = {
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	};

	const flipMatrix = <T>(matrix: T[][]) => {
		return matrix.reduce((acc: T[][], innerMatrix): T[][] => {
			innerMatrix.forEach((point, pIdx) => {
				if (!acc[pIdx]) {
					acc[pIdx] = [];
				}
				acc[pIdx].push(point);
			});
			return acc;
		}, []);
	};

	function renderDoughFaces(
		ctx: CanvasRenderingContext2D,
		dough: Face[]
	) {
		const getClosestPoint = (face: Face) => {
			return Math.max(face[0].z, face[1].z, face[2].z);
		};

		const facesBackToFront = dough.sort((a, b) => {
			return getClosestPoint(b) - getClosestPoint(a);
		});

		const projectedFaces = facesBackToFront.map((face) => {
			return [
				toScreen(face[0]),
				toScreen(face[1]),
				toScreen(face[2])
			];
		});

		projectedFaces.forEach((face) => {
			renderPolygonFill(ctx, face);
			renderPolygonStroke(ctx, face);
		});
	}

	function renderDoughWireframe(
		ctx: CanvasRenderingContext2D,
		dough: Vec3[][]
	) {
		const doughProjected = dough.map((circle) =>
			circle.map(toScreen)
		);

		doughProjected.forEach((circle) => {
			renderPolygonStroke(ctx, circle);
		});

		const flippedMatrix = flipMatrix(doughProjected);

		flippedMatrix.forEach((circle) => {
			renderPolygonStroke(ctx, circle);
		});
	}

	function renderPolygonFill(
		ctx: CanvasRenderingContext2D,
		points: Vec2[]
	) {
		ctx.fillStyle = 'red';
		ctx.beginPath();
		points.forEach((point) => {
			ctx.lineTo(point.x, point.y);
		});
		ctx.closePath();
		ctx.fill();
	}

	function renderPolygonStroke(
		ctx: CanvasRenderingContext2D,
		points: Vec2[]
	) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		points.forEach((point) => {
			ctx.lineTo(point.x, point.y);
		});
		ctx.closePath();
		ctx.stroke();
	}

	function rotateDough(
		dough: Vec3[][],
		axis: 'x' | 'y' | 'z',
		radian: number
	) {
		return dough.map((circle) => {
			return circle.map((point) => {
				return rotate(point, axis, radian);
			});
		});
	}

	function moveDough(dough: Vec3[][], vec: Vec3) {
		return dough.map((circle) => {
			return circle.map((point) => {
				return moveBy({ point, vec });
			});
		});
	}

	function draw(ctx: CanvasRenderingContext2D, t: number) {
		// clear the canvas each frame
		ctx.clearRect(0, 0, canvasSettings.width, canvasSettings.height);

		const d = rotateDough(
			rotateDough(
				rotateDough(
					moveDough(
						createDoughPts({
							circle: { radius: 50, segments: 12 },
							dough: { radius: 140, segments: 30 }
						}),
						{ x: 0, y: 0, z: 100 }
					),
					'x',
					t / 2
				),
				'y',
				t
			),
			'z',
			t / 10
		);

		const dFaces = createDoughWireframeFaces(d);

		renderDoughFaces(ctx, dFaces);

		// renderDoughWireframe(ctx, d);
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		let t = 0;
		setInterval(() => {
			draw(ctx, t);
			t += 0.01;
		}, 10);
	});
</script>

<canvas
	bind:this={canvas}
	width={canvasSettings.width}
	height={canvasSettings.height}
	style="border: 1px solid black;"
/>
