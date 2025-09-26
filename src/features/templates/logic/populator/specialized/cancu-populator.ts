import { PopulatorBase } from "../populator.base";

const canCuTransformer = (value: string): string => {
    return `$Căn cứ ${value}`;
}

export class CancuPopulator extends PopulatorBase {
    constructor(
        private readonly values: string[],
    ) { super(); }

    getKey(): string {
        return "can_cu";
    }

    replace(): Record<string, unknown> {
        const transformed = this.values.map(v => canCuTransformer(v));
        return {
            [this.getKey()]: transformed,
        };
    }
}