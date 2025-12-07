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
		<div className="h-full container py-8 mx-auto grid grid-cols-2 gap-6 overflow-hidden ">
			<div className="flex flex-col gap-4 ">
				<TemplateInfoCard template={template} />
				<TemplateFieldsCard fields={sortedFields} />
			</div>
			<div className="contain-size w-full min-h-[70vh] max-h-full overflow-auto p-1 border rounded-md">
				<TemplateDocxView storageKey={template.storage.key} />
			</div>
		</div>
	);
}
