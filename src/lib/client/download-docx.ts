export class DownloadDocxUtils {
    static downloadFromBuffer(buffer: Buffer<ArrayBufferLike>, fileName: string = 'document.docx'): void {
        // Convert Buffer to Uint8Array which is compatible with Blob
        const uint8Array = new Uint8Array(buffer)
        const blob = new Blob([uint8Array], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
}