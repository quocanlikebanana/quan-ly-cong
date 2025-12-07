'use client'

import { routes } from '@/client/routes';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { TemplateView } from '@/features/templates/types/template.view';
import Link from 'next/link';
import React from 'react'
import TemplateRow from './TemplateRow';

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
