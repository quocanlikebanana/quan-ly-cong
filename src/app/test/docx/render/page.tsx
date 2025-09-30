import { FileTransport } from "@/infra/file-transport";
import DownloadButton from "./DownloadButton";
import { DocxTemplaterRenderer } from "@/features/templates/modules/render/renderer/docxtemplater-renderer";

export default async function page() {
    const fileBase64String = await FileTransport.readDocxFile("BIEU MAU XU LY VPHC.docx", "local");
    const convertBase64ToBinary = (base64: string): string => {
        return atob(base64);
    };
    const fileBinaryString = convertBase64ToBinary(fileBase64String);
    const rendered = DocxTemplaterRenderer.renderDocxFile({
        "cancu1": "Nghị định 123/2023/NĐ-CP",
        "cancu2": "Nghị định 124/2023/NĐ-CP",
    }, fileBinaryString);
    const convertBufferToBase64 = (buffer: Buffer<ArrayBufferLike>): string => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    const renderedBase64 = convertBufferToBase64(rendered);

    return (
        <div>
            <DownloadButton base64String={renderedBase64} fileName="BIEU_MAU_XU_LY_VPHC.docx" />
        </div>
    )
}
