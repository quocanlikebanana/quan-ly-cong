import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CreateForm from './CreateForm';

export default function CreateTemplatePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-lavender-web-900 to-lavender-web-800 py-8">
			<div className="max-w-4xl mx-auto px-6">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">Tạo Template Mới</h1>
					<p className="text-lavender-web-200 text-lg">
						Tải lên file DOCX và điền thông tin để tạo template văn bản mới
					</p>
				</div>

				<Card className={`bg-white/95 backdrop-blur-sm border-lavender-web-300`}>
					<CardHeader>
						<CardTitle className="text-2xl text-egyptian-blue-600">
							Thông tin Template
						</CardTitle>
						<CardDescription>
							Điền đầy đủ thông tin để tạo template văn bản. Schema JSON sẽ được để trống tạm thời.
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
