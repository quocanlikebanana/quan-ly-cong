import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import React from 'react';
import { DateUtils } from '@/lib/utils/date-utils';
import { TemplateView } from '@/features/templates/types/template.view';
import { Separator } from '@/components/ui/separator';

export default function TemplateCard({
	template
}: {
	template: TemplateView;
}) {
	const createdDate = new Date(template.createdAt || Date.now());
	const formattedDate = DateUtils.Formater.toBaseFormat(createdDate);

	return (
		<div className='w-full h-full border p-4 rounded-md hover:shadow-md hover:bg-blue-50 transition-all duration-300 group'>
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-xl font-bold group-hover:text-blue-700 transition-colors duration-300 line-clamp-1 mb-1">
					{template.name}
				</h3>
				{template.category && (
					<Badge>
						{template.category}
					</Badge>
				)}
			</div>

			{/* Description */}
			{template.description && (
				<p className="text-muted-foreground text-sm line-clamp-1 mb-4">
					{template.description}
				</p>
			)}

			<Separator className="my-2" />

			<div className='flex items-center justify-end'>
				{template.tags && template.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{template.tags.map((tag) => (
							<Badge key={tag} variant="outline" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				)}

				{/* Metadata */}
				<div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
					<Calendar className="w-4 h-4" />
					<span>{formattedDate}</span>
				</div>
			</div>
		</div>
	);
}
