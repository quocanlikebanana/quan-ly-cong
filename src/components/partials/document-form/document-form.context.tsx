"use client";

import { DocxServiceClient } from '@/server/docx/docx-service.client';
import React, { useCallback } from 'react'

const DocumentFormContext = React.createContext<{
    formData: Record<string, string | undefined>;
    handleValueChange: (key: string, value: string | undefined) => void;
    handleApplyTemplate: (fileBase64String: string) => Buffer<ArrayBufferLike>;
} | undefined>(undefined);

export default function DocumentFormContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [formData, setFormData] = React.useState<Record<string, string | undefined>>({});

    const handleValueChange = useCallback((key: string, value: string | undefined) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleApplyTemplate = useCallback((fileBase64String: string) => {
        const fileBuffer = DocxServiceClient.renderDocxFile(formData, fileBase64String);
        return fileBuffer;
    }, [formData]);

    return (
        <DocumentFormContext.Provider
            value={{
                formData,
                handleValueChange,
                handleApplyTemplate,
            }}
        >
            {children}
        </DocumentFormContext.Provider>
    );
}

export function useDocumentFormContext() {
    const context = React.useContext(DocumentFormContext);
    if (!context) {
        throw new Error('useConvertContext must be used within a ConvertContextProvider');
    }
    return context;
}

