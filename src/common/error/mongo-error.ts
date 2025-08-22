export class MongoError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MongoError";
	}

	static isDuplicateKeyError(error: any): boolean {
		return error && error.code === 11000;
	}
}