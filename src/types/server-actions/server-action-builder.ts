import z from "zod";
import { ServerActionResponse } from "./server-action-response";
import { ZodUtils } from "@/lib/utils/zod-utils";

type ServerActionFunction<Params, Response> = (prevState: unknown, params: Params) => Promise<ServerActionResponse<Response>>;

export class ServerActionBuilder<P, R> {
    private fn: ServerActionFunction<P, R>;

    private constructor(fn: ServerActionFunction<P, R>) {
        this.fn = fn;
    }

    static init<P, R>(fn: ServerActionFunction<P, R>) {
        return new ServerActionBuilder<P, R>(fn);
    }

    withParamsValidator(schema: z.ZodType<P>): this {
        const currentFn = this.fn;
        this.fn = async (prevState: unknown, params: P): Promise<ServerActionResponse<R>> => {
            const parsed = schema.safeParse(params);
            if (!parsed.success) {
                return {
                    success: false,
                    error: ZodUtils.collectErrors(parsed.error),
                };
            }
            return currentFn(prevState, parsed.data);
        };
        return this;
    }

    withTryCatch(): this {
        const currentFn = this.fn;
        this.fn = async (prevState: unknown, params: P): Promise<ServerActionResponse<R>> => {
            try {
                return await currentFn(prevState, params);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ValidationError') {
                        return {
                            success: false,
                            error: 'Validation failed: ' + error.message
                        };
                    }
                    if (
                        error.name === 'MongoServerError' &&
                        (error as { code?: number }).code === 11000
                    ) {
                        return {
                            success: false,
                            error: 'A template with this key already exists'
                        };
                    }
                }
                return {
                    success: false,
                    error: 'Failed to create template. Please try again.'
                };
            }
        };
        return this;
    }

    build(): ServerActionFunction<P, R> {
        return this.fn;
    }
}
