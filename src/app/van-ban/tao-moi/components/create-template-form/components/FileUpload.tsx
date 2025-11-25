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
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";
import { CreateTemplateType } from "@/features/templates/actions/create-template.schema";

interface FileUploadProps {
    control: Control<CreateTemplateType>;
}

export function FileUpload({ control }: FileUploadProps) {
    return (
        <FormField
            control={control}
            name="file"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tệp mẫu DOCX *</FormLabel>
                    <FormControl>
                        <div className="space-y-2">
                            <Input
                                type="file"
                                accept=".docx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.onChange(file);
                                }}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span className="font-medium">Nhấp để chọn tệp</span> hoặc kéo thả
                                    </div>
                                    <p className="text-xs text-gray-500">Chỉ chấp nhận tệp DOCX (tối đa 10MB)</p>
                                </div>
                            </label>

                            {field.value && (
                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm font-medium">{field.value.name}</span>
                                    <span className="text-xs text-gray-500">
                                        ({(field.value.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => field.onChange(null)}
                                        className="ml-auto h-6 w-6 p-0"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}