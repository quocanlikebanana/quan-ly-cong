import { DateOnly } from "@/features/shared/date.type";
import { PopulatorBase } from "../populator.base";

export class ShortDatePopulator extends PopulatorBase {
    constructor(
        private readonly key: string,
        private readonly value: DateOnly,
    ) { super(); }

    getKey(): string {
        return this.key;
    }

    replace(): Record<string, unknown> {
        const string = `${this.value.day.toString().padStart(2, '0')}/${this.value.month.toString().padStart(2, '0')}/${this.value.year}`;
        return {
            [this.getKey()]: string,
        }
    }
}

