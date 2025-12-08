import z from "zod";
import { IRenderTransformer } from "../common/render-transformer.i";
import { RenderArrayFieldMetaType } from "../common/render-fields.schema";

/**
 * Apply prefix and suffix to each string item in the array
 */
export class ArrayTransformer implements IRenderTransformer {
    constructor(
        private readonly meta: RenderArrayFieldMetaType
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
