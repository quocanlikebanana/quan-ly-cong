import HeaderLarge from '@/components/organisms/HeaderLarge';
import React from 'react'

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-lavender-web-900">
			<HeaderLarge />
			{children}
		</div>
	)
}
