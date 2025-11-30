import connectMongo from "@/infra/database/mongoose";
import { TemplateDataDto, TemplateDataCreateDto, TemplateDataQueryDto, TemplateDataUpdateDto, TemplateDataDtoParser } from "../template.dto";
import { ITemplateRepository } from "../template.repo";
import { PagedResult } from "@/features/shared/paging.type";
import TemplateModel from "./template.model";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";

export class TemplateMongoRepository implements ITemplateRepository {
    async findAll(query: TemplateDataQueryDto): Promise<PagedResult<TemplateDataDto>> {
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
            .lean()
            ;
        const stripped = templates.map(t => TemplateDataDtoParser.fromLean(t));

        const total = await TemplateModel.countDocuments(searchQuery);
        return {
            data: stripped,
            total,
            totalPages: Math.ceil(total / perPage),
            currentPage: page,
            perPage,
        };
    }

    async findById(id: string): Promise<TemplateDataDto | null> {
        await connectMongo();
        if (isValidObjectId(id) === false) {
            return null;
        }
        const _id = new ObjectId(id);
        if (!_id) {
            return null;
        }
        const templateLean = await TemplateModel.findById(_id).lean();
        const template = templateLean ? TemplateDataDtoParser.fromLean(templateLean) : null;
        return template;
    }

    async create(data: TemplateDataCreateDto): Promise<{ id: string }> {
        await connectMongo();
        const newTemplate = await TemplateModel.create({
            ...data,
        });
        return { id: newTemplate.id };
    }

    async update(id: string, data: TemplateDataUpdateDto): Promise<void> {
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