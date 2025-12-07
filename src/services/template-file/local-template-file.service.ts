// This file is only meant to be used in a server environment
// Because it uses Node.js 'fs' module and file system access is not available in the browser

import { LocalFileInfra } from "@/infra/local-file/local-file.infra";
import { PDFExportInfra } from "@/infra/pdf-export/pdf-export.infra";
import { PDFToImageInfra } from "@/infra/pdf-to-image/pdf-to-image.infra";
import path from "path";

const FileNameAsConst = {
    template: "template.docx",
    preview: "preview.png",
    display: "display.pdf"
} as const;

export class LocalTemplateFileService {
    private getKey(): string {
        const uniqueKey = `${new Date().toISOString().replace(/[:.]/g, "-")}-${Math.random().toString(36).substring(2, 15)}`;
        return uniqueKey;
    }

    async write(file: File): Promise<{ key: string; }> {
        const key = this.getKey();
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // NOTE: Use path.join not path.resolve to create file paths for writing
        // path.resolve would create absolute paths which may not be desired here
        const docxTemplateFilePath = path.join(key, FileNameAsConst.template);
        const pdfDisplayFilePath = path.join(key, FileNameAsConst.display);
        const imagePreviewFilePath = path.join(key, FileNameAsConst.preview);

        LocalFileInfra.writeFile(fileBuffer, docxTemplateFilePath);

        const pdfBuffer = await PDFExportInfra.generatePdfPreviewFromDocxBuffer(fileBuffer);
        LocalFileInfra.writeFile(pdfBuffer, pdfDisplayFilePath);

        const imagePreviewBuffer = await PDFToImageInfra.convertPdfToPngBufferByPageNumber(pdfBuffer, 1);
        LocalFileInfra.writeFile(imagePreviewBuffer, imagePreviewFilePath);
        return { key };
    }

    readTemplate(key: string): ArrayBuffer | null {
        const docxTemplateFilePath = path.join(key, FileNameAsConst.template);
        return LocalFileInfra.readFile(docxTemplateFilePath);
    }

    readDisplay(key: string): ArrayBuffer | null {
        const pdfDisplayFilePath = path.join(key, FileNameAsConst.display);
        const arrayBuffer = LocalFileInfra.readFile(pdfDisplayFilePath);
        return arrayBuffer;
    }

    readPreview(key: string): ArrayBuffer | null {
        const imagePreviewFilePath = path.join(key, FileNameAsConst.preview);
        const arrayBuffer = LocalFileInfra.readFile(imagePreviewFilePath);
        return arrayBuffer;
    }
}
