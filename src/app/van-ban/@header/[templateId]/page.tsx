import { routes } from "@/client/routes";
import { Button } from "@/components/ui/button";
import queryTemplateById from "@/features/templates/query/query-template-by-id";
import Link from "next/link";

export default async function page({ params }: { params: Promise<{ templateId: string }> }) {
    const { templateId } = await params;
    const template = await queryTemplateById(templateId);

    if (!template) {
        return null;
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h1 className="text-3xl font-bold text-vista-blue-950">{template.name}</h1>
            <Button>
                <Link href={routes.van_ban.id(templateId).DIEN_MAU}>
                    Tạo văn bản từ mẫu này
                </Link>
            </Button>
        </div>
    );
}
