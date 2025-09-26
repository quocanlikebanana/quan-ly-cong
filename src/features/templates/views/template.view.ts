export type TemplateItemView = {
    id: string;
    name: string;
    key: string;
    description?: string | null;
    category?: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

type TemplateFieldView = {
    key: string;
    label: string;
    placeholder?: string | null;
    defaultValue?: unknown | null;
    order: number;
}

export type TemplateDetailView = TemplateItemView & {
    fields: TemplateFieldView[];
};
