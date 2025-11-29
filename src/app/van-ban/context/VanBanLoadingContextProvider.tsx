"use client";

import loadingContextProviderFactory from "@/components/common/loading-context/LoadingContextProvider.factory";
import VanBanLoadingContext from "./van-ban-loading.context";

const VanBanLoadingContextProvider = loadingContextProviderFactory(VanBanLoadingContext);
export default VanBanLoadingContextProvider;