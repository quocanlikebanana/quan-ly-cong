import React from 'react'
import { FileText } from 'lucide-react'
import TemplateRow from './TemplateRow'
import TemplateCard from './TemplateCard'
import VanBanTop from './VanBanTop'
import { TemplatesQuery } from '@/features/templates/query/templates.query'
import { DEFAULT_PAGING } from '@/features/shared/paging.type'
import TablePagination from '@/components/common/TablePagination'
import ResultsInfo from '@/components/common/ResultsInfo'

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

	const pagedTemplates = await TemplatesQuery.getAllTemplates({
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

				{/* Document List */}
				{pagedTemplates.data.length > 0 ? (
					<>
						<div className={view === 'grid'
							? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
							: "space-y-4 mb-8"
						}>
							{pagedTemplates.data.map((template) => (
								view === 'grid'
									? (
										<TemplateCard
											key={template.id}
											template={template}
										/>
									)
									: (
										<TemplateRow
											key={template.id}
											template={template}
										/>
									)
							))}
						</div>

						{/* Pagination */}
						{pagedTemplates.totalPages > 1 && (
							<TablePagination
								pagedResult={pagedTemplates}
								currentPage={currentPage}
								search={search}
								additionalParams={view !== 'grid' ? { view } : {}}
							/>
						)}
					</>
				) : (
					<div className="text-center py-12">
						<FileText className="w-16 h-16 text-vista-blue-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-vista-blue-700 mb-2">
							Không tìm thấy văn bản
						</h3>
						<p className="text-vista-blue-600">
							Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
						</p>
					</div>
				)}
			</main>
		</div>
	)
}
