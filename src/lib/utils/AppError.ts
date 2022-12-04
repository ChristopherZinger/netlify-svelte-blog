export class AppError extends Error {
	errorName: string;
	info?: Record<string, unknown>;

	constructor(errorName: string, info?: Record<string, unknown>) {
		super(errorName);
		this.errorName = errorName;
		this.info = info;
	}
}
