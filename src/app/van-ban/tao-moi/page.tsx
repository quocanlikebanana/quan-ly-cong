import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CreateForm from './CreateForm';

export default function CreateTemplatePage() {
	return (
		<div className="min-h-screen py-8">
			<div className="container mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-egyptian-blue mb-2">Tạo Mẫu Mới</h1>
					<p className="text-lavender-web-200 text-lg">
						Tải lên file DOCX và điền thông tin để tạo Mẫu văn bản mới
					</p>
				</div>

				<Card className={`bg-white/95 backdrop-blur-sm border-lavender-web-300`}>
					<CardHeader>
						<CardTitle className="text-2xl text-egyptian-blue-600">
							Thông tin Mẫu
						</CardTitle>
						<CardDescription>
							Mẫu văn bản là cơ sở để tạo các văn bản mới nhanh chóng và đồng bộ.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CreateForm />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
