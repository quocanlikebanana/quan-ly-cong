"use client"

import { TextFieldSchema } from '@/model/schema'
import React from 'react'
import TextFieldItem from '../../domain/TextFieldItem';
import { useDocumentFormContext } from './document-form.context';

export default function DocumentFormContainer({
    fields,
}: {
    fields: TextFieldSchema[];
}) {
    const { formData, handleValueChange } = useDocumentFormContext();
    return (
        <div>
            {fields.map(field => (
                <TextFieldItem
                    key={field.key}
                    field={field}
                    value={formData[field.key]}
                    onValueChange={value => handleValueChange(field.key, value)}
                />
            ))}
        </div>
    )
}
