import queryTemplateById from "@/features/templates/query/query-template-by-id";
import { notFound } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { routes } from "@/client/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Tag } from "lucide-react";
import { DateUtils } from "@/lib/utils/date-utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function DocumentPage({
	params
}: {
	params: Promise<{
		templateId: string;
	}>
}) {
	const { templateId } = await params;

	const template = await queryTemplateById(templateId);

	if (!template) {
		notFound();
	}

	const createdDate = new Date(template.createdAt);
	const updatedDate = new Date(template.updatedAt);
	const formattedCreatedDate = DateUtils.Formater.toBaseFormat(createdDate);
	const formattedUpdatedDate = DateUtils.Formater.toBaseFormat(updatedDate);

	// Sort fields by order
	const sortedFields = [...template.fields].sort((a, b) => {
		const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
		return orderA - orderB;
	});

	return (
		<div className="flex flex-col gap-6 min-h-screen pb-8">
			{/* Header with Breadcrumb */}
			<div className="bg-lavender-web-800 border-b border-vista-blue-300 shadow-sm">
				<div className="container mx-auto py-4 space-y-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={routes.van_ban.INDEX}>Văn bản</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{template.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<h1 className="text-3xl font-bold text-vista-blue-950">{template.name}</h1>
						<Link href={`/van-ban/${templateId}/fill`}>
							<Button>
								Tạo văn bản từ mẫu này
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="container mx-auto space-y-6">
				{/* Template Info Card */}
				<Card>
					<CardHeader>
						<CardTitle>Thông tin văn bản mẫu</CardTitle>
						<CardDescription>Chi tiết về văn bản mẫu này</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Description */}
						{template.description && (
							<div>
								<h3 className="font-semibold text-sm text-muted-foreground mb-2">Mô tả</h3>
								<p className="text-sm">{template.description}</p>
							</div>
						)}

						<Separator />

						{/* Metadata Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Category */}
							{template.category && (
								<div className="flex items-center gap-2">
									<FileText className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm font-medium">Danh mục:</span>
									<Badge>{template.category}</Badge>
								</div>
							)}

							{/* Created Date */}
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-muted-foreground" />
								<span className="text-sm font-medium">Ngày tạo:</span>
								<span className="text-sm text-muted-foreground">{formattedCreatedDate}</span>
							</div>

							{/* Updated Date */}
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-muted-foreground" />
								<span className="text-sm font-medium">Cập nhật:</span>
								<span className="text-sm text-muted-foreground">{formattedUpdatedDate}</span>
							</div>
						</div>

						{/* Tags */}
						{template.tags && template.tags.length > 0 && (
							<>
								<Separator />
								<div>
									<div className="flex items-center gap-2 mb-3">
										<Tag className="w-4 h-4 text-muted-foreground" />
										<span className="text-sm font-medium">Thẻ:</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{template.tags.map((tag) => (
											<Badge key={tag} variant="outline">
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</>
						)}
					</CardContent>
				</Card>

				{/* Template Fields Card */}
				{sortedFields.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Các trường dữ liệu</CardTitle>
							<CardDescription>
								Danh sách các trường cần điền khi tạo văn bản từ mẫu này
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{sortedFields.map((field, index) => (
									<div key={field.key} className="border rounded-lg p-4 bg-muted/30">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1 space-y-2">
												<div className="flex items-center gap-2">
													<span className="text-sm font-mono text-muted-foreground">
														#{index + 1}
													</span>
													<h4 className="font-semibold">{field.label}</h4>
													<Badge variant="secondary" className="font-mono text-xs">
														{field.key}
													</Badge>
												</div>

												{field.placeholder && (
													<p className="text-sm text-muted-foreground">
														<span className="font-medium">Gợi ý: </span>
														{field.placeholder}
													</p>
												)}

												{field.defaultValue !== null && field.defaultValue !== undefined && (
													<p className="text-sm text-muted-foreground">
														<span className="font-medium">Giá trị mặc định: </span>
														<span className="font-mono">
															{typeof field.defaultValue === 'object'
																? JSON.stringify(field.defaultValue)
																: String(field.defaultValue)}
														</span>
													</p>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</main>
		</div>
	);
}
