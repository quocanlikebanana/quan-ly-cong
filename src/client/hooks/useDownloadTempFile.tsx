import { useState, useCallback } from 'react';

interface DownloadState {
    isDownloading: boolean;
    error: string | null;
    progress: number;
}

interface UseDownloadTempFileReturn {
    downloadFile: (filename: string, displayName?: string) => Promise<void>;
    deleteFile: (filename: string) => Promise<void>;
    isDownloading: boolean;
    error: string | null;
    progress: number;
}

/**
 * Hook for downloading and managing temporary files from the server
 * @returns Object with downloadFile function and download state
 */
export function useDownloadTempFile(): UseDownloadTempFileReturn {
    const [state, setState] = useState<DownloadState>({
        isDownloading: false,
        error: null,
        progress: 0,
    });

    /**
     * Downloads a temporary file from the server
     * @param filename - Name of the file to download
     * @param displayName - Optional custom name for the downloaded file
     */
    const downloadFile = useCallback(async (filename: string, displayName?: string) => {
        setState({ isDownloading: true, error: null, progress: 0 });

        try {
            const response = await fetch(`/api/temp-file/${encodeURIComponent(filename)}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Failed to download file: ${response.statusText}`);
            }

            // Get the blob from response
            const blob = await response.blob();
            setState(prev => ({ ...prev, progress: 50 }));

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = displayName || filename;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setState({ isDownloading: false, error: null, progress: 100 });

            // Reset progress after a short delay
            setTimeout(() => {
                setState(prev => ({ ...prev, progress: 0 }));
            }, 1000);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setState({ isDownloading: false, error: errorMessage, progress: 0 });
            throw error;
        }
    }, []);

    /**
     * Deletes a temporary file from the server
     * @param filename - Name of the file to delete
     */
    const deleteFile = useCallback(async (filename: string) => {
        try {
            const response = await fetch(`/api/temp-file/${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to delete file');
            }

            return await response.json();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setState(prev => ({ ...prev, error: errorMessage }));
            throw error;
        }
    }, []);

    return {
        downloadFile,
        deleteFile,
        isDownloading: state.isDownloading,
        error: state.error,
        progress: state.progress,
    };
}

export default useDownloadTempFile;
