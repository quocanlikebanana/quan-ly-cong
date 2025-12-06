import { PDFExportGotenbergService } from "./pdf-export-gotenberg.service";

export class PDFExportService {
    static gotenbergService = new PDFExportGotenbergService();

    static async generatePdfPreviewFromDocxBuffer(docxBuffer: Buffer): Promise<Buffer> {
        return await this.gotenbergService.convertDocxToPdf(docxBuffer);
    }
}