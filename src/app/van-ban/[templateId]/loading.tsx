import { FileText } from 'lucide-react'

export default function Loading() {
	return (
		<div className="min-h-screen bg-lavender-web-900 flex items-center justify-center">
			<div className="text-center">
				<FileText className="w-16 h-16 text-vista-blue-400 mx-auto mb-4 animate-pulse" />
				<p className="text-vista-blue-700">Đang tải...</p>
			</div>
		</div>
	)
}
