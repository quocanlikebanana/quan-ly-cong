import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module.js";

export class DocxRenderInfra {
	private static inspectModule = new InspectModule();

	static render(docFileBinary: string, jsonData: unknown): Buffer<ArrayBufferLike> {
		const zip = new PizZip(docFileBinary);
		const doc = new Docxtemplater(zip, {
			modules: [DocxRenderInfra.inspectModule],
			paragraphLoop: true,
			linebreaks: true,
			delimiters: {
				start: "{{",
				end: "}}",
			}
		});
		doc.render(jsonData);
		const buffer = doc.toBuffer();
		return buffer;
	}
}

