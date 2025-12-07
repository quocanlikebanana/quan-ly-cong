/**
 * bun run --conditions=react-server src/infra/pdf-to-image/__scripts__/pdf-to-image.infra.script.ts
 */

import fs from "fs";
import path from "path";
import { cwd } from "process";
import { PDFToImageInfra } from "../pdf-to-image.infra";

async function testPdfToImageService() {
    const currentWorkingDir = cwd();
    console.log("Current working directory:", currentWorkingDir);
    const baseDir = path.join(currentWorkingDir, "src/infra/pdf-to-image/__scripts__/");
    const pdfFile = fs.readFileSync(path.join(baseDir, "sample.pdf"));
    const pdfBuffer = Buffer.from(pdfFile);
    console.log("PDF Buffer Length:", pdfBuffer.length);

    const imageBuffer = await PDFToImageInfra.convertPdfToPngBufferByPageNumber(pdfBuffer, 1);
    console.log("Image Buffer Length:", imageBuffer.length);
    fs.writeFileSync(path.join(baseDir, "output-page-1.png"), imageBuffer);
    console.log("Image conversion successful, output-page-1.png created.");
}

testPdfToImageService().catch((error) => {
    console.error("Error during PDF to Image conversion test:", error);
});




