import HeaderLarge from '@/components/organisms/HeaderLarge';
import React from 'react'

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-lavender-web-900 flex flex-col items-stretch">
			<HeaderLarge />
			<div className='flex-1 flex flex-col items-stretch justify-center'>
				{children}
			</div>
		</div>
	)
}
