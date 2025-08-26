import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { CreateTemplateType } from '@/types/templates/template.schema';
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { Loader } from 'lucide-react';

export default function FileFieldInput({
	isPending,
	form,
}: {
	isPending: boolean;
	form: UseFormReturn<CreateTemplateType>;
}) {
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertTitle, setAlertTitle] = useState('');

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
		const files = e.target.files;

		if (!files || files.length === 0) {
			onChange(null);
			return;
		}

		// Check if multiple files are selected
		if (files.length > 1) {
			setAlertTitle('Cảnh báo');
			setAlertMessage('Chỉ có thể chọn một file duy nhất. Vui lòng chọn lại.');
			setAlertOpen(true);
			e.target.value = ''; // Clear the input
			return;
		}

		const file = files[0];
		const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

		// Check file size
		if (file.size > maxSizeInBytes) {
			setAlertTitle('File quá lớn');
			setAlertMessage(`File "${file.name}" có kích thước ${(file.size / 1024 / 1024).toFixed(2)} MB, vượt quá giới hạn 10MB. Vui lòng chọn file khác.`);
			setAlertOpen(true);
			e.target.value = ''; // Clear the input
			return;
		}

		onChange(file);
	};

	return (
		<>
			<FormField
				control={form.control}
				name="file"
				render={({ field: { value, onChange, ...fieldProps } }) => (
					<FormItem>
						<FormLabel className="text-base font-semibold">
							File Mẫu <span className="text-red-500">*</span>
						</FormLabel>
						<FormControl>
							<div className="space-y-2">
								<Input
									type="file"
									accept=".docx"
									className="text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-egyptian-blue-50 file:text-egyptian-blue-700 cursor-pointer"
									disabled={isPending}
									onChange={(e) => handleFileChange(e, onChange)}
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
												<Loader className="animate-spin mr-1 h-4 w-4" />
												Đang tải lên...
											</div>
										)}
									</div>
								)}
							</div>
						</FormControl>
						<FormDescription>
							Chọn file DOCX làm mẫu. Kích thước tối đa 10MB.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{alertTitle}</AlertDialogTitle>
						<AlertDialogDescription>
							{alertMessage}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction onClick={() => setAlertOpen(false)}>
							Đã hiểu
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
