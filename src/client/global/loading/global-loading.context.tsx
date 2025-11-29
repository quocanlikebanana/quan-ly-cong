import { createContext } from "react";

const GlobalLoadingContext = createContext<{
    isLoading: boolean;
    onLoadingChange: (loading: boolean) => void;
} | undefined>(undefined);

export default GlobalLoadingContext;