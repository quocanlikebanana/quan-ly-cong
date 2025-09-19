import connectMongo from "@/server/infra/database/mongoose";
import TemplateModel from "@/server/models/template-model";

export class TemplatesQuery {
	static async getAllTemplates({
		search,
		perPage = 10,
		page = 1,
	}: {
		search?: string;
		perPage?: number;
		page?: number;
	}) {
		await connectMongo();

		const templates = await TemplateModel.find({
			name: {
				$regex: search || '',
				$options: 'i',
			},
		})
			.skip((page - 1) * perPage)
			.limit(perPage)
			.lean();

		return templates;
	}

	static async getTemplateById(id: string) {
		await connectMongo();
		const template = await TemplateModel.findById(id).lean();
		return template;
	}
}

