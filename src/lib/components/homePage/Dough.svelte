<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CANVAS_HEIGHT,
		CANVAS_WIDTH,
		CAMERA_Z,
		ASCII_RAMP,
		luminance,
		luminanceToChar,
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
	let sceneCanvas: HTMLCanvasElement;
	let sceneCtx: CanvasRenderingContext2D | null = null;
	let asciiMode = true;
	// ASCII resolution controls
	let charSize = 6; // width in pixels (smaller → higher resolution)
	let charW: number;
	let charH: number;
	$: charW = charSize;
	$: charH = Math.round(charSize * 1.5); // keep typical monospace aspect
	let imgData: ImageData | null = null;
	let rowBuffer: string[] = [];
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
		// basic vector helpers for lighting
		const sub = (a: Vec3, b: Vec3): Vec3 => ({
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z
		});
		const cross = (a: Vec3, b: Vec3): Vec3 => ({
			x: a.y * b.z - a.z * b.y,
			y: a.z * b.x - a.x * b.z,
			z: a.x * b.y - a.y * b.x
		});
		const dot = (a: Vec3, b: Vec3): number =>
			a.x * b.x + a.y * b.y + a.z * b.z;
		const norm = (v: Vec3): Vec3 => {
			const m = Math.hypot(v.x, v.y, v.z) || 1;
			return { x: v.x / m, y: v.y / m, z: v.z / m };
		};
		const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
		// camera position in world space (matching projection)
		const cameraPos: Vec3 = { x: 0, y: 0, z: -CAMERA_Z };

		const getClosestPoint = (face: Face) => {
			return Math.max(face[0].z, face[1].z, face[2].z);
		};

		const facesBackToFront = dough.sort((a, b) => {
			return getClosestPoint(b) - getClosestPoint(a);
		});

		const projectedFaces = facesBackToFront.map((face) => {
			// face normal for lighting
			const e1 = sub(face[1], face[0]);
			const e2 = sub(face[2], face[0]);
			let n = norm(cross(e1, e2));
			// two-sided: flip normal to face camera if needed
			const centroid: Vec3 = {
				x: (face[0].x + face[1].x + face[2].x) / 3,
				y: (face[0].y + face[1].y + face[2].y) / 3,
				z: (face[0].z + face[1].z + face[2].z) / 3
			};
			const toCamera = norm(sub(cameraPos, centroid)); // light from camera
			if (dot(n, toCamera) < 0) {
				n = { x: -n.x, y: -n.y, z: -n.z };
			}
			const intensity = clamp01(dot(n, toCamera));
			// ambient + diffuse (darken overall)
			const ambient = 0.2;
			const diffuse = 0.5;
			const brightness = clamp01(ambient + diffuse * intensity);
			const v = Math.floor(brightness * 255);
			const fillStyle = `rgb(${v},${v},${v})`;
			return {
				points: [
					toScreen(face[0]),
					toScreen(face[1]),
					toScreen(face[2])
				],
				fillStyle
			};
		});

		projectedFaces.forEach(({ points, fillStyle }) => {
			renderPolygonFill(ctx, points, fillStyle);
			// renderPolygonStroke(ctx, points);
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
		points: Vec2[],
		fillStyle: string = 'red'
	) {
		ctx.fillStyle = fillStyle;
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

	function drawScene(target: CanvasRenderingContext2D, t: number) {
		// clear the scene each frame and fill a solid background
		target.clearRect(
			0,
			0,
			canvasSettings.width,
			canvasSettings.height
		);
		target.fillStyle = 'white';
		target.fillRect(
			0,
			0,
			canvasSettings.width,
			canvasSettings.height
		);

		const d = rotateDough(
			rotateDough(
				rotateDough(
					moveDough(
						createDoughPts({
							circle: { radius: 50, segments: 30 },
							dough: { radius: 120, segments: 100 }
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

		renderDoughFaces(target, dFaces);

		// renderDoughWireframe(ctx, d);
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		// create offscreen scene canvas
		sceneCanvas = document.createElement('canvas');
		sceneCanvas.width = canvasSettings.width;
		sceneCanvas.height = canvasSettings.height;
		sceneCtx = sceneCanvas.getContext('2d');
		if (!sceneCtx) return;

		let t = 0;
		const loop = () => {
			// draw raw scene into offscreen
			drawScene(sceneCtx as CanvasRenderingContext2D, t);
			// ASCII pass or normal mirror
			ctx.clearRect(
				0,
				0,
				canvasSettings.width,
				canvasSettings.height
			);
			if (asciiMode) {
				// build ASCII rows
				const { width, height } = canvasSettings;
				// reuse ImageData buffer if possible
				imgData =
					imgData ??
					(sceneCtx as CanvasRenderingContext2D).getImageData(
						0,
						0,
						width,
						height
					);
				(sceneCtx as CanvasRenderingContext2D).drawImage(
					sceneCanvas,
					0,
					0
				);
				imgData = (sceneCtx as CanvasRenderingContext2D).getImageData(
					0,
					0,
					width,
					height
				);
				const data = imgData.data;
				rowBuffer.length = 0;
				ctx.fillStyle = 'black';
				ctx.textBaseline = 'top';
				ctx.font = `${charH}px monospace`;
				for (let y = 0; y < height; y += charH) {
					let row = '';
					for (let x = 0; x < width; x += charW) {
						// center sample of the cell
						const sx = Math.min(width - 1, x + (charW >> 1));
						const sy = Math.min(height - 1, y + (charH >> 1));
						const idx = (sy * width + sx) * 4;
						const r = data[idx];
						const g = data[idx + 1];
						const b = data[idx + 2];
						const lum = luminance(r, g, b);
						row += luminanceToChar(lum, ASCII_RAMP);
					}
					rowBuffer.push(row);
					ctx.fillText(row, 0, y);
				}
			} else {
				// mirror scene
				ctx.drawImage(sceneCanvas, 0, 0);
			}
			t += 0.01;
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	});
</script>

<canvas
	bind:this={canvas}
	width={canvasSettings.width}
	height={canvasSettings.height}
	style="border: 1px solid black;"
/>

<div class="mt-2">
	<button
		on:click={() => (asciiMode = !asciiMode)}
		class="px-2 py-1 border rounded"
	>
		Toggle ASCII: {asciiMode ? 'ON' : 'OFF'}
	</button>
	<span class="ml-2 text-sm">Cell {charW}×{charH}</span>
	<button
		class="ml-3 px-2 py-1 border rounded"
		on:click={() => (charSize = Math.max(3, charSize - 1))}
	>
		Finer
	</button>
	<button
		class="ml-2 px-2 py-1 border rounded"
		on:click={() => (charSize = Math.min(24, charSize + 1))}
	>
		Coarser
	</button>
</div>
