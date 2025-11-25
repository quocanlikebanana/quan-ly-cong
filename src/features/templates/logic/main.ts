import { TemplateValues } from "../types/field-schema";
import { DocxTemplaterRenderEngine } from "./render/engine/docxtemplater.render-engine";
import templateValuesComposer from "./render/template-values-composer";

export class TemplateModuleOchestrator {
    static render(templateValues: TemplateValues, docFileBinary: string): Buffer<ArrayBufferLike> {
        const composedValues = templateValuesComposer(templateValues);
        const docxtemplater = new DocxTemplaterRenderEngine(docFileBinary, composedValues);
        const buffer = docxtemplater.render();
        return buffer;
    }
}