import PdfAllPagesViewer from '@/components/atoms/PdfAllPagesViewer';
import { FileUtils } from '@/lib/utils/file-utils';
import { TemplateFileService } from '@/services/template-file/template-file.service';
import React from 'react'

export default async function TemplateDocxView({
    storageKey,
}: {
    storageKey: string;
}) {
    const pdfArrayBuffer = TemplateFileService.getInstance().readDisplay(storageKey);
    const pdfBufferString = pdfArrayBuffer ? FileUtils.arrayBufferToBase64(pdfArrayBuffer) : null;

    // Pass base64 data directly to react-pdf (more efficient)
    const base64Data = `data:application/pdf;base64,${pdfBufferString || ''}`;

    return (
        <PdfAllPagesViewer binaryString={base64Data} />
    );
}
