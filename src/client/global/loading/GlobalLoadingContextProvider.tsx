import { useState } from "react";
import GlobalLoadingContext from "./global-loading.context";

export default function GlobalLoadingContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <GlobalLoadingContext.Provider
            value={{
                isLoading,
                onLoadingChange: setIsLoading
            }}
        >
            {children}
        </GlobalLoadingContext.Provider>
    )
}
