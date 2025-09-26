export abstract class PopulatorBase {
    constructor() { }
    abstract getKey(): string;
    abstract replace(): Record<string, unknown>;
}
