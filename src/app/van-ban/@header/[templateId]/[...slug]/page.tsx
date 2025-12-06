import { routes } from "@/client/routes";
import { Button } from "@/components/ui/button";
import queryTemplateById from "@/features/templates/query/query-template-by-id";
import Link from "next/link";
import FillSlug from "./DienMauSlug";

export default async function page({
    params
}: {
    params: Promise<{
        slug: string;
        templateId: string;
    }>
}) {
    const { templateId, slug } = await params;
    const template = await queryTemplateById(templateId);

    if (!template) {
        return null;
    };

    const SlugMap = {
        "dien-mau": <FillSlug template={template} />,
    };
    const slugItem = slug.at(2);
    const leftTitle = SlugMap[slugItem as keyof typeof SlugMap] || null;

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
            {leftTitle}

            <Button variant="outline">
                <Link href={routes.van_ban.id(templateId).INDEX}>
                    Quay lại
                </Link>
            </Button>
        </div>
    );
}
