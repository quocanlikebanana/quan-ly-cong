import { createContext } from "react";

export default function loadingContextFactory() {
    const context = createContext<{
        isLoading: boolean
        onLoadingChange: (loading: boolean) => void
    } | undefined>(undefined);
    return context;
}
