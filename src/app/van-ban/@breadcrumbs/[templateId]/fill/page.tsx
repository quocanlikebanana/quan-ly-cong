import { routes } from "@/client/routes";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import queryTemplateById from "@/features/templates/query/query-template-by-id";
import Link from "next/link";

export default async function page({ params }: {
    params: Promise<{
        templateId: string;
    }>
}) {
    const { templateId } = await params;
    const template = await queryTemplateById(templateId);
    if (!template) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={routes.van_ban.INDEX}>Văn bản</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={routes.van_ban.id(templateId).INDEX}>{template.name}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Điền văn bản
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
