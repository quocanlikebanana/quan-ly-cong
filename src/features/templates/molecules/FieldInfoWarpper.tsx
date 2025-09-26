import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleQuestionMark } from 'lucide-react';
import React from 'react'

export default function TemplateFieldWarpper({
    label,
    description,
    children,
    order,
}: {
    label: string;
    description?: string;
    children: React.ReactNode;
    order?: number;
}) {
    return (
        <div
            style={{
                order: order,
            }}
        >
            <div className='flex items-start justify-between mb-2'>
                <div className="mb-1 font-medium">{label}</div>
                {description && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant='outline'
                                className='rounded-full p-0'
                                size='icon'
                            >
                                <CircleQuestionMark className='h-4 w-4' />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Mô tả trường: {label}
                                </DialogTitle>
                            </DialogHeader>

                            <div>{description}</div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            {children}
        </div >
    )
}
