import PageHeader from '@/components/organisms/PageHeader';
import React from 'react'

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-lavender-web-900">
			<PageHeader />
			{children}
		</div>
	)
}
