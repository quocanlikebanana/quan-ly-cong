import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CreateTemplateType } from '@/types/templates/template.schema';
import React, { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Edit3, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SchemaFieldInput({
	form,
}: {
	form: UseFormReturn<CreateTemplateType>;
}) {
	const [schemaText, setSchemaText] = useState('');
	const [parsedSchema, setParsedSchema] = useState<RJSFSchema | null>(null);
	const [parseError, setParseError] = useState<string | null>(null);
	const [previewData, setPreviewData] = useState({});

	const handleSchemaTextChange = useCallback((value: string) => {
		setSchemaText(value);

		if (!value.trim()) {
			setParsedSchema(null);
			setParseError(null);
			form.setValue('schema', null);
			return;
		}

		try {
			const parsed = JSON.parse(value);

			// Validate basic JSON Schema structure
			if (typeof parsed !== 'object' || parsed === null) {
				throw new Error('Schema phải là một object JSON hợp lệ');
			}

			setParsedSchema(parsed);
			setParseError(null);
			form.setValue('schema', parsed);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
			setParseError(errorMessage);
			setParsedSchema(null);
			form.setValue('schema', null);
		}
	}, [form]);

	const handlePreviewFormChange = useCallback((data: any) => {
		setPreviewData(data.formData || {});
	}, []);

	const insertSampleSchema = useCallback(() => {
		const sampleSchema = {
			title: "Thông tin nhân viên",
			type: "object",
			required: ["fullName", "position"],
			properties: {
				fullName: {
					type: "string",
					title: "Họ và tên",
					description: "Nhập họ và tên đầy đủ"
				},
				position: {
					type: "string",
					title: "Chức vụ",
					enum: ["Nhân viên", "Trưởng phòng", "Phó phòng", "Giám đốc"],
					description: "Chọn chức vụ hiện tại"
				},
				department: {
					type: "string",
					title: "Phòng ban",
					description: "Tên phòng ban"
				},
				startDate: {
					type: "string",
					format: "date",
					title: "Ngày bắt đầu làm việc"
				},
				salary: {
					type: "number",
					title: "Mức lương",
					minimum: 0,
					description: "Mức lương cơ bản (VNĐ)"
				},
				isActive: {
					type: "boolean",
					title: "Đang làm việc",
					default: true
				}
			}
		};

		const schemaString = JSON.stringify(sampleSchema, null, 2);
		setSchemaText(schemaString);
		handleSchemaTextChange(schemaString);
	}, [handleSchemaTextChange]);

	return (
		<FormField
			control={form.control}
			name="schema"
			render={({ field, fieldState }) => (
				<FormItem>
					<FormLabel className="text-base font-semibold">
						Schema JSON
					</FormLabel>
					<FormControl>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Edit3 className="h-5 w-5" />
									Cấu hình Schema cho Template
								</CardTitle>
								<CardDescription>
									Định nghĩa các trường dữ liệu động sẽ được sử dụng trong template.
									Schema tuân theo chuẩn JSON Schema để tạo form tự động.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Tabs defaultValue="editor" className="w-full">
									<TabsList className="grid w-full grid-cols-2">
										<TabsTrigger value="editor" className="flex items-center gap-2">
											<Edit3 className="h-4 w-4" />
											Chỉnh sửa Schema
										</TabsTrigger>
										<TabsTrigger value="preview" className="flex items-center gap-2">
											<Eye className="h-4 w-4" />
											Xem trước Form
										</TabsTrigger>
									</TabsList>

									<TabsContent value="editor" className="space-y-4">
										<div className="flex justify-between items-center">
											<p className="text-sm text-muted-foreground">
												Nhập JSON Schema để định nghĩa các trường dữ liệu:
											</p>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={insertSampleSchema}
											>
												Chèn mẫu
											</Button>
										</div>

										<Textarea
											placeholder="Nhập JSON Schema..."
											value={schemaText}
											onChange={(e) => handleSchemaTextChange(e.target.value)}
											className="min-h-[300px] font-mono text-sm"
										/>

										{parseError && (
											<Alert variant="destructive">
												<AlertCircle className="h-4 w-4" />
												<AlertDescription>
													<strong>Lỗi cú pháp JSON:</strong> {parseError}
												</AlertDescription>
											</Alert>
										)}

										{parsedSchema && !parseError && (
											<Alert>
												<CheckCircle2 className="h-4 w-4" />
												<AlertDescription>
													Schema hợp lệ! Chuyển sang tab "Xem trước Form" để kiểm tra form được tạo.
												</AlertDescription>
											</Alert>
										)}
									</TabsContent>

									<TabsContent value="preview" className="space-y-4">
										{parsedSchema ? (
											<div className="space-y-4">
												<div className="text-sm text-muted-foreground">
													Đây là form sẽ được tạo từ schema của bạn:
												</div>
												<div className="border rounded-lg p-4 bg-muted/30">
													<Form
														schema={parsedSchema}
														validator={validator}
														onChange={handlePreviewFormChange}
														formData={previewData}
														uiSchema={{
															'ui:submitButtonOptions': {
																norender: true
															}
														}}
													/>
												</div>

												{Object.keys(previewData).length > 0 && (
													<div className="space-y-2">
														<h4 className="font-medium">Dữ liệu mẫu sẽ được tạo:</h4>
														<div className="bg-muted p-3 rounded text-sm font-mono">
															<pre>{JSON.stringify(previewData, null, 2)}</pre>
														</div>
													</div>
												)}
											</div>
										) : (
											<Alert>
												<AlertCircle className="h-4 w-4" />
												<AlertDescription>
													Vui lòng nhập và lưu schema hợp lệ ở tab "Chỉnh sửa Schema" trước.
												</AlertDescription>
											</Alert>
										)}
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</FormControl>
					{fieldState.error && (
						<FormMessage>{fieldState.error.message}</FormMessage>
					)}
				</FormItem>
			)}
		/>
	);
}
