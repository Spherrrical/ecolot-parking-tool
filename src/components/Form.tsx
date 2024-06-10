"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import {useState} from "react";
import {useTranslations} from "next-intl";

const questionFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please provide a valid email address.",
    }),
    question: z.string().min(10, {
        message: "Question must be at least 10 characters.",
    }),
})

export function QuestionForm() {
    const t = useTranslations('Index');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const form = useForm<z.infer<typeof questionFormSchema>>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            name: "",
            email: "",
            question: "",
        },
    })

    function onSubmit(values: z.infer<typeof questionFormSchema>) {
        console.log(values)
        setIsSubmitted(true)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder={`${t('name')}`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={`${t('email')}`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={`${t('message')}`}
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {t('submit')}
                </Button>
                {isSubmitted && (
                    <div className="flex items-center text-sm text-green-500">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        <span>{t('submitted')}</span>
                    </div>
                )}
            </form>
        </Form>
    )
}
