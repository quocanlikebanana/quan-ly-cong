import { TemplateItemView } from '@/features/templates/views/template.view'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link';
import React from 'react'

export default function TemplateRow({
	template,
}: {
	template: TemplateItemView;
}) {
	const formattedDate = template.createdAt
		? new Date(template.createdAt).toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
		: 'Không xác định';

	return (
		<Link href={`/van-ban/${template.id}`}>
			<div className="group p-4 hover:bg-slate-50 border-b border-slate-200 last:border-b-0 transition-colors duration-200 cursor-pointer">
				<div className="flex items-center justify-between gap-4">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-3 mb-2">
							<h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 line-clamp-1">
								{template.name}
							</h3>
							{template.category && (
								<Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-1 shrink-0">
									{template.category}
								</Badge>
							)}
						</div>
						{template.description && (
							<p className="text-sm text-slate-600 line-clamp-1 mb-1">
								{template.description}
							</p>
						)}
						<span className="text-xs text-slate-500">
							Được tạo vào: {formattedDate}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
