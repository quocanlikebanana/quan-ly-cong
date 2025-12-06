"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTemplateSchema, CreateTemplateType } from "@/features/templates/actions/create-template/create-template.schema";
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
import { startTransition, useActionState, useCallback, useEffect } from "react";
import { createTemplateAction } from "@/features/templates/actions/create-template/create-template.action";
import { DEFAULT_SERVER_ACTION_RESPONSE } from "@/types/server-action-response";
import Spinner from "@/components/atoms/Spinner";
import { routes } from "@/client/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateTemplateForm() {
    const [response, action, isLoading] = useActionState(createTemplateAction, DEFAULT_SERVER_ACTION_RESPONSE);
    const router = useRouter();

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
                    type: "text",
                    key: "",
                    label: "",
                    description: "",
                    order: 0,
                    uiMetadata: {},
                    renderMetadata: {}
                }
            ]
        }
    });

    const onSubmit = useCallback((data: CreateTemplateType) => {
        startTransition(() => {
            action(data);
        });
    }, [action]);

    useEffect(() => {
        if (response.success) {
            hookForm.reset();
            router.push(routes.van_ban.INDEX);
            toast.success("Tạo mẫu văn bản thành công!");
        }
    }, [response.success, hookForm, router]);

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
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                    >
                        Tạo mẫu văn bản
                        {isLoading && (
                            <Spinner className="ml-2 w-4 h-4" />
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="px-8"
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                </div>
            </form>
        </Form>
    );
}
