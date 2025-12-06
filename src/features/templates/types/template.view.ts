export type TemplateView = {
    id: string;
    name: string;
    storage: TemplateStorageView;
    description?: string | null;
    category?: string | null;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
};

type TemplateStorageView = {
    storageType: 'local' | 's3';
    key: string;
    orginalFileName?: string | null;
}

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

export type TemplateDetailView = TemplateView & {
    fields: TemplateFieldView[];
};
