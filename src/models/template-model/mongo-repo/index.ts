import connectMongo from "@/infra/database/mongoose";
import { TemplateData, TemplateDataCreate, TemplateDataQuery, TemplateDataUpdate } from "../template.data";
import { ITemplateRepository } from "../template.repo";
import { PagedResult } from "@/features/shared/paging.type";
import TemplateModel from "./template.model";

export class TemplateMongoRepository implements ITemplateRepository {
    async findAll(query: TemplateDataQuery): Promise<PagedResult<TemplateData>> {
        await connectMongo();
        const { search, perPage, page } = query;
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
            .skip((page - 1) * perPage)
            .limit(perPage)
            .lean<TemplateData[]>()
            ;
        const total = await TemplateModel.countDocuments(searchQuery);
        return {
            data: templates,
            total,
            totalPages: Math.ceil(total / perPage),
            currentPage: page,
            perPage,
        };
    }

    async findById(id: string): Promise<TemplateData | null> {
        await connectMongo();
        const template = await TemplateModel.findById(id).lean<TemplateData>();
        return template;
    }

    async create(data: TemplateDataCreate): Promise<{ id: string }> {
        await connectMongo();
        const newTemplate = await TemplateModel.create({
            ...data,
        });
        return { id: newTemplate.id };
    }

    async update(id: string, data: TemplateDataUpdate): Promise<void> {
        await connectMongo();
        await TemplateModel.findByIdAndUpdate(id, data);
    }

    async delete(id: string): Promise<void> {
        await connectMongo();
        await TemplateModel.findByIdAndDelete(id);
    }

    async reset(): Promise<void> {
        await connectMongo();
        await TemplateModel.deleteMany({});
    }
}