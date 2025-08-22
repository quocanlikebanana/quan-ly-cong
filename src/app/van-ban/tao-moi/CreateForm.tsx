"use client";

import { createTemplateAction } from '@/actions/create-template.action';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateTemplateType, CreateTemplateSchema } from '@/types/templates/template.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import router, { useRouter } from 'next/router';
import React, { useTransition } from 'react'
import { Form, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SchemaInput from './SchemaInput';

export default function CreateForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<CreateTemplateType>({
		resolver: zodResolver(CreateTemplateSchema),
		defaultValues: {
			name: '',
			description: '',
			category: '',
		},
	});

	const onSubmit = async (data: CreateTemplateType) => {
		startTransition(async () => {
			try {
				const file = data.file;

				// Prepare payload for server action
				const payload = {
					name: data.name,
					description: data.description || undefined,
					category: data.category || undefined,
					schema: {}, // Leave empty as requested
					file: file,
				};

				const result = await createTemplateAction(payload);

				if (result.success) {
					toast.success('Template đã được tạo thành công!');
					router.push('/van-ban');
				} else {
					toast.error(result.error || 'Có lỗi xảy ra khi tạo template');
				}
			} catch (error) {
				console.error('Error submitting form:', error);
				toast.error('Có lỗi xảy ra khi tạo template');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Name Field */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base font-semibold">
								Tên Template <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập tên template (VD: Hợp đồng lao động)"
									className="text-base"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Tên hiển thị của template trong hệ thống
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* File Upload Field */}
				<FormField
					control={form.control}
					name="file"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel className="text-base font-semibold">
								File Template <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<div className="space-y-2">
									<Input
										type="file"
										accept=".docx"
										className="text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-egyptian-blue-50 file:text-egyptian-blue-700 hover:file:bg-egyptian-blue-100"
										disabled={isPending}
										onChange={(e) => onChange(e.target.files)}
										{...fieldProps}
									/>
									{value && (
										<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
											<span className="font-medium">File đã chọn:</span> {value.name}
											<br />
											<span className="text-xs">
												Kích thước: {(value.size / 1024 / 1024).toFixed(2)} MB
											</span>
											{isPending && (
												<div className="mt-2 text-xs text-blue-600 flex items-center">
													<svg
														className="animate-spin -ml-1 mr-2 h-3 w-3"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													Đang tải lên...
												</div>
											)}
										</div>
									)}
								</div>
							</FormControl>
							<FormDescription>
								Chọn file DOCX làm template. Kích thước tối đa 10MB.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description Field */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base font-semibold">Mô tả</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Nhập mô tả chi tiết về template này..."
									className="text-base min-h-24"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Mô tả chi tiết về mục đích sử dụng và nội dung của template
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Category Field */}
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base font-semibold">Danh mục</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập danh mục (VD: Hợp đồng, Công văn, Quyết định)"
									className="text-base"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Phân loại template theo danh mục để dễ dàng quản lý
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Schema Info */}
				<SchemaInput />

				{/* Submit Button */}
				<div className="flex gap-4 pt-6">
					<Button
						type="submit"
						disabled={isPending}
						className="bg-egyptian-blue-600 hover:bg-egyptian-blue-700 text-white px-8 py-2 text-base"
					>
						{isPending ? (
							<>
								<LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
								Đang tạo...
							</>
						) : (
							'Tạo Template'
						)}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							if (!isPending) {
								router.push('/van-ban');
							}
						}}
						disabled={isPending}
						className="px-8 py-2 text-base"
					>
						Hủy
					</Button>
				</div>
			</form>
		</Form>
	)
}
