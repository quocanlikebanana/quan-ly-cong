import React from 'react'
import useGlobalLoadingContext from './useGlobalLoadingContext';

export default function GlobalLoadingContextConsumer() {
    const { isLoading } = useGlobalLoadingContext();
    if (!isLoading) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full" />
        </div>
    );
}
