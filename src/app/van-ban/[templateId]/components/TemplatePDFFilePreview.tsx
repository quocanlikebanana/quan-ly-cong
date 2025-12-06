import PdfAllPagesViewer from '@/components/atoms/PdfAllPagesViewer';
import { FileTransport } from '@/infra/file-transport';
import React from 'react'

export default async function TemplateDocxView({
    storageKey,
}: {
    storageKey: string;
}) {
    const pdfDocument = await FileTransport.readPDFFile(storageKey);

    // Pass base64 data directly to react-pdf (more efficient)
    const base64Data = `data:application/pdf;base64,${pdfDocument}`;

    return (
        <div className="w-full h-[100vh] border rounded-md overflow-hidden">
            <PdfAllPagesViewer binaryString={base64Data} />
        </div>
    );
}
