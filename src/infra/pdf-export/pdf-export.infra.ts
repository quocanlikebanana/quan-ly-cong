/**
 * This is server only service for PDF export functionality.
 * Because it uses environment variables
 * And it may use internal docker network to access Gotenberg service in the future.
 */
import "server-only";

const GOTENBERG_URL = process.env.GOTENBERG_URL || "https://demo.gotenberg.dev/";

export class PDFExportInfra {
    static async generatePdfPreviewFromDocxBuffer(docxBuffer: Buffer): Promise<Buffer> {
        const form = new FormData();
        form.append("files", new Blob([new Uint8Array(docxBuffer)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), "document.docx");

        // Make the request to Gotenberg (hosted version)
        // Will call to internal Gotenberg service (docker) if the usage is high.
        const result = await fetch(`${GOTENBERG_URL}forms/libreoffice/convert`, {
            method: "POST",
            body: form
        });

        if (!result.ok) {
            throw new Error(`Gotenberg conversion failed with status ${result.status}`);
        }
        const pdfBuffer = Buffer.from(await result.arrayBuffer());
        return pdfBuffer;
    }
}