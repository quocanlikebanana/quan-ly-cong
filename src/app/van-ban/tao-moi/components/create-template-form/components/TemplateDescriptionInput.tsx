"use client";

import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateTemplateActionType } from "@/features/templates/actions/create-template/create-template.schema";

interface TemplateDescriptionInputProps {
    control: Control<CreateTemplateActionType>;
}

export function TemplateDescriptionInput({ control }: TemplateDescriptionInputProps) {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Mô tả chi tiết về mẫu văn bản này"
                            className="min-h-[100px]"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}