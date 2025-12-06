import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TemplateFieldView } from '@/features/templates/types/template.view';
import React from 'react'

export default function TemplateFieldsCard({
    fields,
}: {
    fields: TemplateFieldView[];
}) {
    if (fields.length === 0) {
        return null;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Các trường dữ liệu</CardTitle>
                <CardDescription>
                    Danh sách các trường cần điền khi tạo văn bản từ mẫu này
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.key} className="border rounded-lg p-4 bg-muted/30">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-muted-foreground">
                                            #{index + 1}
                                        </span>
                                        <h4 className="font-semibold">{field.label}</h4>
                                        <Badge
                                            variant="secondary"
                                            className="font-mono text-xs"
                                        >
                                            {field.key}
                                        </Badge>
                                    </div>

                                    {field.placeholder && (
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Gợi ý: </span>
                                            {field.placeholder}
                                        </p>
                                    )}
                                    {field.defaultValue !== null && field.defaultValue !== undefined && (
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Giá trị mặc định: </span>
                                            <span className="font-mono">
                                                {typeof field.defaultValue === 'object'
                                                    ? JSON.stringify(field.defaultValue)
                                                    : String(field.defaultValue)}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
