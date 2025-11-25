import z from "zod";
import { ArrayFieldRenderMetaType } from "../../../types/field-render-meta.schema";
import { ITransformer } from "./transformer.i";

/**
 * Apply prefix and suffix to each string item in the array
 */
export class ArrayTransformer implements ITransformer {
    constructor(
        private readonly meta: ArrayFieldRenderMetaType
    ) { }

    transform(value: unknown): unknown {
        const arrayValue = z.array(z.string()).safeParse(value);
        if (!arrayValue.success) {
            return undefined;
        }
        if (!this.meta) {
            return arrayValue.data;
        }
        const { prefix, suffix } = this.meta;
        const mappedValues = arrayValue.data.map(item => `${prefix ?? ""}${item}${suffix ?? ""}`);
        return mappedValues;
    }
}
