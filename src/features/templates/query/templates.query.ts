import "server-only";

import connectMongo from "@/server/infra/database/mongoose";
import TemplateModel from "@/server/models/template-model";
import { TemplateDetailView, TemplateItemView } from "../views/template.view";
import { PagedResult, PagingParams } from "@/features/shared/paging.type";

export class TemplatesQuery {
	static async getAllTemplates(params: PagingParams): Promise<PagedResult<TemplateItemView>> {
		const { search, perPage, page } = params;
		await connectMongo();

		const searchQuery = search
			? {
				name: {
					$regex: search,
					$options: 'i',
				},
			}
			: {};

		const templates = await TemplateModel
			.find(searchQuery)
			.select("-fields")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.lean()
			;

		const total = await TemplateModel.countDocuments(searchQuery);

		// Transform the data to match TemplateItemView structure
		const transformedTemplates: TemplateItemView[] = templates.map(template => ({
			id: template._id.toString(),
			name: template.name,
			key: template.key,
			description: template.description,
			category: template.category,
			tags: template.tags,
			createdAt: template.createdAt.toISOString(),
			updatedAt: template.updatedAt.toISOString(),
		}));

		return {
			data: transformedTemplates,
			total,
			totalPages: Math.ceil(total / perPage),
			currentPage: page,
			perPage,
		};
	}

	static async getTemplateById(id: string): Promise<TemplateDetailView | null> {
		await connectMongo();
		const template = await TemplateModel.findById(id).lean();
		if (!template) return null;

		// Transform the data to match TemplateDetailView structure
		const transformedTemplate: TemplateDetailView = {
			id: template._id.toString(),
			name: template.name,
			key: template.key,
			description: template.description,
			category: template.category,
			tags: template.tags,
			createdAt: template.createdAt.toISOString(),
			updatedAt: template.updatedAt.toISOString(),
			fields: template.fields.map(field => ({
				key: field.key,
				label: field.label,
				placeholder: field.placeholder,
				defaultValue: field.defaultValue,
				order: field.order,
			})),
		};

		return transformedTemplate;
	}
}

