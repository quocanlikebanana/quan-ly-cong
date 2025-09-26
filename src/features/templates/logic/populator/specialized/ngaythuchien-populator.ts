import { DateOnly } from "@/features/shared/date.type";
import { PopulatorBase } from "../populator.base";

export class NgayThucHienPopulator extends PopulatorBase {
    constructor(
        private readonly value: DateOnly,
    ) { super(); }

    getKey(): string {
        return "ngay_thuc_hien";
    }

    replace(): Record<string, unknown> {
        const string = `ngày ${this.value.day.toString().padStart(2, '0')}, tháng ${this.value.month.toString().padStart(2, '0')}, năm ${this.value.year}`;
        return {
            [this.getKey()]: string,
        }
    }
}