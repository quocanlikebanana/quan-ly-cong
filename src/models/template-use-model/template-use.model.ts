import mongoose, { Schema, InferSchemaType } from 'mongoose';

const TemplateUseSchema = new Schema({
    templateId: {
        type: Schema.Types.ObjectId,
        ref: 'Template',
        required: [true, 'Template ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this template use.'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'Author is required'],
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft',
        required: [true, 'Status is required'],
    },
    inputData: {
        type: Schema.Types.Mixed,
        required: [true, 'Input data is required'],
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters'],
    },
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
});

// Add indexes for better query performance
TemplateUseSchema.index({ templateId: 1, createdAt: -1 });
TemplateUseSchema.index({ author: 1 });
TemplateUseSchema.index({ status: 1 });

type TemplateUseType = InferSchemaType<typeof TemplateUseSchema>;

// Type-safe model export that prevents re-compilation during development
let TemplateUse: mongoose.Model<TemplateUseType>;

try {
    // Try to retrieve an existing model
    TemplateUse = mongoose.model<TemplateUseType>('TemplateUse');
} catch {
    // Create the model if it doesn't exist
    TemplateUse = mongoose.model<TemplateUseType>('TemplateUse', TemplateUseSchema);
}

export default TemplateUse;