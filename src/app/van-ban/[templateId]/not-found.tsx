import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
	return (
		<div className="min-h-screen bg-lavender-web-900 flex items-center justify-center">
			<div className="text-center">
				<FileText className="w-16 h-16 text-vista-blue-400 mx-auto mb-4" />
				<h3 className="text-xl font-semibold text-vista-blue-700 mb-2">
					Không tìm thấy văn bản
				</h3>
				<p className="text-vista-blue-600 mb-6">
					Văn bản bạn tìm kiếm không tồn tại hoặc đã bị xóa.
				</p>
				<Link href="/van-ban">
					<Button variant="outline" className="border-egyptian-blue-400 text-egyptian-blue-600">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Quay lại danh sách
					</Button>
				</Link>
			</div>
		</div>
	)
}
