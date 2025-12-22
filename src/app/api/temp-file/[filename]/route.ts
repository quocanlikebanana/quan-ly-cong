import { NextRequest, NextResponse } from 'next/server';
import { TempFileBufferInfra } from '@/infra/temp-file-buffer/temp-file-buffer.infra';

/**
 * API route to download temporary files
 * GET /api/temp-file/[filename]
 */
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json(
                { error: 'Filename is required' },
                { status: 400 }
            );
        }

        const tempFileBuffer = TempFileBufferInfra.getInstance();

        // Check if file exists
        const exists = await tempFileBuffer.fileExists(filename);
        if (!exists) {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            );
        }

        // Read file buffer
        const fileBuffer = await tempFileBuffer.readFileBuffer(filename);

        // Determine content type based on file extension
        const contentType = getContentType(filename);

        // Return file with appropriate headers
        const normalized = Buffer.from(fileBuffer).buffer;
        return new NextResponse(normalized, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
                'Content-Length': fileBuffer.length.toString(),
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Error downloading temp file:', error);
        return NextResponse.json(
            { error: 'Failed to download file' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/temp-file/[filename]
 * Optionally allow manual deletion of temp files
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json(
                { error: 'Filename is required' },
                { status: 400 }
            );
        }

        const tempFileBuffer = TempFileBufferInfra.getInstance();
        await tempFileBuffer.deleteFileBuffer(filename);

        return NextResponse.json(
            { success: true, message: 'File deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting temp file:', error);
        return NextResponse.json(
            { error: 'Failed to delete file' },
            { status: 500 }
        );
    }
}

/**
 * Determines the content type based on file extension
 */
function getContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();

    const contentTypes: Record<string, string> = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        txt: 'text/plain',
        json: 'application/json',
        xml: 'application/xml',
        zip: 'application/zip',
    };

    return contentTypes[ext || ''] || 'application/octet-stream';
}
