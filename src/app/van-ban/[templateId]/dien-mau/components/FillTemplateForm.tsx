"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TemplateDetailView, TemplateFieldView } from "@/features/templates/types/template.view";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { FillTemplateActionType } from "@/features/templates/actions/fill-template/fill-template.schema";
import { startTransition, useActionState, useCallback, useEffect } from "react";
import fillTemplateAction from "@/features/templates/actions/fill-template/fill-template.action";
import { FIELD_TYPES } from "@/features/templates/types/template.common";
import Spinner from "@/components/atoms/Spinner";

type FillTemplateFormProps = {
    template: TemplateDetailView;
};

type FieldMapFormValues = {
    [key: string]: string;
};

export default function FillTemplateForm({ template }: FillTemplateFormProps) {
    const fields: TemplateFieldView[] = template.fields;
    const [response, action, isLoading] = useActionState(fillTemplateAction, {
        error: undefined,
        success: false,
    });

    // Create default values for the form - simple key-value pairs
    const defaultFieldValues = fields.reduce((acc, field) => {
        acc[field.key] = (field.defaultValue as string) || "";
        return acc;
    }, {} as FieldMapFormValues);

    const form = useForm<FieldMapFormValues>({
        defaultValues: defaultFieldValues
    });

    const handleGenerateDocument = useCallback((data: FieldMapFormValues) => {
        // Transform the simple form data into the fieldMap structure expected by the schema
        const fieldMap: FillTemplateActionType['fieldMap'] = {};

        fields.forEach((field) => {
            const value = data[field.key];
            fieldMap[field.key] = {
                type: FIELD_TYPES.text, // Default to text type for now
                value: value || undefined,
            };
        });

        const payload: FillTemplateActionType = {
            templateId: template.id,
            fieldMap,
        };

        startTransition(() => {
            action(payload);
        });
    }, [action, fields, template.id]);

    useEffect(() => {
        if (response.success) {
            form.reset(defaultFieldValues);
            toast.success("Tạo văn bản thành công!");
        }
    }, [response.success, form, defaultFieldValues]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateDocument)} className="space-y-6">
                {/* Fields Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin cần điền</CardTitle>
                        <CardDescription>
                            Điền đầy đủ thông tin vào các trường bên dưới
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <FormField
                                key={field.key}
                                control={form.control}
                                name={field.key}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-muted-foreground">
                                                #{index + 1}
                                            </span>
                                            {field.label}
                                            <Badge variant="secondary" className="font-mono text-xs">
                                                {field.key}
                                            </Badge>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}`}
                                                {...formField}
                                                rows={3}
                                            />
                                        </FormControl>
                                        {field.placeholder && (
                                            <FormDescription>
                                                {field.placeholder}
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button
                        type="submit"
                        className="gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Spinner className="w-4 h-4" />
                                Đang tạo văn bản
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Tạo văn bản
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
