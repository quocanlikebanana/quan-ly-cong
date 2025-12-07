export type ServerActionResponse<T = { id: string }> = {
	success: true;
	data: T;
} | {
	success: false;
	error: string;
} | {
	success: false;
	error: undefined;
};

export const DEFAULT_SERVER_ACTION_RESPONSE: ServerActionResponse = {
	success: false,
	error: undefined,
} as const;

export class ServerActionResponseEntity<T = { id: string }> {
	private constructor(
		public readonly response: ServerActionResponse<T>
	) { }

	static fromResponse<T>(response: ServerActionResponse<T>): ServerActionResponseEntity<T> {
		return new ServerActionResponseEntity<T>(response);
	}

	isSuccess(): this is { response: { success: true; data: T } } {
		return this.response.success === true;
	}

	isFailure(): this is { response: { success: false; error: string | undefined } } {
		return this.response.success === false;
	}

	isPending(): this is { response: { success: false; error: undefined } } {
		return this.response.success === false && this.response.error === undefined;
	}
}