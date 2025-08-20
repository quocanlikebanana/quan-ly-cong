import mongoose, { Document, Schema } from 'mongoose';

interface ITemplate extends Document {
	name: string;
	key: string;
	jsonSchema: object;
	description?: string;
	category?: string;
	createdAt?: string;
	updatedAt?: string;
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

// // Type-safe model export that prevents re-compilation during development
// let Template: mongoose.Model<ITemplate>;
// if (mongoose.models.Template) {
// 	Template = mongoose.models.Template as mongoose.Model<ITemplate>;
// } else {
// 	Template = mongoose.model<ITemplate>('Template', TemplateSchema);
// }
// export default Template;

export default mongoose.model<ITemplate>('Template', TemplateSchema);