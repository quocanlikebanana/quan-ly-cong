import mongoose, { Schema, InferSchemaType } from 'mongoose';
import { AdministrativeUnitDto } from '../administrative-unit.dto';

const AdministrativeUnitSchema = new Schema<AdministrativeUnitDto>({
    id: {
        type: String,
        // required: [true, 'Please provide an id for this administrative unit.'],
        // unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this administrative unit.'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    code: {
        type: String,
        required: [true, 'Please provide a code for this administrative unit.'],
        maxlength: [20, 'Code cannot be more than 20 characters'],
        unique: true,
    },
    parentUnitId: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: [true, 'Please provide a level for this administrative unit.'],
        enum: {
            values: ['commune', 'province'],
            message: 'Level must be either commune or province',
        },
    },
    type: {
        type: String,
        required: [true, 'Please provide a type for this administrative unit.'],
        enum: {
            values: ['commune', 'ward', 'special-zone', 'province', 'city'],
            message: 'Type must be one of: commune, ward, special-zone, province, city',
        },
    },
}, {
    id: false,
    timestamps: true, // This adds createdAt and updatedAt automatically
});

// Add compound validation to ensure type matches level
AdministrativeUnitSchema.pre('save', function () {
    if (this.level === 'commune' && !['commune', 'ward', 'special-zone'].includes(this.type)) {
        throw new Error('Commune level must have type: commune, ward, or special-zone');
    }
    if (this.level === 'province' && !['province', 'city'].includes(this.type)) {
        throw new Error('Province level must have type: province or city');
    }
});

export type AdministrativeUnitModelType = InferSchemaType<typeof AdministrativeUnitSchema>;

// Type-safe model export that prevents re-compilation during development
let AdministrativeUnitModel: mongoose.Model<AdministrativeUnitModelType>;

try {
    // Try to retrieve an existing model
    AdministrativeUnitModel = mongoose.model<AdministrativeUnitModelType>('AdministrativeUnit');
} catch {
    // Create the model if it doesn't exist
    AdministrativeUnitModel = mongoose.model<AdministrativeUnitModelType>('AdministrativeUnit', AdministrativeUnitSchema);
}

export default AdministrativeUnitModel;
