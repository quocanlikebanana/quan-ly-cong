"use client";

import { useCallback, useState } from "react";
import { TemplateFieldDtoType, TemplateFieldMapDtoType } from "../../types/template.dto"
import DynamicFormField from "../dynamic-form-field/DynamicFormField";

export default function DynamicFormFieldSet({
    templateFields,
}: {
    templateFields: TemplateFieldDtoType[];
}) {
    const [templateValues, setTemplateValues] = useState<TemplateFieldMapDtoType>(templateFields.reduce((acc, field) => {
        acc[field.key] = {
            type: field.type,
            value: undefined,
        };
        return acc;
    }, {} as TemplateFieldMapDtoType));

    const handleFieldDataChange = useCallback((key: string, value: unknown) => {
        setTemplateValues((prev) => prev[key] != null ? ({
            ...prev,
            [key]: {
                type: prev[key].type,
                value,
            },
        }) : prev);
    }, []);

    return templateFields.map((field, index) => (
        <DynamicFormField
            key={index}
            itemSchema={field}
            onFieldDataChange={handleFieldDataChange}
            templateValues={templateValues}
        />
    ));
}
