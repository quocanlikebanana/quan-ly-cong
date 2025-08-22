import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module.js";
const inspectModule = new InspectModule();

export class DocxService {
	static renderDocxFile(json: any, docFileBinary: string) {
		const zip = new PizZip(docFileBinary);
		const doc = new Docxtemplater(zip, {
			modules: [inspectModule],
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