"use client";

import { useContext } from "react";
import GlobalLoadingContext from "./global-loading.context";
import { ContextError } from "@/types/context-error";

export default function useGlobalLoadingContext() {
    const context = useContext(GlobalLoadingContext);
    if (!context) {
        throw new ContextError(useGlobalLoadingContext.name);
    }
    return context;
}
