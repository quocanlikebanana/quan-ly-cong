import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module.js";
import { IRendererBase } from "./renderer.base";

export class DocxTemplaterRenderer implements IRendererBase {
	private static inspectModule = new InspectModule();

	constructor(
		private readonly docFileBinary: string,
		private readonly jsonData: unknown,
	) { }

	render(): Buffer<ArrayBufferLike> {
		const zip = new PizZip(this.docFileBinary);
		const doc = new Docxtemplater(zip, {
			modules: [DocxTemplaterRenderer.inspectModule],
			paragraphLoop: true,
			linebreaks: true,
			delimiters: {
				start: "{{",
				end: "}}",
			}
		});
		doc.render(this.jsonData);
		const buffer = doc.toBuffer();
		return buffer;
	}
}

