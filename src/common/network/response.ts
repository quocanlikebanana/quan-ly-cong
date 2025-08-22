export type ServerActionResponse<T = any> = {
	success: true;
	data: T;
} | {
	success: false;
	error: string;
}
