/**
 * bun run --conditions=react-server src/infra/pdf/pdf-export/__scripts__/gotenberg.service.script.ts
 */

import fs from "fs";
import path from "path";
import { PDFExportGotenbergService } from "../pdf-export-gotenberg.service";
import { cwd } from "process";

async function testGotenbergConversion() {
    const currentWorkingDir = cwd();
    console.log("Current working directory:", currentWorkingDir);
    const baseDir = path.join(currentWorkingDir, "src/infra/pdf/pdf-export/__scripts__/");

    const docxFile = fs.readFileSync(path.join(baseDir, "sample.docx"));
    const docxBuffer = Buffer.from(docxFile);

    const pdfBufferPromise = await new PDFExportGotenbergService().convertDocxToPdf(docxBuffer);

    fs.writeFileSync(path.join(baseDir, "output.pdf"), pdfBufferPromise);
    console.log("PDF conversion successful, output.pdf created.");
}

testGotenbergConversion().catch((error) => {
    console.error("Error during PDF conversion:", error);
});
