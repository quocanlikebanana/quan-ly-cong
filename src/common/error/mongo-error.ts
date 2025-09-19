export class MongoError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MongoError";
	}

	static isDuplicateKeyError(error: unknown): boolean {
		return (
			typeof error === 'object' &&
			error !== null &&
			'code' in error &&
			error.code === 11000
		);
	}
}