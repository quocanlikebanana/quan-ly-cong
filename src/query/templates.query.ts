import connectMongo from "@/server/database/mongoose";
import Template from "@/server/models/Template";

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

		const templates = await Template.find({
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
		const template = await Template.findById(id).lean();
		return template;
	}
}

