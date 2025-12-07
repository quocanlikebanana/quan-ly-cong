import { FileText, SearchX } from 'lucide-react'
import React from 'react'

export default function NoItemsFoundCover({
    hasFiltered
}: {
    hasFiltered?: boolean
}) {
    return (
        <div className='flex w-full h-full flex-col items-center justify-center     text-muted-foreground py-8'>
            {hasFiltered ? (
                <>
                    <SearchX className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                        Không tìm thấy
                    </h3>
                    <p className="text-sm">
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                    </p>
                </>
            ) : (
                <>
                    <FileText className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                        Chưa có mục nào
                    </h3>
                    <p className="text-sm">
                        Hiện chưa có mục nào để hiển thị
                    </p>
                </>
            )}

        </div>
    );
}