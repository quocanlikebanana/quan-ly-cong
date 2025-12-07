"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TemplateDetailView, TemplateFieldView } from "@/features/templates/types/template.view";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type FillTemplateFormProps = {
    template: TemplateDetailView;
    sortedFields: TemplateFieldView[];
};

export default function FillTemplateForm({ sortedFields }: FillTemplateFormProps) {

    // Create dynamic schema based on template fields
    const formSchema = z.object(
        sortedFields.reduce((acc, field) => {
            acc[field.key] = z.string().optional();
            return acc;
        }, {} as Record<string, z.ZodOptional<z.ZodString>>)
    );

    type FormValues = z.infer<typeof formSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: sortedFields.reduce((acc, field) => {
            acc[field.key] = field.defaultValue
                ? String(field.defaultValue)
                : "";
            return acc;
        }, {} as Record<string, string>),
    });


    // const handleSaveDraft = () => {
    //     const values = form.getValues();
    //     // TODO: Implement save draft functionality
    //     console.log("Saving draft:", values);
    //     toast.success("Đã lưu nháp thành công!");
    // };

    const handleGenerateDocument = async (data: FormValues) => {
        // TODO: Implement document generation
        console.log("Generating document with data:", data);
        toast.success("Đang tạo văn bản...");
    };

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
                        {sortedFields.map((field, index) => (
                            <FormField
                                key={field.key}
                                control={form.control}
                                name={field.key as keyof FormValues}
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
                    {/* <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveDraft}
                        className="gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Lưu nháp
                    </Button> */}
                    <Button
                        type="submit"
                        className="gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        Tạo văn bản
                    </Button>
                </div>
            </form>
        </Form>
    );
}
