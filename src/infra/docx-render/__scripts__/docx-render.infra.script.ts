/**
 * bun run --conditions=react-server src/infra/docx-render/__scripts__/docx-render.infra.script.ts
 */

import { writeFileSync, readFileSync } from "fs";
import { cwd } from "process";
import path from "path";

async function main() {
    const dir = path.join(cwd(), "src", "infra", "docx-render", "__scripts__");

    const { DocxRenderInfra } = await import("../docx-render.infra.js");
    const docFileBinary = readFileSync(path.join(dir, "sample.docx"), "binary");
    const jsonData = {
        "caccu1": "John Doe",
    };

    const outputBuffer = DocxRenderInfra.render(docFileBinary, jsonData);
    writeFileSync(path.join(dir, "ouput.docx"), outputBuffer);
    console.log("Document generated: output.docx");
}

main().catch((error) => {
    console.error("Error generating document:", error);
});

