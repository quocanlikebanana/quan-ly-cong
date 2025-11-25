import React from 'react'
import { FileText } from 'lucide-react'
import TemplateCard from './components/TemplateCard'
import VanBanTop from './components/VanBanFilterHeader'
import { DEFAULT_PAGING } from '@/features/shared/paging.type'
import ResultsInfo from '@/components/common/ResultsInfo'
import queryTemplates from '@/features/templates/query/query-templates'
import TemplateTable from './components/TemplateTable'

export default async function VanBanPage({
	searchParams,
}: {
	searchParams: Promise<{
		search?: string;
		category?: string;
		view?: 'grid' | 'list';
		page?: string;
	}>
}) {
	const { search = '', view = 'grid', page: pageParam = '1' } = await searchParams;
	const currentPage = Math.max(1, parseInt(pageParam));

	const pagedTemplates = await queryTemplates({
		search,
		page: currentPage,
		perPage: DEFAULT_PAGING.perPage,
	});

	return (
		<div>
			<VanBanTop />
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Results Info */}
				<ResultsInfo
					pagedResult={pagedTemplates}
					search={search}
					itemName="văn bản"
				/>

				{view === "grid" && (
					pagedTemplates.data.length === 0 ? (
						<div className='flex w-full h-full items-center justify-center text-sm text-muted-foreground py-8'>
							<FileText className="w-16 h-16 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								Không tìm thấy văn bản
							</h3>
							<p className="text-sm">
								Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
							</p>
						</div>
					) : (
						<div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"}>
							{pagedTemplates.data.map((template) => (
								<TemplateCard
									key={template.id}
									template={template}
								/>
							))}
						</div>
					))}
				{view === "list" && (
					<TemplateTable
						templates={pagedTemplates.data}
					/>
				)}

			</main>
		</div>
	)
}
