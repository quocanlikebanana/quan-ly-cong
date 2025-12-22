import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module.js";

export class DocxRenderInfra {
	private static inspectModule = new InspectModule();

	static render(docFileBinary: ArrayBuffer, jsonData: unknown): Buffer<ArrayBufferLike> {
		try {
			const zip = new PizZip(docFileBinary);
			const doc = new Docxtemplater(zip, {
				modules: [DocxRenderInfra.inspectModule],
				paragraphLoop: true,
				linebreaks: true,
				delimiters: {
					start: "{{",
					end: "}}",
				},
				nullGetter: (part) => {
					/**
					 * console.log(part);
					 * E.g value of part: 
					{
						type: 'placeholder',
						value: 'so',
						offset: 42,
						endLindex: 178,
						lIndex: 178
					} 
					*/
					return `{{${part.value || ""}}}`;
				}
			});
			doc.render(jsonData);
			const buffer = doc.toBuffer();
			return buffer;
		}
		catch (error) {
			console.error("Error rendering docx template:", error);
			throw error;
		}
	}
}

