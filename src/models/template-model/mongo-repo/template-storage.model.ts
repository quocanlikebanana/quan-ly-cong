import { Schema } from "mongoose";
import { TemplateStorageDto } from "../template.dto";

const TemplateStorageSubSchema = new Schema<TemplateStorageDto>({
    storageType: {
        type: String,
        required: [true, 'Field type is required'],
        enum: ["local", "s3"],
    },
    path: {
        type: String,
        required: [true, 'Field path is required'],
        maxlength: [500, 'Field path cannot be more than 500 characters'],
    }
}, {
});

export default TemplateStorageSubSchema;
