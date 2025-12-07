import { pdf } from "pdf-to-img";

export class PDFToImageInfra {
    static async convertPdfToPngBufferByPageNumber(pdfBuffer: Buffer, pageNumber: number = 1): Promise<Buffer> {
        const document = await pdf(pdfBuffer, {
            scale: 3,
        });
        const pageBuffer = await document.getPage(pageNumber);
        return pageBuffer;
    }
}