import { Schema } from "mongoose";
import { TemplateStorageDataDto } from "../template.dto";

const TemplateStorageSubSchema = new Schema<TemplateStorageDataDto>({
    storageType: {
        type: String,
        required: [true, 'Field type is required'],
        enum: ["local", "s3"],
    },
    path: {
        type: String,
        required: [true, 'Field path is required'],
        maxlength: [500, 'Field path cannot be more than 500 characters'],
    },
    orginalFileName: {
        type: String,
        maxlength: [255, 'Original file name cannot be more than 255 characters'],
    },
}, {
});

export default TemplateStorageSubSchema;
