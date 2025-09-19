import mongoose, { Schema, InferSchemaType } from 'mongoose';

const AccountSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [50, 'Username cannot be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        maxlength: [100, 'Email cannot be more than 100 characters'],
    },
    passwordHash: {
        type: String,
        required: [true, 'Password hash is required'],
        minlength: [6, 'Password hash must be at least 6 characters'],
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Full name cannot be more than 100 characters'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['admin', 'user', 'moderator'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, 'Active status is required'],
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
        required: [true, 'Login status is required'],
    },
    lastLoginAt: {
        type: Date,
    },
    lastKnownIP: {
        type: String,
        maxlength: [45, 'IP address cannot be more than 45 characters'], // IPv6 support
    },
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
});

// Add indexes for better query performance
AccountSchema.index({ username: 1 });
AccountSchema.index({ email: 1 });
AccountSchema.index({ role: 1 });
AccountSchema.index({ isActive: 1 });
AccountSchema.index({ createdAt: -1 });

type AccountType = InferSchemaType<typeof AccountSchema>;

// Type-safe model export that prevents re-compilation during development
let AccountModel: mongoose.Model<AccountType>;

try {
    // Try to retrieve an existing model
    AccountModel = mongoose.model<AccountType>('Account');
} catch {
    // Create the model if it doesn't exist
    AccountModel = mongoose.model<AccountType>('Account', AccountSchema);
}

export default AccountModel;
