export class ContextError extends Error {
    constructor(contextName: string) {
        super(`ContextError: ${contextName} must be used within its Provider`);
        this.name = "ContextError";
    }
}