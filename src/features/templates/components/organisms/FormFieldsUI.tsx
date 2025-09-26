"use client";

import { useCallback, useState } from "react";
import { TemplateCommonField, TemplateValues } from "../../common/field-schema"
import FieldFactory from "../molecules/FieldFactory";

export default function FormFieldsUI({
    templateFields,
}: {
    templateFields: TemplateCommonField[];
}) {
    const [templateValues, setTemplateValues] = useState<TemplateValues>(templateFields.reduce((acc, field) => {
        acc[field.key] = {
            type: field.type,
            value: undefined,
        };
        return acc;
    }, {} as TemplateValues));

    const handleFieldDataChange = useCallback((key: string, value: unknown) => {
        setTemplateValues((prev) => prev[key] != null ? ({
            ...prev,
            [key]: {
                type: prev[key].type,
                value,
            },
        }) : prev);
    }, []);

    return (
        <FieldFactory
            itemSchema={templateFields}
            onFieldDataChange={handleFieldDataChange}
            templateValues={templateValues}
        />
    )
}
