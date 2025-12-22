import { cwd } from "process";
import path from "path";

export const CONSTANTS = {
    public: {
        logo: {
            emblemOfVietnam: "/logo/emblem_of_vietnam.svg",
            logo: "/logo/logo.png",
        },
        background: {
            trongDongDongSon: "/background/trong_dong_dong_son.svg",
        },
        placeholder: {
            templatePlaceholder: "/placeholder/template-placeholder.png",
        }
    },
    server: {
        tempDir: path.join(cwd(), "src", "server", "temp"),
    }
} as const;