export type ServerActionResponse<T = { id: string }> = {
	success: true;
	data: T;
} | {
	success: false;
	error: string;
}
