import { Schema } from "mongoose";

// Sub-document schema for template fields
const TemplateFieldSubSchema = new Schema({
    key: {
        type: String,
        required: [true, 'Field key is required'],
        maxlength: [50, 'Field key cannot be more than 50 characters'],
    },
    label: {
        type: String,
        required: [true, 'Field label is required'],
        maxlength: [100, 'Field label cannot be more than 100 characters'],
    },
    placeholder: {
        type: String,
        maxlength: [100, 'Placeholder cannot be more than 100 characters'],
    },
    defaultValue: {
        type: Schema.Types.Mixed,
    },
    type: {
        type: String,
        required: [true, 'Field type is required'],
        enum: ['text', 'number', 'date', 'select', 'textarea', 'checkbox', 'radio', 'file'],
        default: 'text',
    },
    order: {
        type: Number,
        default: 0,
        min: [0, 'Order must be a positive integer'],
    },
}, {
    _id: true, // Enable _id for sub-documents
});

export default TemplateFieldSubSchema;
