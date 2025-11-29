import NotFoundCover from '@/components/common/NotFoundCover'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function notfound() {
    return (
        <NotFoundCover>
            <Link href="/van-ban">
                <Button>
                    Quay về trang văn bản
                </Button>
            </Link>
        </NotFoundCover>
    )
}
