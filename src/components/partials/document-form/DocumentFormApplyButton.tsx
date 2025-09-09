"use client";

import React from 'react'
import { useDocumentFormContext } from './document-form.context';
import { DownloadDocxUtils } from '@/lib/client/download-docx';

export default function DocumentFormApplyButton({
    fileBase64String
}: {
    fileBase64String: string;
}) {
    const { handleApplyTemplate } = useDocumentFormContext();

    const handleClick = () => {
        const buffer = handleApplyTemplate(fileBase64String);
        DownloadDocxUtils.downloadFromBuffer(buffer);
    };

    return (
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-4">
            Apply
        </button>
    )
}
