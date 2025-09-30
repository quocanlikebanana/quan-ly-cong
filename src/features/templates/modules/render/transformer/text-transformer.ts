import z from "zod";
import { TextFieldRenderMetaType } from "../../../schemas/field-render-meta.schema";
import { ITransformer } from "./transformer.i";

export class TextTransformer implements ITransformer {
    constructor(
        private readonly meta: TextFieldRenderMetaType,
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

