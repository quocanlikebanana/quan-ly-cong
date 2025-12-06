/**
 * bun run --conditions=react-server src/infra/pdf/image-preview/__scripts__/pdf-to-image.service.script.ts
 */

import fs from "fs";
import path from "path";
import { cwd } from "process";
import { PDFToImageService } from "../../../pdf-to-image/pdf-to-image.service";

async function testPdfToImageService() {
    const currentWorkingDir = cwd();
    console.log("Current working directory:", currentWorkingDir);
    const baseDir = path.join(currentWorkingDir, "src/infra/pdf/image-preview/__scripts__/");
    const pdfFile = fs.readFileSync(path.join(baseDir, "sample.pdf"));
    const pdfBuffer = Buffer.from(pdfFile);
    console.log("PDF Buffer Length:", pdfBuffer.length);

    const image = PDFToImageService.convertPdfToPngBufferByPageNumber(pdfBuffer, 1);
    const imageBuffer = await image;
    console.log("Image Buffer Length:", imageBuffer.length);
    fs.writeFileSync(path.join(baseDir, "output-page-1.png"), imageBuffer);
    console.log("Image conversion successful, output-page-1.png created.");
}

testPdfToImageService().catch((error) => {
    console.error("Error during PDF to Image conversion test:", error);
});




