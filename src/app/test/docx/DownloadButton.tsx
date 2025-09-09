'use client'

import React from 'react'

interface DownloadButtonProps {
    base64String: string
    fileName: string
}

export default function DownloadButton({ base64String, fileName }: DownloadButtonProps) {
    const handleDownload = () => {
        try {
            // Convert base64 to binary data
            const binaryString = atob(base64String)
            const bytes = new Uint8Array(binaryString.length)

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }

            // Create blob from binary data
            const blob = new Blob([bytes], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            })

            // Create download URL
            const url = URL.createObjectURL(blob)

            // Create temporary anchor element and trigger download
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            // Cleanup
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading file:', error)
            alert('Error downloading file. Please try again.')
        }
    }

    return (
        <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
            Download DOCX File
        </button>
    )
}
