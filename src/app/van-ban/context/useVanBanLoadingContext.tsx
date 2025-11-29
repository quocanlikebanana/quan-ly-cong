import createUseLoadingContextFactory from "@/components/common/loading-context/useLoadingContext.factory"
import VanBanLoadingContext from "./van-ban-loading.context";

const useVanBanLoadingContext = createUseLoadingContextFactory(VanBanLoadingContext);
export default useVanBanLoadingContext;
