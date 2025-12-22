import queryTemplateById from "@/features/templates/query/query-template-by-id";
import { notFound } from "next/navigation";
import FillTemplateForm from "./components/FillTemplateForm";

export default async function FillTemplatePage({
    params
}: {
    params: Promise<{
        templateId: string;
    }>;
}) {
    const { templateId } = await params;

    const template = await queryTemplateById(templateId);

    if (!template) {
        notFound();
    }

    return (
        <div className="container mx-auto flex flex-col gap-6 min-h-screen py-8">
            <FillTemplateForm
                template={template}
            />
        </div>
    );
}
