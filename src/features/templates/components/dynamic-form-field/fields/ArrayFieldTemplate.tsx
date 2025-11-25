"use client";

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ArrayFieldTemplate({
    array,
    onArrayChange,
}: {
    array: string[];
    onArrayChange: (array: string[]) => void;
}) {
    const [newArrayItem, setNewArrayItem] = useState('');

    const handleAddArrayItem = useCallback(() => {
        if (newArrayItem.trim() !== '') {
            onArrayChange([...array, newArrayItem.trim()]);
            setNewArrayItem('');
        }
    }, [newArrayItem, array, onArrayChange]);

    const handleRemoveArrayItem = useCallback(
        (index: number) => {
            const updatedArray = array.filter((_, i) => i !== index);
            onArrayChange(updatedArray);
        },
        [array, onArrayChange]
    );

    const handleUpdateArrayItem = useCallback(
        (index: number, value: string) => {
            const updatedArray = array.map((item, i) => (i === index ? value : item));
            onArrayChange(updatedArray);
        },
        [array, onArrayChange]
    );

    return (
        <div>
            {array.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                        value={item}
                        onChange={(e) => handleUpdateArrayItem(index, e.target.value)}
                        className="flex-1"
                    />
                    <Button variant="destructive" onClick={() => handleRemoveArrayItem(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            <div className="flex items-center space-x-2">
                <Input
                    value={newArrayItem}
                    onChange={(e) => setNewArrayItem(e.target.value)}
                    placeholder="Add new string"
                    className="flex-1"
                />
                <Button onClick={handleAddArrayItem}>Add</Button>
            </div>
        </div>
    );
}
