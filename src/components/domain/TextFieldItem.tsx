"use client";

import { TextFieldSchema } from '@/model/schema';
import React from 'react'

export default function TextFieldItem({
    field,
    value,
    onValueChange,
}: {
    field: TextFieldSchema;
    value: string | undefined;
    onValueChange: (value: string) => void;
}) {
    return (
        <div>
            <label>{field.label}</label>
            <input
                type="text"
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                value={value}
                onChange={e => onValueChange?.(e.target.value)}
            />
        </div>
    )
}
