// This file is only meant to be used in a server environment
// Because it uses Node.js 'fs' module and file system access is not available in the browser

import { LocalFileInfra } from "@/infra/local-file/local-file.infra";
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
        const docxTemplateFilePath = path.resolve(key, FileNameAsConst.template);
        const pdfDisplayFilePath = path.resolve(key, FileNameAsConst.display);
        const imagePreviewFilePath = path.resolve(key, FileNameAsConst.preview);
        LocalFileInfra.writeFile(fileBuffer, docxTemplateFilePath);
        LocalFileInfra.writeFile(fileBuffer, pdfDisplayFilePath);
        LocalFileInfra.writeFile(fileBuffer, imagePreviewFilePath);
        return { key };
    }

    readTemplate(key: string): ArrayBuffer | null {
        const docxTemplateFilePath = path.resolve(key, FileNameAsConst.template);
        return LocalFileInfra.readFile(docxTemplateFilePath);
    }

    readDisplay(key: string): ArrayBuffer | null {
        const pdfDisplayFilePath = path.resolve(key, FileNameAsConst.display);
        return LocalFileInfra.readFile(pdfDisplayFilePath);
    }

    readPreview(key: string): ArrayBuffer | null {
        const imagePreviewFilePath = path.resolve(key, FileNameAsConst.preview);
        return LocalFileInfra.readFile(imagePreviewFilePath);
    }
}
