"use client";

import { useState } from "react";
import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, TemplateCategoryType } from "../constants";
import { CreateTemplateType } from "@/features/templates/actions/create-template/create-template.schema";

interface CategorySelectProps {
    control: Control<CreateTemplateType>;
}

export function CategorySelect({ control }: CategorySelectProps) {
    const [categoryOpen, setCategoryOpen] = useState(false);

    return (
        <FormField
            control={control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={categoryOpen}
                                    className="w-full justify-between"
                                >
                                    {field.value || "Chọn danh mục..."}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Tìm kiếm hoặc nhập danh mục mới..."
                                        onValueChange={(value) => {
                                            const typedValue = value as TemplateCategoryType;
                                            // Allow custom input
                                            if (typedValue && !CATEGORIES.includes(typedValue)) {
                                                field.onChange(typedValue);
                                            }
                                        }}
                                    />
                                    <CommandList>
                                        <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
                                        <CommandGroup>
                                            {CATEGORIES.map((category) => (
                                                <CommandItem
                                                    key={category}
                                                    value={category}
                                                    onSelect={() => {
                                                        field.onChange(category);
                                                        setCategoryOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === category ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {category}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}