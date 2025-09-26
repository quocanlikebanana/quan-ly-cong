"use client";

import { Control, useFieldArray } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CreateTemplateType } from "@/features/templates/payloads/create-template.schema";

interface TemplateFieldsProps {
    control: Control<CreateTemplateType>;
}

export function TemplateFields({ control }: TemplateFieldsProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields"
    });

    const addField = () => {
        append({
            key: "",
            label: "",
            placeholder: "",
            defaultValue: "",
            order: fields.length
        });
    };

    const removeField = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Trường dữ liệu *</h3>
                <Button type="button" onClick={addField} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm trường
                </Button>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg bg-gray-50/50">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium">Trường #{index + 1}</h4>
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeField(index)}
                                    className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={control}
                                name={`fields.${index}.key`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Khóa *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vd: ten_nguoi_nhan" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Khóa duy nhất để thay thế trong tài liệu
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`fields.${index}.label`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nhãn hiển thị *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vd: Tên người nhận" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Tên hiển thị trên form nhập liệu
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`fields.${index}.placeholder`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Placeholder</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vd: Nhập tên người nhận..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`fields.${index}.defaultValue`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giá trị mặc định</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vd: Không có" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}