/**
 * Fields that an Account should have:
 */
export interface Account {
    id: string;                // Unique identifier
    username: string;          // Username for login
    email: string;             // Email address
    passwordHash: string;      // Hashed password
    fullName: string;          // Full name of the user
    role: string;              // Role (e.g., admin, user)
    isActive: boolean;         // Account active status to enable/disable login
    isLoggedIn: boolean;       // Login status, prevented from multiple logins
    createdAt: Date;           // Account creation date
    updatedAt: Date;           // Last update date
    lastLoginAt?: Date;        // Last login timestamp (optional)
    lastKnownIP?: string;      // Last known IP address (optional)
}
