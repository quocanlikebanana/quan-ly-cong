import { Schema } from "mongoose";
import { TemplateFieldData } from "../template.data";

const TemplateFieldSubSchema = new Schema<TemplateFieldData>({
    type: {
        type: String,
        required: [true, 'Field type is required'],
    },
    order: {
        type: Number,
        default: 0,
        min: [0, 'Order must be a positive integer'],
    },
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
    description: {
        type: String,
        maxlength: [200, 'Field description cannot be more than 200 characters'],
    },
    uiMetadata: {
        type: Schema.Types.Mixed,
        default: {},
    },
    renderMetadata: {
        type: Schema.Types.Mixed,
        default: {},
    },
}, {
});

export default TemplateFieldSubSchema;
