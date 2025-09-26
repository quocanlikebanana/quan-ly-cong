import { Input } from '@/components/ui/input';
import React from 'react'

export default function TextFieldTemplate({
    text,
    onTextChange,
}: {
    text: string;
    onTextChange: (text: string) => void;
}) {
    return (
        <Input
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
        />
    );
}


