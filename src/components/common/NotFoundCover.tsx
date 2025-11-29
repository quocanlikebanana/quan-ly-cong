import { FileQuestionMark } from 'lucide-react'
import React from 'react'

export default function NotFoundCover({
    children,
}: {
    children?: React.ReactNode
}) {
    return (
        <div className='flex w-full h-full flex-col gap-2 items-center justify-center     text-muted-foreground py-8'>
            <FileQuestionMark className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">
                Không tìm thấy nội dung
            </h3>
            <p className="text-sm">
                Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            {children && (
                <div className='mt-4'>
                    {children}
                </div>
            )}
        </div>
    )
}
