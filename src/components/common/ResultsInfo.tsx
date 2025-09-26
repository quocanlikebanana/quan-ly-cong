import { PagedResult } from '@/features/shared/paging.type'

type ResultsInfoProps<T> = {
    pagedResult: PagedResult<T>
    search?: string
    itemName?: string
    className?: string
}

export default function ResultsInfo<T>({
    pagedResult,
    search,
    itemName = "mục",
    className = ""
}: ResultsInfoProps<T>) {
    const { total, currentPage, perPage } = pagedResult
    const startIndex = (currentPage - 1) * perPage + 1
    const endIndex = Math.min(currentPage * perPage, total)

    return (
        <div className={`mb-6 ${className}`}>
            <p className="text-vista-blue-700">
                Hiển thị {startIndex}-{endIndex} trong tổng số {total} {itemName}
                {search && ` cho từ khóa "${search}"`}
            </p>
        </div>
    )
}