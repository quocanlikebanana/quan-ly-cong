"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// Still cannot fix the issue: DOMMatrix is not defined
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
).toString();


interface Props {
    binaryString: string;
}

async function getDocumentSafe(file: string | Uint8Array) {
    try {
        return await pdfjsLib.getDocument(file).promise;
    }
    catch (error) {
        console.error("Error loading PDF document:", error);
        throw error;
    }
}

export default function PdfAllPagesViewer({ binaryString: binaryString }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const renderTaskRefs = useRef<{ [pageNumber: number]: pdfjsLib.RenderTask | null }>({});
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                // Convert to Uint8Array
                const pdf = await getDocumentSafe(binaryString);
                setPages(Array.from({ length: pdf.numPages }, (_, i) => i + 1));
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };
        loadPdf();
    }, [binaryString]);

    const renderPage = useCallback(async (pageNumber: number, canvasElem: HTMLCanvasElement) => {
        const pdf = await getDocumentSafe(binaryString);
        const page = await pdf.getPage(pageNumber);

        const containerWidth = containerRef.current?.clientWidth || 800;

        // Base viewport
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const context = canvasElem.getContext("2d")!;

        canvasElem.width = scaledViewport.width;
        canvasElem.height = scaledViewport.height;

        if (renderTaskRefs.current[pageNumber]) {
            await renderTaskRefs.current[pageNumber].promise;
        }
        const renderTask = page.render({
            canvasContext: context,
            canvas: canvasElem,
            viewport: scaledViewport,
        });
        renderTaskRefs.current[pageNumber] = renderTask;
        await renderTask.promise;
        return renderTask;
    }, [binaryString]);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "8px",
            }}
        >
            {pages.map((num) => (
                <PageCanvas
                    key={num}
                    pageNumber={num}
                    file={binaryString}
                    renderPage={renderPage}
                />
            ))}
        </div>
    );
}

function PageCanvas({
    pageNumber,
    file,
    renderPage,
}: {
    pageNumber: number;
    file: string | Uint8Array;
    renderPage: (pageNumber: number, canvas: HTMLCanvasElement) => Promise<pdfjsLib.RenderTask>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let renderTask: pdfjsLib.RenderTask | null = null;

        const render = async () => {
            if (canvasRef.current) {
                renderTask = await renderPage(pageNumber, canvasRef.current);
            }
        };

        render();

        return () => {
            if (renderTask) {
                renderTask.cancel();
            }
        };
    }, [pageNumber, file, renderPage]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                background: "#fff",
                boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                borderRadius: "4px",
            }}
        />
    );
}
