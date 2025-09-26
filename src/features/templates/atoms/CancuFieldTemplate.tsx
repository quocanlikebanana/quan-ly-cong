import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CancuFieldTemplate({
    cancus,
    onCancusChange,
}: {
    cancus: string[];
    onCancusChange: (cancus: string[]) => void;
}) {
    const [newCancu, setNewCancu] = useState('');

    const handleAddCancu = useCallback(() => {
        if (newCancu.trim() !== '') {
            onCancusChange([...cancus, newCancu.trim()]);
            setNewCancu('');
        }
    }, [newCancu, cancus, onCancusChange]);

    const handleRemoveCancu = useCallback(
        (index: number) => {
            const updatedCancus = cancus.filter((_, i) => i !== index);
            onCancusChange(updatedCancus);
        },
        [cancus, onCancusChange]
    );

    const handleUpdateCancu = useCallback(
        (index: number, value: string) => {
            const updatedCancus = cancus.map((cancu, i) => (i === index ? value : cancu));
            onCancusChange(updatedCancus);
        },
        [cancus, onCancusChange]
    );

    return (
        <div>
            {cancus.map((cancu, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                        value={cancu}
                        onChange={(e) => handleUpdateCancu(index, e.target.value)}
                        className="flex-1"
                    />
                    <Button variant="destructive" onClick={() => handleRemoveCancu(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            <div className="flex items-center space-x-2">
                <Input
                    value={newCancu}
                    onChange={(e) => setNewCancu(e.target.value)}
                    placeholder="Add new string"
                    className="flex-1"
                />
                <Button onClick={handleAddCancu}>Add</Button>
            </div>
        </div>
    );
}
