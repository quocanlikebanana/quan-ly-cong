import React from 'react'
import { FileText } from 'lucide-react'
import TemplateRow from './TemplateRow'
import TemplateCard from './TemplateCard'
import { templateMocks } from './template-mock'
import Header from './Header'

export default async function VanBanPage({
	searchParams,
}: {
	searchParams: Promise<{
		search?: string;
		category?: string;
		view?: 'grid' | 'list';
	}>
}) {
	const { search = '', category = 'all', view = 'grid' } = await searchParams;
	const filteredDocuments = templateMocks;

	return (
		<div>
			<Header />
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Results Info */}
				<div className="mb-6">
					<p className="text-vista-blue-700">
						Hiển thị {filteredDocuments.length} văn bản
						{search && ` cho từ khóa "${search}"`}
					</p>
				</div>

				{/* Document List */}
				{filteredDocuments.length > 0 ? (
					<div className={view === 'grid'
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						: "space-y-4"
					}>
						{filteredDocuments.map((document) => (
							view === 'grid'
								? (
									<TemplateCard
										key={document.id}
										template={document}
									/>
								)
								: (
									<TemplateRow
										key={document.id}
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
