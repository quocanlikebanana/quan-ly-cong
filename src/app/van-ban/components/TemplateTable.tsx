'use client'

import { routes } from '@/client/routes';
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { TemplateView } from '@/features/templates/types/template.view';
import { DateUtils } from '@/lib/utils/date-utils';
import Link from 'next/link';
import React from 'react'

export default function TemplateTable({
	templates,
	onTemplateClick,
}: {
	templates: TemplateView[];
	onTemplateClick?: (template: TemplateView) => void;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Tags</TableHead>
					<TableHead className="text-right">Created</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{templates.length > 0 ? (
					templates.map((template) => (
						<Link
							key={template.id}
							href={routes.van_ban.id(template.id).INDEX}
						>
							<TemplateRow
								template={template}
								onTemplateClick={onTemplateClick}
							/>
						</Link>
					))
				) : (
					<TableRow>
						<TableCell colSpan={5} className="text-center text-muted-foreground py-8">
							No templates found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

function TemplateRow({
	template,
	onTemplateClick,
}: {
	template: TemplateView;
	onTemplateClick?: (template: TemplateView) => void;
}) {
	const dateString = DateUtils.Formater.toBaseFormat(new Date(template.createdAt));

	const handleRowClick = () => {
		onTemplateClick?.(template);
	};

	return (
		<TableRow
			className='hover:bg-blue-50/70 cursor-pointer'
			onClick={handleRowClick}
		>
			<TableCell className='font-medium'>
				<Link href={`/van-ban/${template.id}`} className='hover:underline hover:text-blue-700'>
					{template.name}
				</Link>
			</TableCell>
			<TableCell>
				{template.category && (
					<Badge variant="outline">
						{template.category}
					</Badge>
				)}
			</TableCell>
			<TableCell className='text-muted-foreground line-clamp-1 max-w-xs'>
				{template.description || '—'}
			</TableCell>
			<TableCell>
				{template.tags && template.tags.length > 0 ? (
					<div className="flex flex-wrap gap-1">
						{template.tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				) : (
					<span className='text-muted-foreground'>—</span>
				)}
			</TableCell>
			<TableCell className='text-sm text-muted-foreground text-right'>
				{dateString}
			</TableCell>
		</TableRow>
	)
}
