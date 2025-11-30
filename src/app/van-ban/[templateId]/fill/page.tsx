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

    // Sort fields by order
    const sortedFields = [...template.fields].sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    return (
        <div className="flex flex-col gap-6 min-h-screen py-8">
            <main className="container mx-auto">
                <FillTemplateForm template={template} sortedFields={sortedFields} />
            </main>
        </div>
    );
}
