"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TemplateDetailView, TemplateFieldView } from "@/features/templates/types/template.view";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Save, Eye, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type FillTemplateFormProps = {
    template: TemplateDetailView;
    sortedFields: TemplateFieldView[];
};

export default function FillTemplateForm({ template, sortedFields }: FillTemplateFormProps) {
    const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

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

    const watchedValues = form.watch();

    const handleSaveDraft = () => {
        const values = form.getValues();
        // TODO: Implement save draft functionality
        console.log("Saving draft:", values);
        toast.success("Đã lưu nháp thành công!");
    };

    const handleGenerateDocument = async (data: FormValues) => {
        // TODO: Implement document generation
        console.log("Generating document with data:", data);
        toast.success("Đang tạo văn bản...");
    };

    return (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "form" | "preview")} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="form" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Điền thông tin
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Xem trước
                </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-6 mt-6">
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
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleSaveDraft}
                                className="gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Lưu nháp
                            </Button>
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
            </TabsContent>

            <TabsContent value="preview" className="space-y-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Xem trước thông tin</CardTitle>
                        <CardDescription>
                            Kiểm tra lại các thông tin đã điền trước khi tạo văn bản
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Template Info */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm text-muted-foreground">Văn bản mẫu</h3>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{template.name}</span>
                                {template.category && (
                                    <Badge>{template.category}</Badge>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Field Values Preview */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-muted-foreground">Các giá trị đã điền</h3>
                            <div className="space-y-3">
                                {sortedFields.map((field, index) => {
                                    const value = watchedValues[field.key];
                                    const isEmpty = !value || value.trim() === "";

                                    return (
                                        <div key={field.key} className="border rounded-lg p-4 bg-muted/30">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-medium">{field.label}</span>
                                                    <Badge variant="secondary" className="font-mono text-xs">
                                                        {field.key}
                                                    </Badge>
                                                </div>
                                                <div className={`text-sm ${isEmpty ? "text-muted-foreground italic" : ""}`}>
                                                    {isEmpty ? (
                                                        <span>Chưa điền</span>
                                                    ) : (
                                                        <div className="whitespace-pre-wrap bg-background border rounded p-3">
                                                            {value}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Separator />

                        {/* Preview Summary */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
                                Tóm tắt
                            </h3>
                            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                <p>
                                    Tổng số trường: <span className="font-semibold">{sortedFields.length}</span>
                                </p>
                                <p>
                                    Đã điền: <span className="font-semibold">
                                        {sortedFields.filter(f => {
                                            const value = watchedValues[f.key];
                                            return value && value.trim() !== "";
                                        }).length}
                                    </span>
                                </p>
                                <p>
                                    Chưa điền: <span className="font-semibold">
                                        {sortedFields.filter(f => {
                                            const value = watchedValues[f.key];
                                            return !value || value.trim() === "";
                                        }).length}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons in Preview */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleSaveDraft}
                                className="gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Lưu nháp
                            </Button>
                            <Button
                                onClick={() => form.handleSubmit(handleGenerateDocument)()}
                                className="gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Tạo văn bản
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
