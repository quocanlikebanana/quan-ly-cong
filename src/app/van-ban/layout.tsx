import HeaderLarge from '@/components/organisms/HeaderLarge';
import React from 'react'
import VanBanLoadingContextProvider from './context/VanBanLoadingContextProvider';

export default function layout({
	children,
	breadcrumbs,
	header,
}: {
	children: React.ReactNode;
	breadcrumbs?: React.ReactElement;
	header?: React.ReactElement;
}) {
	return (
		<VanBanLoadingContextProvider>
			<div className="min-h-screen bg-lavender-web-900 flex flex-col items-stretch">
				<HeaderLarge />
				{header && breadcrumbs && (
					<div className="sticky top-0 z-10 bg-lavender-web-800 border-b border-vista-blue-300 shadow-sm">
						<div className="container mx-auto pt-2 pb-4 space-y-4">
							{breadcrumbs}
							{header}
						</div>
					</div>
				)}
				<div className='flex-1'>
					<div className='flex flex-col items-stretch justify-center'>
						{children}
					</div>
				</div>
			</div>
		</VanBanLoadingContextProvider>
	)
}
