import { ZodError } from "zod";

export class ZodUtils {
	static collectErrors(error: ZodError, delim: string = "\n"): string {
		return error.issues.map((issue) => issue.message).join(delim) || "Invalid input";
	}
}