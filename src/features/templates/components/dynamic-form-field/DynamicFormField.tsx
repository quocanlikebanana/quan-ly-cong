"use client";

import React from "react";
import { TemplateFieldMapDtoType, TemplateFieldDtoType } from "../../types/template.dto";
import { FIELD_TYPES } from "../../types/template.common";
import TextFieldTemplate from "./fields/TextFieldTemplate";
import DateFieldTemplate from "./fields/DateFieldTemplate";
import ArrayFieldTemplate from "./fields/ArrayFieldTemplate";
import DynamicFormFieldInfoWarpper from "./DynamicFormFieldInfoWarpper";
import { DateOnly, DEFAULT_DATEONLY } from "@/features/shared/date.type";

export default function DynamicFormField({
    itemSchema,
    templateValues,
    onFieldDataChange,
}: {
    itemSchema: TemplateFieldDtoType;
    templateValues: TemplateFieldMapDtoType;
    onFieldDataChange: (key: string, value: unknown) => void;
}) {
    let FieldComponent = null;
    const { type, key, label, description, order } = itemSchema;
    switch (type) {
        case FIELD_TYPES.text:
            FieldComponent = <TextFieldTemplate
                text={templateValues[key].value as string || ""}
                onTextChange={(text) => onFieldDataChange(key, text)}
            />;
            break;
        case FIELD_TYPES.date:
            FieldComponent = <DateFieldTemplate
                dateOnly={templateValues[key].value as DateOnly || DEFAULT_DATEONLY}
                onDateOnlyChange={(dateOnly) => onFieldDataChange(key, dateOnly)}
            />;
            break;
        case FIELD_TYPES.array:
            FieldComponent = <ArrayFieldTemplate
                array={templateValues[key].value as Array<string> || []}
                onArrayChange={(array) => onFieldDataChange(key, array)}
            />;
            break;
        default:
            console.error("Unsupported field type:", type);
            return null;
    }

    return (
        <DynamicFormFieldInfoWarpper
            label={label}
            description={description}
            order={order}
        >
            {FieldComponent}
        </DynamicFormFieldInfoWarpper>
    );
}


