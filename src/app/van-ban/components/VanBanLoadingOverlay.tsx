"use client";

import Spinner from "@/components/atoms/Spinner";
import useVanBanLoadingContext from "../context/useVanBanLoadingContext"

export default function VanBanLoadingOverlay() {
    const { isLoading } = useVanBanLoadingContext();
    if (!isLoading) return null
    return (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
            <Spinner />
        </div>
    );
}
