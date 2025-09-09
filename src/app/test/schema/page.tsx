import React from 'react'
import { samplesTextFields } from './samples'
import DocumentFormContainer from '../../../components/partials/document-form/DocumentFormContainer'
import DocumentFormContextProvider from '@/components/partials/document-form/document-form.context'
import DocumentFormApplyButton from '@/components/partials/document-form/DocumentFormApplyButton'
import { DocxServiceServer } from '@/server/docx/docx-service.server'

export default async function page() {
    const fileBase64String = await DocxServiceServer.readDocxFile("BIEU MAU XU LY VPHC.docx", "local");

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Schema Test</h1>
            <DocumentFormContextProvider>
                <DocumentFormContainer fields={samplesTextFields} />
                <DocumentFormApplyButton fileBase64String={fileBase64String} />
            </DocumentFormContextProvider>
        </div>
    )
}
