"use client"

import { TemplateTextFieldView } from '@/features/templates/views/schema'
import React, { useCallback, useState } from 'react'
import TextFieldItem from './TextFieldItem';
import { DocxTemplaterRenderer } from '@/features/templates/modules/render/renderer/docxtemplater-renderer';
import { DownloadDocxUtils } from '@/client/utils/download-docx';

export default function DocumentFormContainer({
    fields,
    fileBase64String,
}: {
    fields: TemplateTextFieldView[];
    fileBase64String: string;
}) {
    const [formData, setFormData] = useState<Record<string, string | undefined>>({});

    const handleValueChange = useCallback((key: string, value: string | undefined) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleApplyTemplate = useCallback(() => {
        const binaryString = atob(fileBase64String);
        const fileBuffer = DocxTemplaterRenderer.renderDocxFile(formData, binaryString);
        DownloadDocxUtils.downloadFromBuffer(fileBuffer);
    }, [formData, fileBase64String]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Document Form</h1>
            {fields.map(field => (
                <TextFieldItem
                    key={field.key}
                    field={field}
                    value={formData[field.key] || ''}
                    onValueChange={value => handleValueChange(field.key, value)}
                />
            ))}

            <button onClick={handleApplyTemplate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-4">
                Apply
            </button>
        </div>
    )
}
