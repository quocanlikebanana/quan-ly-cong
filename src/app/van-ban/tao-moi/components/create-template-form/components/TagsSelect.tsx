"use client";

import { useState } from "react";
import { Control, useWatch } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TAGS } from "../constants";
import { CreateTemplateType } from "@/features/templates/actions/create-template/create-template.schema";

interface TagsSelectProps {
    control: Control<CreateTemplateType>;
}

export function TagsSelect({ control }: TagsSelectProps) {
    const [tagsOpen, setTagsOpen] = useState(false);
    const selectedTags = useWatch({ control, name: "tags" }) || [];

    return (
        <FormField
            control={control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Thẻ từ khóa</FormLabel>
                    <FormControl>
                        <div>
                            <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={tagsOpen}
                                        className="w-full justify-between"
                                    >
                                        {selectedTags.length > 0 ? `${selectedTags.length} thẻ đã chọn` : "Chọn thẻ từ khóa..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Tìm kiếm thẻ..." />
                                        <CommandList>
                                            <CommandEmpty>Không tìm thấy thẻ.</CommandEmpty>
                                            <CommandGroup>
                                                {TAGS.map((tag) => (
                                                    <CommandItem
                                                        key={tag}
                                                        value={tag}
                                                        onSelect={() => {
                                                            const currentTags = field.value || [];
                                                            const isSelected = currentTags.includes(tag);

                                                            if (isSelected) {
                                                                field.onChange(currentTags.filter((t: string) => t !== tag));
                                                            } else {
                                                                field.onChange([...currentTags, tag]);
                                                            }
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {tag}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {/* Display selected tags */}
                            {selectedTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedTags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="gap-1">
                                            {tag}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() => {
                                                    field.onChange(selectedTags.filter((t: string) => t !== tag));
                                                }}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}