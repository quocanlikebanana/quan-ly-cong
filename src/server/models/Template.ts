import mongoose, { Document, Schema } from 'mongoose';

interface ITemplate extends Document {
	name: string;
	key: string;
	jsonSchema: object;
	description?: string;
	category?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const TemplateSchema: Schema = new Schema<ITemplate>({
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
}, {
	timestamps: true, // This adds createdAt and updatedAt automatically
});

// Type-safe model export that prevents re-compilation during development
let Template: mongoose.Model<ITemplate>;

try {
	// Try to retrieve an existing model
	Template = mongoose.model<ITemplate>('Template');
} catch {
	// Create the model if it doesn't exist
	Template = mongoose.model<ITemplate>('Template', TemplateSchema);
}

export default Template;

