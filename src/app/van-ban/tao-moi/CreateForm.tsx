"use client";

import { createTemplateAction } from '@/actions/create-template.action';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateTemplateType, CreateTemplateSchema } from '@/types/templates/template.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SchemaFieldInput from './SchemaFieldInput';
import FileFieldInput from './FileFieldInput';

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
		console.log('Submitting form with data:', data);
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
								Tên Mẫu <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập tên mẫu (VD: Hợp đồng lao động)"
									className="text-base"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Tên hiển thị của mẫu trong hệ thống
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FileFieldInput
					isPending={isPending}
					form={form}
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
									placeholder="Nhập mô tả chi tiết về mẫu này..."
									className="text-base min-h-24"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Mô tả chi tiết về mục đích sử dụng và nội dung của mẫu
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
								Phân loại mẫu theo danh mục để dễ dàng quản lý
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<SchemaFieldInput
					form={form}
				/>

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
							'Tạo Mẫu'
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
