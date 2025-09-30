import React from 'react'
import { samplesTextFields } from './samples'
import DocumentFormContainer from '../../../components/domain/DocumentFormContainer'
import { FileTransport } from '@/infra/file-transport'

export default async function page() {
    const fileBase64String = await FileTransport.readDocxFile("BIEU MAU XU LY VPHC.docx", "local");

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Schema Test</h1>
            <DocumentFormContainer
                fields={samplesTextFields}
                fileBase64String={fileBase64String}
            />
        </div>
    )
}
