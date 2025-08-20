"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Save, Download, FileText, Clock, User, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import type { DocumentEditorProps } from './types'

export default function DocumentEditor({ template, pastEdits }: DocumentEditorProps) {
	// Initialize form data as empty object since we're not using mock data anymore
	const [formData, setFormData] = useState<any>({})
	const [selectedEdit, setSelectedEdit] = useState<number>(1)

	const handleFormChange = (data: any) => {
		setFormData(data.formData)
	}

	const handleSave = () => {
		// Mock save functionality
		console.log('Saving form data:', formData)
		alert('Đã lưu thành công!')
	}

	const handleDownloadDocx = () => {
		// Mock download functionality
		alert('Tính năng tải xuống DOCX sẽ được triển khai!')
	}

	const handleCreateNew = () => {
		// Reset form to empty
		setFormData({})
	}

	return (
		<div className="min-h-screen bg-lavender-web-900">
			{/* Header */}
			<header className="bg-egyptian-blue-600 text-lavender-web-900 py-6 px-6">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link href="/van-ban">
							<Button variant="ghost" size="sm" className="text-lavender-web-900 hover:bg-egyptian-blue-700">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Quay lại
							</Button>
						</Link>
						<div>
							<h1 className="text-2xl font-bold">{template.name}</h1>
							<p className="text-lavender-web-200">
								{template.category} • {template.description}
							</p>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							onClick={handleSave}
							className="bg-goldenrod-600 hover:bg-goldenrod-700 text-goldenrod-100"
						>
							<Save className="w-4 h-4 mr-2" />
							Lưu
						</Button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto flex gap-6 p-6">
				{/* Left Sidebar */}
				<div className="w-80 flex-shrink-0 space-y-4">
					{/* Create New */}
					<Card className="border-vista-blue-300 bg-lavender-web-900">
						<CardHeader className="pb-3">
							<CardTitle className="text-egyptian-blue-600 flex items-center gap-2">
								<Plus className="w-5 h-5" />
								Tạo mới
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<Button
								onClick={handleCreateNew}
								variant="outline"
								className="w-full border-egyptian-blue-400 text-egyptian-blue-600 hover:bg-egyptian-blue-50"
							>
								Tạo phiên bản mới
							</Button>
						</CardContent>
					</Card>

					{/* Past Edits */}
					<Card className="border-vista-blue-300 bg-lavender-web-900">
						<CardHeader className="pb-3">
							<CardTitle className="text-egyptian-blue-600 flex items-center gap-2">
								<Clock className="w-5 h-5" />
								Lịch sử chỉnh sửa
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0 space-y-2">
							{pastEdits.map((edit) => (
								<div
									key={edit.id}
									className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedEdit === edit.id
										? 'border-egyptian-blue-500 bg-egyptian-blue-50'
										: 'border-vista-blue-200 hover:border-vista-blue-400 hover:bg-vista-blue-50'
										}`}
									onClick={() => setSelectedEdit(edit.id)}
								>
									<div className="flex items-start justify-between">
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm text-egyptian-blue-700 truncate">
												{edit.name}
											</p>
											<p className="text-xs text-vista-blue-600 mt-1">
												{edit.date}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<User className="w-3 h-3 text-vista-blue-500" />
												<span className="text-xs text-vista-blue-600">{edit.author}</span>
											</div>
										</div>
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${edit.status === 'published'
											? 'bg-goldenrod-100 text-goldenrod-700'
											: 'bg-vista-blue-100 text-vista-blue-700'
											}`}>
											{edit.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
										</span>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Download Section */}
					<Card className="border-vista-blue-300 bg-lavender-web-900">
						<CardHeader className="pb-3">
							<CardTitle className="text-egyptian-blue-600 flex items-center gap-2">
								<Download className="w-5 h-5" />
								Xuất file
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<Button
								onClick={handleDownloadDocx}
								variant="outline"
								className="w-full border-goldenrod-400 text-goldenrod-600 hover:bg-goldenrod-50"
							>
								<FileText className="w-4 h-4 mr-2" />
								Tải xuống DOCX
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Main Content - Form */}
				<div className="flex-1">
					<Card className="border-vista-blue-300 bg-lavender-web-900">
						<CardHeader>
							<CardTitle className="text-egyptian-blue-600 flex items-center gap-2">
								<Edit className="w-5 h-5" />
								Chỉnh sửa văn bản
							</CardTitle>
							<CardDescription className="text-vista-blue-600">
								Điền thông tin vào các trường bên dưới để tạo văn bản
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="max-w-4xl">
								<Form
									schema={template.jsonSchema}
									formData={formData}
									onChange={handleFormChange}
									validator={validator}
									showErrorList={false}
									className="space-y-6"
								>
									<div />
								</Form>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
