import { ContextError } from "@/types/context-error";
import { useContext } from "react";

export default function createUseLoadingContextFactory(
    context: React.Context<{
        isLoading: boolean
        onLoadingChange: (loading: boolean) => void
    } | undefined>
) {
    return function useLoadingContext() {
        const loadingContext = useContext(context);
        if (!loadingContext) {
            throw new ContextError(context.name);
        }
        return loadingContext;
    }
}