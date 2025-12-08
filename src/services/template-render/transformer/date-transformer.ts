import { DateOnlySchema } from "@/features/shared/date.type";
import { IRenderTransformer } from "../common/render-transformer.i";
import { RenderDateFieldMetaType } from "../common/render-fields.schema";

/**
 * Transform dateOnly to formatted string
 */
export class DateTransformer implements IRenderTransformer {
    constructor(
        private readonly meta: RenderDateFieldMetaType,
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