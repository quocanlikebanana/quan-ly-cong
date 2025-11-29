import mongoose, { Schema, InferSchemaType } from 'mongoose';
import TemplateFieldSubSchema from './template-field.model';
import { TemplateDataDto } from '../template.dto';

const TemplateSchema = new Schema<TemplateDataDto>({
	name: {
		type: String,
		required: [true, 'Please provide a name for this template.'],
		maxlength: [100, 'Name cannot be more than 100 characters'],
	},
	description: {
		type: String,
		maxlength: [500, 'Description cannot be more than 500 characters'],
	},
	category: {
		type: String,
		maxlength: [50, 'Category cannot be more than 50 characters'],
	},
	tags: {
		type: [String],
		default: [],
	},
	fields: [{
		type: TemplateFieldSubSchema,
		required: [true, 'Template must have at least one field.'],
	}]
}, {
	_id: false,
	id: true,
	timestamps: true, // This adds createdAt and updatedAt automatically
});

export type TemplateModelType = InferSchemaType<typeof TemplateSchema>;

// Type-safe model export that prevents re-compilation during development
let TemplateModel: mongoose.Model<TemplateModelType>;

try {
	// Try to retrieve an existing model
	TemplateModel = mongoose.model<TemplateModelType>('Template');
} catch {
	// Create the model if it doesn't exist
	TemplateModel = mongoose.model<TemplateModelType>('Template', TemplateSchema);
}

export default TemplateModel;
