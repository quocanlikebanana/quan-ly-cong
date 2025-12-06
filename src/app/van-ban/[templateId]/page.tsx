import queryTemplateById from "@/features/templates/query/query-template-by-id";
import { notFound } from "next/navigation";
import TemplateInfoCard from "./components/TemplateInfoCard";
import TemplateFieldsCard from "./components/TemplateFieldsCard";
import TemplateDocxView from "./components/TemplatePDFFilePreview";

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

	// Sort fields by order
	const sortedFields = [...template.fields].sort((a, b) => {
		const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
		return orderA - orderB;
	});

	return (
		<div className="flex flex-col gap-6 min-h-full py-8">
			<main className="container mx-auto space-y-6">
				<div className="grid grid-cols-2 gap-6">

					<div className="flex flex-col">
						<TemplateInfoCard template={template} />
						<TemplateFieldsCard fields={sortedFields} />
					</div>
					<div className="w-full h-full">
						<TemplateDocxView storageKey={template.storage.key} />
					</div>
				</div>
			</main>
		</div>
	);
}
