import mongoose, { Schema, InferSchemaType } from 'mongoose';

const TemplateSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name for this template.'],
		maxlength: [100, 'Name cannot be more than 100 characters'],
	},
	key: {
		type: String,
		required: [true, 'Please provide a key for this template.'],
		unique: true,
	},
	jsonSchema: {
		type: Schema.Types.Mixed,
		required: [true, 'Please provide a JSON schema for this template.'],
	},
	description: {
		type: String,
		maxlength: [500, 'Description cannot be more than 500 characters'],
	},
	category: {
		type: String,
		maxlength: [50, 'Category cannot be more than 50 characters'],
	},
	isBookmarked: {
		type: Boolean,
		default: false,
	},
}, {
	timestamps: true, // This adds createdAt and updatedAt automatically
});

type TemplateType = InferSchemaType<typeof TemplateSchema>;

// Type-safe model export that prevents re-compilation during development
let Template: mongoose.Model<TemplateType>;

try {
	// Try to retrieve an existing model
	Template = mongoose.model<TemplateType>('Template');
} catch {
	// Create the model if it doesn't exist
	Template = mongoose.model<TemplateType>('Template', TemplateSchema);
}

export default Template;

