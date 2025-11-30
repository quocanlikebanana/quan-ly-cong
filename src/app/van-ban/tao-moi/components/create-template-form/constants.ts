export const CATEGORIES = [
    "Quyết định",
    "Biên bản xử phạt",
    "Thông báo",
    "Công văn",
    "Văn bản hướng dẫn",
    "Báo cáo",
    "Kế hoạch"
] as const;

export type TemplateCategoryType = (typeof CATEGORIES)[number];

export const TAGS = [
    "Hàng hóa",
    "Thuế",
    "Phân bón",
    "Thực phẩm",
    "An toàn thực phẩm",
    "Kiểm tra",
    "Thanh tra",
    "Xử phạt",
    "Giấy phép",
    "Chứng nhận"
] as const;

export type TemplateTagType = (typeof TAGS)[number];
