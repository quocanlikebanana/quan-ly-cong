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
import React from 'react'
import TemplateRow from './TemplateRow';
import { useRouter } from 'next/navigation';

export default function TemplateTable({
	templates,
}: {
	templates: TemplateView[];
}) {
	const router = useRouter();
	const onTemplateClick = (template: TemplateView) => {
		router.push(routes.van_ban.id(template.id).INDEX);
	};
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Tên mẫu</TableHead>
					<TableHead>Loại</TableHead>
					<TableHead>Mô tả</TableHead>
					<TableHead>Thẻ</TableHead>
					<TableHead className="text-right">Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{templates.length > 0 ? (
					templates.map((template) => (
						<TemplateRow
							key={template.id}
							template={template}
							onTemplateClick={onTemplateClick}
						/>
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
