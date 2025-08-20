import Template from '@/server/models/Template';
import connectMongo from '@/server/database/mongoose';
import DocumentEditor from './document-editor'
import { mockPastEdits } from './mock'
import { notFound } from 'next/navigation';

export default async function DocumentPage({
	params
}: {
	params: Promise<{
		templateId: string;
	}>
}) {
	const { templateId } = await params;

	try {
		// Connect to MongoDB
		await connectMongo();

		// Fetch template by ID
		const template = await Template.findById(templateId).lean();

		if (!template) {
			notFound();
		}

		// Convert MongoDB document to plain object for client component
		const templateData = {
			_id: template._id.toString(),
			name: template.name,
			key: template.key,
			jsonSchema: template.jsonSchema,
			description: template.description || '',
			category: template.category || '',
			createdAt: template.createdAt?.toISOString(),
			updatedAt: template.updatedAt?.toISOString()
		};

		return (
			<DocumentEditor
				template={templateData}
				pastEdits={mockPastEdits}
			/>
		)
	} catch (error) {
		console.error('Error fetching template:', error);
		notFound();
	}
}
