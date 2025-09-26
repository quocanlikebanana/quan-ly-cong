import { PopulatorBase } from "../populator.base";

export class TextPopulator extends PopulatorBase {
    constructor(
        private readonly key: string,
        private readonly value: string,
    ) { super(); }

    getKey(): string {
        return this.key;
    }

    replace(): Record<string, unknown> {
        return {
            [this.key]: this.value,
        }
    }
}