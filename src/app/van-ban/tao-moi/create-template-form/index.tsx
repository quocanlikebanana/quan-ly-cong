"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTemplateSchema, CreateTemplateType } from "@/features/templates/payloads/create-template.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    TemplateNameInput,
    TemplateDescriptionInput,
    CategorySelect,
    TagsSelect,
    FileUpload,
    TemplateFields
} from "./components";

export default function CreateTemplateForm() {
    const hookForm = useForm<CreateTemplateType>({
        resolver: zodResolver(CreateTemplateSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            tags: [],
            file: undefined as File | undefined, // This will be set by the file input
            fields: [
                {
                    key: "",
                    label: "",
                    placeholder: "",
                    defaultValue: "",
                    order: 0
                }
            ]
        }
    });

    const onSubmit = (data: CreateTemplateType) => {
        console.log(data);
        // Handle form submission here
    };

    return (
        <Form {...hookForm}>
            <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto p-6">
                {/* Template Name */}
                <TemplateNameInput control={hookForm.control} />

                {/* Template Description */}
                <TemplateDescriptionInput control={hookForm.control} />

                {/* Category */}
                <CategorySelect control={hookForm.control} />

                {/* Tags */}
                <TagsSelect control={hookForm.control} />

                {/* File Upload */}
                <FileUpload control={hookForm.control} />

                {/* Template Fields */}
                <TemplateFields control={hookForm.control} />

                {/* Submit Button */}
                <div className="flex gap-4 pt-6 border-t">
                    <Button type="submit" className="flex-1">
                        Tạo mẫu văn bản
                    </Button>
                    <Button type="button" variant="outline" className="px-8">
                        Hủy
                    </Button>
                </div>
            </form>
        </Form>
    );
}
