import { PagedResult } from '@/features/shared/paging.type'

type ResultsInfoProps<T> = {
    pagedResult: PagedResult<T>
    search?: string
    itemName?: string
}

export default function ResultsInfo<T>({
    pagedResult,
    search,
    itemName = "mục",
}: ResultsInfoProps<T>) {
    const { total, currentPage, perPage } = pagedResult
    const startIndex = (currentPage - 1) * perPage + 1
    const endIndex = Math.min(currentPage * perPage, total)

    return (
        <div className={`flex justify-end`}>
            <p className="text-muted-foreground text-sm">
                Hiển thị {startIndex}-{endIndex} trong tổng số {total} {itemName}
                {search && ` cho từ khóa "${search}"`}
            </p>
        </div>
    )
}