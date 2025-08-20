import { TemplateCore } from '@/app/van-ban/template-types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function TemplateCard({ template }: { template: TemplateCore }) {
	const createdDate = new Date(template.createdAt || Date.now());
	const formattedDate = createdDate.toLocaleDateString('vi-VN', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	return (
		<Link href={`/van-ban/${template.id}`} >
			<Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50 cursor-pointer transform hover:-translate-y-1">
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

				{/* Header with icon and category */}
				<CardHeader className="relative p-6 pb-4">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<div className="flex-1 min-w-0">
								<h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 line-clamp-1 mb-1">
									{template.name}
								</h3>
								{template.category && (
									<Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium px-3 py-1">
										{template.category}
									</Badge>
								)}
							</div>
						</div>
					</div>
				</CardHeader>

				{/* Content */}
				<CardContent className="relative px-6 pb-6">
					{/* Description */}
					{template.description && (
						<p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
							{template.description}
						</p>
					)}

					{/* Metadata */}
					<div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
						<div className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							<span>{formattedDate}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
