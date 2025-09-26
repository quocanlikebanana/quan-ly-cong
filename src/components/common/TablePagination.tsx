import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination'
import { PagedResult } from '@/features/shared/paging.type'

type TablePaginationProps<T> = {
    pagedResult: PagedResult<T>
    currentPage: number
    search?: string
    additionalParams?: Record<string, string>
    className?: string
}

export default function TablePagination<T>({
    pagedResult,
    currentPage,
    search,
    additionalParams = {},
    className = ""
}: TablePaginationProps<T>) {
    if (pagedResult.totalPages <= 1) {
        return null
    }

    const createUrl = (page: number) => {
        const params = new URLSearchParams({
            ...(search && { search }),
            ...additionalParams,
            page: page.toString()
        })
        return `?${params}`
    }

    const generatePaginationItems = () => {
        const items = []
        const maxVisible = 5

        // Calculate start and end pages
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        const end = Math.min(pagedResult.totalPages, start + maxVisible - 1)

        // Adjust start if we're near the end
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1)
        }

        // Add first page and ellipsis if needed
        if (start > 1) {
            items.push(
                <PaginationItem key="1">
                    <PaginationLink
                        href={createUrl(1)}
                        isActive={currentPage === 1}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            )

            if (start > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
        }

        // Add visible page numbers
        for (let i = start; i <= end; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={createUrl(i)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        // Add ellipsis and last page if needed
        if (end < pagedResult.totalPages) {
            if (end < pagedResult.totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            items.push(
                <PaginationItem key={pagedResult.totalPages}>
                    <PaginationLink
                        href={createUrl(pagedResult.totalPages)}
                        isActive={currentPage === pagedResult.totalPages}
                    >
                        {pagedResult.totalPages}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    return (
        <div className={`flex justify-center ${className}`}>
            <Pagination>
                <PaginationContent>
                    {/* Previous button */}
                    <PaginationItem>
                        <PaginationPrevious
                            href={currentPage > 1 ? createUrl(currentPage - 1) : '#'}
                            className={currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}
                        />
                    </PaginationItem>

                    {/* Page numbers */}
                    {generatePaginationItems()}

                    {/* Next button */}
                    <PaginationItem>
                        <PaginationNext
                            href={currentPage < pagedResult.totalPages ? createUrl(currentPage + 1) : '#'}
                            className={currentPage >= pagedResult.totalPages ? 'opacity-50 pointer-events-none' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}