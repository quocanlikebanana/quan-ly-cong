import { TemplateView } from '@/features/templates/types/template.view'
import React from 'react'

export default function FillSlug({
    template,
}: {
    template: TemplateView;
}) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-vista-blue-950">Điền thông tin văn bản</h1>
            <p className="text-muted-foreground mt-2">
                Điền các trường thông tin để tạo văn bản từ mẫu: <span className="font-semibold">{template.name}</span>
            </p>
        </div>
    )
}
