"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Save, Download, FileText, Clock, User, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'

// Mock document templates with JSON schema
const mockTemplates = {
	1: {
		name: "Quyết định số 123/2024/QĐ-UBND",
		category: "Quyết định",
		description: "Quyết định về việc ban hành quy định mới về quản lý tài liệu công",
		schema: {
			type: "object",
			required: ["soQuyetDinh", "ngayBanHanh", "tenCoQuan", "noiDung"],
			properties: {
				soQuyetDinh: {
					type: "string",
					title: "Số quyết định",
					description: "Số và ký hiệu quyết định"
				},
				ngayBanHanh: {
					type: "string",
					format: "date",
					title: "Ngày ban hành",
					description: "Ngày ban hành quyết định"
				},
				tenCoQuan: {
					type: "string",
					title: "Tên cơ quan ban hành",
					description: "Tên đầy đủ của cơ quan ban hành"
				},
				nguoiKy: {
					type: "object",
					title: "Người ký",
					properties: {
						hoTen: {
							type: "string",
							title: "Họ và tên"
						},
						chucVu: {
							type: "string",
							title: "Chức vụ"
						}
					}
				},
				noiDung: {
					type: "object",
					title: "Nội dung quyết định",
					properties: {
						canCu: {
							type: "string",
							title: "Căn cứ",
							description: "Các văn bản pháp lý làm căn cứ"
						},
						quyetDinh: {
							type: "string",
							title: "Nội dung quyết định",
							description: "Nội dung chính của quyết định"
						},
						hieuLuc: {
							type: "string",
							format: "date",
							title: "Có hiệu lực từ ngày"
						}
					}
				},
				dieuKhoan: {
					type: "array",
					title: "Các điều khoản",
					items: {
						type: "object",
						properties: {
							dieu: {
								type: "string",
								title: "Điều số"
							},
							noiDung: {
								type: "string",
								title: "Nội dung điều"
							}
						}
					}
				}
			}
		},
		uiSchema: {
			noiDung: {
				canCu: {
					"ui:widget": "textarea",
					"ui:options": {
						rows: 4
					}
				},
				quyetDinh: {
					"ui:widget": "textarea",
					"ui:options": {
						rows: 6
					}
				}
			},
			dieuKhoan: {
				items: {
					noiDung: {
						"ui:widget": "textarea",
						"ui:options": {
							rows: 3
						}
					}
				}
			}
		},
		formData: {
			soQuyetDinh: "123/2024/QĐ-UBND",
			ngayBanHanh: "2024-01-15",
			tenCoQuan: "Ủy ban nhân dân tỉnh",
			nguoiKy: {
				hoTen: "Nguyễn Văn A",
				chucVu: "Chủ tịch UBND tỉnh"
			},
			noiDung: {
				canCu: "- Luật Tổ chức chính quyền địa phương số 77/2015/QH13;\n- Nghị định số 63/2020/NĐ-CP của Chính phủ;",
				quyetDinh: "Ban hành quy định mới về quản lý tài liệu công trong phạm vi tỉnh",
				hieuLuc: "2024-02-01"
			},
			dieuKhoan: [
				{
					dieu: "Điều 1",
					noiDung: "Ban hành kèm theo Quyết định này Quy định về quản lý tài liệu công"
				},
				{
					dieu: "Điều 2",
					noiDung: "Quyết định này có hiệu lực từ ngày ký"
				}
			]
		}
	},
	2: {
		name: "Thông tư số 45/2024/TT-BNV",
		category: "Thông tư",
		description: "Hướng dẫn thực hiện các quy định về quản lý hồ sơ cán bộ",
		schema: {
			type: "object",
			required: ["soThongTu", "ngayBanHanh", "tenCoQuan", "noiDungHuongDan"],
			properties: {
				soThongTu: {
					type: "string",
					title: "Số thông tư"
				},
				ngayBanHanh: {
					type: "string",
					format: "date",
					title: "Ngày ban hành"
				},
				tenCoQuan: {
					type: "string",
					title: "Tên cơ quan ban hành"
				},
				noiDungHuongDan: {
					type: "string",
					title: "Nội dung hướng dẫn"
				},
				phamViApDung: {
					type: "string",
					title: "Phạm vi áp dụng"
				}
			}
		},
		uiSchema: {
			noiDungHuongDan: {
				"ui:widget": "textarea",
				"ui:options": {
					rows: 8
				}
			},
			phamViApDung: {
				"ui:widget": "textarea",
				"ui:options": {
					rows: 4
				}
			}
		},
		formData: {
			soThongTu: "45/2024/TT-BNV",
			ngayBanHanh: "2024-02-20",
			tenCoQuan: "Bộ Nội vụ",
			noiDungHuongDan: "Hướng dẫn chi tiết về việc quản lý hồ sơ cán bộ, công chức, viên chức",
			phamViApDung: "Áp dụng đối với các cơ quan, đơn vị thuộc hệ thống hành chính nhà nước"
		}
	}
}

// Mock past edits data
const mockPastEdits = [
	{
		id: 1,
		name: "Phiên bản gốc",
		date: "2024-08-15 09:00",
		author: "Nguyễn Văn A",
		status: "published"
	},
	{
		id: 2,
		name: "Cập nhật điều 2",
		date: "2024-08-15 14:30",
		author: "Trần Thị B",
		status: "draft"
	},
	{
		id: 3,
		name: "Bổ sung căn cứ pháp lý",
		date: "2024-08-16 10:15",
		author: "Lê Văn C",
		status: "draft"
	}
]

interface DocumentPageProps {
	params: {
		documentId: string
	}
}

export default function DocumentPage({ params }: DocumentPageProps) {
	const [formData, setFormData] = useState<any>({})
	const [currentTemplate, setCurrentTemplate] = useState<any>(null)
	const [selectedEdit, setSelectedEdit] = useState<number>(1)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate loading template data
		const templateId = parseInt(params.documentId)
		const template = mockTemplates[templateId as keyof typeof mockTemplates]

		if (template) {
			setCurrentTemplate(template)
			setFormData(template.formData)
		}
		setIsLoading(false)
	}, [params.documentId])

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
		// Reset form to default template
		if (currentTemplate) {
			setFormData(currentTemplate.formData)
		}
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-lavender-web-900 flex items-center justify-center">
				<div className="text-center">
					<FileText className="w-16 h-16 text-vista-blue-400 mx-auto mb-4 animate-pulse" />
					<p className="text-vista-blue-700">Đang tải...</p>
				</div>
			</div>
		)
	}

	if (!currentTemplate) {
		return (
			<div className="min-h-screen bg-lavender-web-900 flex items-center justify-center">
				<div className="text-center">
					<FileText className="w-16 h-16 text-vista-blue-400 mx-auto mb-4" />
					<h3 className="text-xl font-semibold text-vista-blue-700 mb-2">
						Không tìm thấy văn bản
					</h3>
					<Link href="/van-ban">
						<Button variant="outline" className="border-egyptian-blue-400 text-egyptian-blue-600">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Quay lại danh sách
						</Button>
					</Link>
				</div>
			</div>
		)
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
							<h1 className="text-2xl font-bold">{currentTemplate.name}</h1>
							<p className="text-lavender-web-200">
								{currentTemplate.category} • {currentTemplate.description}
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
							{mockPastEdits.map((edit) => (
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
									schema={currentTemplate.schema}
									uiSchema={currentTemplate.uiSchema}
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
