import { pdf } from "pdf-to-img";

export class PDFToImageService {
    static async convertPdfToPngBufferArray(pdfBuffer: Buffer): Promise<Buffer[]> {
        const pngBuffers: Buffer[] = [];
        const document = await pdf(pdfBuffer, { scale: 3 });
        for await (const image of document) {
            pngBuffers.push(image);
        }
        return pngBuffers;
    }

    static async convertPdfToPngBufferByPageNumber(pdfBuffer: Buffer, pageNumber: number = 1): Promise<Buffer> {
        const document = await pdf(pdfBuffer, {
            scale: 3,
        });
        const pageBuffer = await document.getPage(pageNumber);
        return pageBuffer;
    }
}