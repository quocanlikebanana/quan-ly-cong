import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TemplateDetailView } from '@/features/templates/types/template.view';
import { DateUtils } from '@/lib/utils/date-utils';
import { FileText, Calendar, Tag } from 'lucide-react';
import React from 'react'

export default function TemplateInfoCard({
    template,
}: {
    template: TemplateDetailView;
}) {
    const createdDate = new Date(template.createdAt);
    const updatedDate = new Date(template.updatedAt);
    const formattedCreatedDate = DateUtils.Formater.toBaseFormat(createdDate);
    const formattedUpdatedDate = DateUtils.Formater.toBaseFormat(updatedDate);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin văn bản mẫu</CardTitle>
                <CardDescription>Chi tiết về văn bản mẫu này</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Description */}
                {template.description && (
                    <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-2">Mô tả</h3>
                        <p className="text-sm">{template.description}</p>
                    </div>
                )}

                <Separator />

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    {template.category && (
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Danh mục:</span>
                            <Badge>{template.category}</Badge>
                        </div>
                    )}

                    {/* Created Date */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Ngày tạo:</span>
                        <span className="text-sm text-muted-foreground">{formattedCreatedDate}</span>
                    </div>

                    {/* Updated Date */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Cập nhật:</span>
                        <span className="text-sm text-muted-foreground">{formattedUpdatedDate}</span>
                    </div>
                </div>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                    <>
                        <Separator />
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Thẻ:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {template.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
