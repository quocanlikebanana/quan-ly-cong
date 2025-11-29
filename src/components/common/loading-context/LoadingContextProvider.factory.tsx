import { useState } from "react";

export default function loadingContextProviderFactory(
    context: React.Context<{
        isLoading: boolean
        onLoadingChange: (loading: boolean) => void
    } | undefined>
) {
    return function LoadingContextProvider({ children }: { children: React.ReactNode }) {
        const [isLoading, setIsLoading] = useState(false);
        const onLoadingChange = (loading: boolean) => {
            setIsLoading(loading);
        }
        return (
            <context.Provider value={{ isLoading, onLoadingChange }}>
                {children}
            </context.Provider>
        );
    };
}