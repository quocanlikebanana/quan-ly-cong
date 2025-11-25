import { DateOnlySchema } from "@/features/shared/date.type";
import { DateFieldRenderMetaType } from "../../../types/field-render-meta.schema";
import { ITransformer } from "./transformer.i";

/**
 * Transform dateOnly to formatted string
 */
export class DateTransformer implements ITransformer {
    constructor(
        private readonly meta: DateFieldRenderMetaType,
    ) { }

    transform(value: unknown): unknown {
        const dateOnlyValue = DateOnlySchema.safeParse(value);
        if (!dateOnlyValue.success) {
            return undefined;
        }
        const { year, month, day } = dateOnlyValue.data;
        const format = this.meta?.format ?? "dd/MM/yyyy";
        switch (format) {
            case "dd/MM/yyyy":
                return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
            case "ngày__, tháng__, năm____":
                return `ngày ${day}, tháng ${month}, năm ${year}`;
            default:
                return undefined;
        }
    }
}