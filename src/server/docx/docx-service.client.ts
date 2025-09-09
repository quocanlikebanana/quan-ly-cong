import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module.js";

export class DocxServiceClient {
	private static inspectModule = new InspectModule();

	static renderDocxFile(json: unknown, docFileBinary: string): Buffer<ArrayBufferLike> {
		const zip = new PizZip(docFileBinary);
		const doc = new Docxtemplater(zip, {
			modules: [this.inspectModule],
			paragraphLoop: true,
			linebreaks: true,
			delimiters: {
				start: "{{",
				end: "}}",
			}
		});
		doc.render(json);
		const buffer = doc.toBuffer();
		return buffer;
	}
}

