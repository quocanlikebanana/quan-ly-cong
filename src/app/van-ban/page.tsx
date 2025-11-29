import React from 'react'
import TemplateCard from './components/TemplateCard'
import VanBanFilterHeader from './components/VanBanFilterHeader'
import { DEFAULT_PAGING } from '@/features/shared/paging.type'
import ResultsInfo from '@/components/common/ResultsInfo'
import queryTemplates from '@/features/templates/query/query-templates'
import TemplateTable from './components/TemplateTable'
import { loadVanBanSearchParams, VanBanSearchParamsSchema } from '../searchParams'
import VanBanLoadingContextProvider from './context/VanBanLoadingContextProvider'
import VanBanLoadingOverlay from './components/VanBanLoadingOverlay'
import NoItemsFoundCover from '@/components/common/NoItemsFoundCover'

export default async function VanBanPage({
	searchParams,
}: {
	searchParams: Promise<{
		[key: string]: string | string[] | undefined
	}>;
}) {
	const rawSearchParams = await loadVanBanSearchParams(searchParams);
	const parsedSearchParams = VanBanSearchParamsSchema.parse(rawSearchParams);
	const { search, view, page: pageParam } = parsedSearchParams;
	const currentPage = pageParam || 1;

	const pagedTemplates = await queryTemplates({
		search,
		page: currentPage,
		perPage: DEFAULT_PAGING.perPage,
	});

	return (
		<VanBanLoadingContextProvider>

			<div className='flex flex-col gap-4 min-h-screen pb-8'>
				<VanBanFilterHeader />

				<main className="container mx-auto space-y-4 flex-1 relative">
					{/* Results Info */}
					<ResultsInfo
						pagedResult={pagedTemplates}
						search={search}
						itemName="văn bản"
					/>

					<VanBanLoadingOverlay />

					{view === "grid" && (
						pagedTemplates.data.length === 0 ? (
							<div className='absolute inset-0'>
								<NoItemsFoundCover />
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
		</VanBanLoadingContextProvider>
	);
}
