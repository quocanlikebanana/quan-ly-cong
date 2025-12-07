import { routes } from "@/client/routes";
import { TemplateView } from "@/features/templates/types/template.view";
import Link from "next/link";
import TemplateCard from "./TemplateCard";
import NoItemsFoundCover from "@/components/organisms/NoItemsFoundCover";

export default function TemplateGrid({
    templates,
    hasFiltered,
}: {
    templates: TemplateView[];
    hasFiltered?: boolean;
}) {
    return (
        <div className={"flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative"}>
            {templates.length === 0 ? (
                <div className="flex w-full h-full items-center justify-center col-span-full">
                    <NoItemsFoundCover hasFiltered={hasFiltered} />
                </div>
            ) : templates.map((template) => (
                <Link
                    key={template.id}
                    href={routes.van_ban.id(template.id).INDEX}
                >
                    <TemplateCard
                        template={template}
                    />
                </Link>
            ))}
        </div>);
}