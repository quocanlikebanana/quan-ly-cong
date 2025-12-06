"use client";

import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
).toString();

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

interface Props {
    binaryString: string;
    pageNumber?: number;
    scale?: number;
    className?: string;
}

export default function PdfPageViewer({
    binaryString,
    pageNumber = 1,
    scale = 1.5,
    className
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let renderTask: pdfjsLib.RenderTask | null = null;

        const renderPage = async () => {
            if (!canvasRef.current || !binaryString) return;

            try {
                // Load the PDF document from binary string
                const pdf = await getDocument(binaryString).promise;

                // Get the requested page (default to page 1)
                const page = await pdf.getPage(Math.min(pageNumber, pdf.numPages));

                // Calculate scale based on container width if available
                const containerWidth = containerRef.current?.clientWidth;
                let finalScale = scale;

                if (containerWidth) {
                    const viewport = page.getViewport({ scale: 1 });
                    finalScale = containerWidth / viewport.width;
                }

                // Get viewport with calculated scale
                const scaledViewport = page.getViewport({ scale: finalScale });

                // Set canvas dimensions
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                if (!context) return;

                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;

                // Render the page
                renderTask = page.render({
                    canvasContext: context,
                    canvas: canvas,
                    viewport: scaledViewport,
                });

                await renderTask.promise;
            } catch (error) {
                console.error("Error rendering PDF page:", error);
            }
        };

        renderPage();

        // Cleanup function to cancel rendering if component unmounts
        return () => {
            if (renderTask) {
                renderTask.cancel();
            }
        };
    }, [binaryString, pageNumber, scale]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    maxWidth: "100%",
                    height: "auto",
                    background: "#fff",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                }}
            />
        </div>
    );
}
