'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export function LanguageDialog() {
    const [open, setOpen] = useState(true)
    const router = useRouter()
    const t = useTranslations('LanguageDialog')


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select a Language</DialogTitle>
                </DialogHeader>
                <DialogFooter className={'flex justify-center mx-auto'}>
                    <Button onClick={() => router.push('/en')}>English</Button>
                    <Button onClick={() => router.push('/es')}>Español</Button>
                    <Button onClick={() => router.push('/zh')}>中文</Button>
                    <Button onClick={() => router.push('/so')}>Soomaali</Button>
                    <Button onClick={() => router.push('/vi')}>Tiếng Việt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
