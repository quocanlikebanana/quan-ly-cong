import { cn } from '@/lib/utils';
import React from 'react'

export default function Spinner({
    className
}: {
    className?: string
}) {
    return (
        <div
            className={cn(
                "animate-spin w-8 h-8 border-4 border-egyptian-blue border-t-gray-50 rounded-full",
                className
            )}
        />
    );
}
