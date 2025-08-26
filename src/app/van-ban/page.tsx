import React from 'react'
import { FileText } from 'lucide-react'
import TemplateRow from './TemplateRow'
import TemplateCard from './TemplateCard'
import Header from './Header'
import { TemplatesQuery } from '@/query/templates.query'

export default async function VanBanPage({
	searchParams,
}: {
	searchParams: Promise<{
		search?: string;
		category?: string;
		view?: 'grid' | 'list';
	}>
}) {
	const { search = '', view = 'grid' } = await searchParams;
	const templates = await TemplatesQuery.getAllTemplates({
		search,
		page: 1,
		perPage: 100,
	});

	return (
		<div>
			<Header />
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Results Info */}
				<div className="mb-6">
					<p className="text-vista-blue-700">
						Hiển thị {templates.length} văn bản
						{search && ` cho từ khóa "${search}"`}
					</p>
				</div>

				{/* Document List */}
				{templates.length > 0 ? (
					<div className={view === 'grid'
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						: "space-y-4"
					}>
						{templates.map((document) => (
							view === 'grid'
								? (
									<TemplateCard
										key={document._id.toString()}
										template={document}
									/>
								)
								: (
									<TemplateRow
										key={document._id.toString()}
										template={document}
									/>
								)
						))}
					</div>
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
