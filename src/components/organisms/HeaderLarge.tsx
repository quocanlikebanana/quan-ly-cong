import { CONSTANTS } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

export default function HeaderLarge() {
    return (
        <header className="bg-egyptian-blue-600 text-lavender-web-900 py-4 relative">
            <div className="container mx-auto flex flex-col gap-4">
                <div className='flex flex-row items-center gap-6'>
                    <div>
                        <Image src={CONSTANTS.public.logo.emblemOfVietnam} alt="Emblem of Vietnam" width={70} height={70} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="text-2xl font-bold mb-1">Quản lý Văn bản Pháp lý</h1>
                        <p>
                            Hệ thống quản lý mẫu văn bản và tài liệu pháp lý
                        </p>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -right-10 -bottom-10 rotate-12">
                    <Image
                        src={CONSTANTS.public.background.trongDongDongSon}
                        alt="Trong Dong Dong Son"
                        width={300}
                        height={300}
                        className="opacity-60"
                    />
                </div>
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-12">
                    <Image
                        src={CONSTANTS.public.background.trongDongDongSon}
                        alt="Trong Dong Dong Son"
                        width={120}
                        height={120}
                        className="opacity-60"
                    />
                </div>
            </div>
        </header>
    )
}
