'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="min-h-screen bg-lavender-web-900">
			{/* Header */}
			<header className="bg-egyptian-blue-600 text-lavender-web-900 py-6 px-6">
				<div className="max-w-7xl mx-auto flex items-center gap-4">
					<Link href="/van-ban">
						<Button variant="ghost" size="sm" className="text-lavender-web-900 hover:bg-egyptian-blue-700">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Quay lại
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold">Có lỗi xảy ra</h1>
					</div>
				</div>
			</header>

			<div className="max-w-2xl mx-auto p-6">
				<Card className="border-vista-blue-300 bg-lavender-web-900">
					<CardHeader className="text-center">
						<div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
							<AlertTriangle className="w-8 h-8 text-red-600" />
						</div>
						<CardTitle className="text-egyptian-blue-600">
							Đã xảy ra lỗi
						</CardTitle>
						<CardDescription className="text-vista-blue-600">
							Có lỗi xảy ra khi tải mẫu văn bản. Vui lòng thử lại.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center space-x-4">
						<Button
							onClick={reset}
							variant="outline"
							className="border-egyptian-blue-400 text-egyptian-blue-600"
						>
							Thử lại
						</Button>
						<Link href="/van-ban">
							<Button className="bg-egyptian-blue-600 hover:bg-egyptian-blue-700 text-lavender-web-900">
								Quay lại danh sách
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
