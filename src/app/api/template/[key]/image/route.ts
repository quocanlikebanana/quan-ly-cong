import { TemplateFileService } from "@/services/template-file/template-file.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { key: string } }) {
    const key = params.key;
    const imageBuffer = TemplateFileService.getInstance().readPreview(key);
    const response = new NextResponse(imageBuffer);
    response.headers.set("Content-Type", "image/png");
    return response;
}