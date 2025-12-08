import z from "zod";
import { IRenderTransformer } from "../common/render-transformer.i";
import { RenderTextFieldMetaType } from "../common/render-fields.schema";

export class TextTransformer implements IRenderTransformer {
    constructor(
        private readonly meta: RenderTextFieldMetaType,
    ) { }

    transform(value: unknown): unknown {
        if (!this.meta) {
            return value;
        }
        const { prefix, suffix } = this.meta;
        const stringValue = z.string().safeParse(value);
        if (!stringValue.success) {
            return undefined;
        }
        return `${prefix ?? ""}${stringValue.data}${suffix ?? ""}`;
    }
}

