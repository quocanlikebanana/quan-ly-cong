import "server-only";

const GOTENBERG_URL = process.env.GOTENBERG_URL || "https://demo.gotenberg.dev/";

export class PDFExportGotenbergService {
    async convertDocxToPdf(docxBuffer: Buffer): Promise<Buffer> {
        const form = new FormData();
        form.append("files", new Blob([new Uint8Array(docxBuffer)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), "document.docx");

        const result = await fetch(`${GOTENBERG_URL}forms/libreoffice/convert`, {
            method: "POST",
            body: form
        })
        if (!result.ok) {
            throw new Error(`Gotenberg conversion failed with status ${result.status}`);
        }
        const pdfBuffer = Buffer.from(await result.arrayBuffer());
        return pdfBuffer;
    }
}

