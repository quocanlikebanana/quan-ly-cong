"use client";

import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateTemplateType } from "@/features/templates/actions/create-template/create-template.schema";

interface TemplateNameInputProps {
    control: Control<CreateTemplateType>;
}

export function TemplateNameInput({ control }: TemplateNameInputProps) {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tên mẫu văn bản *</FormLabel>
                    <FormControl>
                        <Input placeholder="Nhập tên mẫu văn bản" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}