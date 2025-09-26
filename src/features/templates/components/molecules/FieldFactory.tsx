"use client";

import React from "react";
import { TemplateCommonFieldSchema, FIELD_TYPES, TemplateValues } from "../../common/field-schema";
import TextFieldTemplate from "../atoms/TextFieldTemplate";
import DateFieldTemplate from "../atoms/DateFieldTemplate";
import ArrayFieldTemplate from "../atoms/ArrayFieldTemplate";
import FieldInfoWarpper from "./FieldInfoWarpper";
import { DateOnly, DEFAULT_DATEONLY } from "@/features/shared/date.type";

export default function FieldFactory({
    itemSchema,
    templateValues,
    onFieldDataChange,
}: {
    itemSchema: unknown;
    templateValues: TemplateValues;
    onFieldDataChange: (key: string, value: unknown) => void;
}) {
    let FieldComponent = null;
    try {
        const { type, key, label, description, order } = TemplateCommonFieldSchema.parse(itemSchema);
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
            <FieldInfoWarpper
                label={label}
                description={description}
                order={order}
            >
                {FieldComponent}
            </FieldInfoWarpper>
        );

    } catch (error: unknown) {
        console.error("Error parsing itemSchema:", error);
        return null;
    }
}


