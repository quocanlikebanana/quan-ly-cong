import { FileTransport } from '@/infra/file-transport'
import React from 'react'
import DownloadButton from './DownloadButton'

export default async function page() {
    const fileBase64String = await FileTransport.readDocxFile("BIEU MAU XU LY VPHC.docx", "local");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">DOCX File Test</h1>
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Base64 String (truncated):</p>
                <code className="block p-2 bg-gray-100 rounded text-xs overflow-hidden">
                    {fileBase64String.substring(0, 100)}...
                </code>
            </div>
            <DownloadButton base64String={fileBase64String} fileName="BIEU_MAU_XU_LY_VPHC.docx" />
        </div>
    )
}
