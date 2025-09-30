import { TemplateValues } from "../schemas/field-schema";
import { DocxTemplaterRenderer } from "./render/renderer/docxtemplater-renderer";
import templateValuesComposer from "./render/template-values-composer";

export class TemplateModuleOchestrator {
    static render(templateValues: TemplateValues, docFileBinary: string): Buffer<ArrayBufferLike> {
        const composedValues = templateValuesComposer(templateValues);
        const docxtemplater = new DocxTemplaterRenderer(docFileBinary, composedValues);
        const buffer = docxtemplater.render();
        return buffer;
    }
}