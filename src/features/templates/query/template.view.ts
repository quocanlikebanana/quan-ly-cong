export type TemplateItemView = {
    id: string;
    name: string;
    /**
     * To retrieve file
     */
    description?: string | null;
    category?: string | null;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
};

export type TemplateFieldView = {
    /**
     * To map with templater schema. E.g: {{cancu1}}
     */
    key: string;
    label: string;
    placeholder?: string | null;
    defaultValue?: unknown | null;
    /**
     * Order used for displaying fields in the UI
     */
    order?: number;
}

export type TemplateDetailView = TemplateItemView & {
    fields: TemplateFieldView[];
};
