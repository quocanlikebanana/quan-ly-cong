import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { CONSTANTS } from '@/lib/const/constants';

const TEMP_DIR = CONSTANTS.server.tempDir;

const FILE_LIFETIME_MS = 60 * 60 * 1000; // 1 hour
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export class TempFileBufferInfra {
    private static instance: TempFileBufferInternal | null = null;
    static getInstance(): TempFileBufferInternal {
        if (!this.instance) {
            this.instance = new TempFileBufferInternal();
        }
        return this.instance;
    }
}

/**
 * Infrastructure service for managing temporary file buffers.
 * Automatically cleans up old files after their lifetime expires.
 */
class TempFileBufferInternal {
    private cleanupIntervalId?: NodeJS.Timeout;

    constructor() {
        this.ensureTempDirExists();
        this.startCleanupJob();
    }

    /**
     * Writes data to a temporary file.
     * @param filename - Name of the file to create
     * @param data - Buffer or string data to write
     * @returns Absolute path to the created file
     */
    async writeFileBuffer(filename: string, data: Buffer | string): Promise<string> {
        const filePath = this.getFilePath(filename);
        await fs.writeFile(filePath, data);
        return filePath;
    }

    /**
     * Reads data from a temporary file.
     * @param filename - Name of the file to read
     * @returns Buffer containing file data
     * @throws Error if file doesn't exist
     */
    async readFileBuffer(filename: string): Promise<Buffer> {
        const filePath = this.getFilePath(filename);
        return await fs.readFile(filePath);
    }

    /**
     * Deletes a specific temporary file.
     * @param filename - Name of the file to delete
     */
    async deleteFileBuffer(filename: string): Promise<void> {
        const filePath = this.getFilePath(filename);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            // File may not exist, which is acceptable
            if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw err;
            }
        }
    }

    /**
     * Checks if a temporary file exists.
     * @param filename - Name of the file to check
     * @returns True if file exists, false otherwise
     */
    async fileExists(filename: string): Promise<boolean> {
        const filePath = this.getFilePath(filename);
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Stops the cleanup job. Useful for testing or graceful shutdown.
     */
    stopCleanupJob(): void {
        if (this.cleanupIntervalId) {
            clearInterval(this.cleanupIntervalId);
            this.cleanupIntervalId = undefined;
        }
    }

    /**
     * Manually triggers cleanup of expired files.
     */
    async cleanupExpiredFiles(): Promise<void> {
        try {
            const files = await fs.readdir(TEMP_DIR);
            const now = Date.now();

            const deletePromises = files.map(async (file) => {
                try {
                    const filePath = path.join(TEMP_DIR, file);
                    const stats = await fs.stat(filePath);

                    if (now - stats.mtimeMs > FILE_LIFETIME_MS) {
                        await fs.unlink(filePath);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    // File may have been deleted by another process
                    // or may be inaccessible - skip it
                }
            });

            await Promise.all(deletePromises);
        } catch (err) {
            // Directory may not exist or be inaccessible
            console.error('Error during temp file cleanup:', err);
        }
    }

    private ensureTempDirExists(): void {
        if (!existsSync(TEMP_DIR)) {
            mkdirSync(TEMP_DIR, { recursive: true });
        }
    }

    private getFilePath(filename: string): string {
        // Sanitize filename to prevent path traversal
        const sanitizedFilename = path.basename(filename);
        return path.join(TEMP_DIR, sanitizedFilename);
    }

    private startCleanupJob(): void {
        this.cleanupIntervalId = setInterval(() => {
            this.cleanupExpiredFiles();
        }, CLEANUP_INTERVAL_MS);

        // Don't prevent Node.js from exiting
        this.cleanupIntervalId.unref();
    }
}


