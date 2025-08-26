import React from 'react'

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-lavender-web-900">
			{/* Header */}
			<header className="bg-egyptian-blue-600 text-lavender-web-900 py-8 px-6">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold mb-2">Quản lý Văn bản Pháp lý</h1>
					<p className="text-lavender-web-500 text-lg">
						Hệ thống quản lý mẫu văn bản và tài liệu pháp lý
					</p>
				</div>
			</header>
			{children}
		</div>
	)
}
