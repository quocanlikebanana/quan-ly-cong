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