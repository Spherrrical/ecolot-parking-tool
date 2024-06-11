'use client';
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {InformationCircleIcon} from "@heroicons/react/16/solid";
import {CheckCircleIcon} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {QuestionForm} from "@/components/Form";
import {useTranslations} from "next-intl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";


type Props = {
    params: {locale: string};
};


export default function Home({params: {locale}}: Props) {
    const languages = [
        { name: "English", locale: "en" },
        { name: "Spanish", locale: "es" },
        { name: "Chinese", locale: "zh" },
        { name: "Tagalog", locale: "fl" },
        { name: "Urdu", locale: "ur" },
        { name: "Arabic", locale: "ar" },
        { name: "Vietnamese", locale: "vi" },
        { name: "Somali", locale: "so" },
        { name: "Punjabi", locale: "pn" },
    ];

    const router = useRouter();
    const t = useTranslations('Index');


    const people = [
        {
            name: 'Sur Jaswal',
            role: `${t('teamRole1')}`,
            imageUrl:
                '/sur.png',
        },
        {
            name: 'Zystyn Lazarte',
            role: `${t('teamRole2')}`,
            imageUrl:
                '/zystyn.png',
        },
        {
            name: 'Michael Moynihan',
            role: `${t('teamRole3')}`,
            imageUrl:
                '/michael.png',
        },
        {
            name: 'Musa Malik',
            role: `${t('teamRole4')}`,
            imageUrl:
                '/musa.png',
        },
    ]

    return (
        <>
            <div className="relative isolate overflow-hidden bg-white">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.1 200V.5H200" fill="none" stroke={"#E5E7EB"} strokeWidth={1}/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"/>
                </svg>
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <img
                            className="h-11"
                            src="/logo.png"
                            alt="Your Company"
                        />
                        <div className="mt-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-base bg-neutral-200 p-2 pl-5 pr-5 rounded-full font-satoshi-bold tracking-tight text-gray-900">
                                    {languages.find((lang) => lang.locale === locale)?.name || "Select Language"}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {languages.map((language) => (
                                        <DropdownMenuItem
                                            className="font-satoshi-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                                            key={language.locale}
                                            onClick={() => {
                                                router.push(`/${language.locale}`);
                                                // unstable_setRequestLocale(language.locale);
                                            }}
                                        >
                                            {language.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {/*<div className="mt-24 sm:mt-32 lg:mt-16">*/}
                        {/*    <a href="#" className="inline-flex space-x-6">*/}
                        {/*      <span*/}
                        {/*          className="rounded-full bg-sky-600/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-600 ring-1 ring-inset ring-sky-600/10">*/}
                        {/*        What's new*/}
                        {/*      </span>*/}
                        {/*                    <span*/}
                        {/*                        className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">*/}
                        {/*        <span>Our latest project</span>*/}
                        {/*        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
                        {/*      </span>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <h1 className="mt-20 text-4xl font-satoshi-medium tracking-tighter text-gray-900 sm:text-6xl">
                            {t('welcome')} <span className="text-ecoblue font-satoshi-bold">Eco-Lot</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-600 font-satoshi-medium tracking-tight">
                            {t('about')}
                        </p>
                        <div className="mt-10 flex items-center gap-x-4">
                            {/* @ts-ignore */}
                            <Button
                                onClick={() => document.getElementById("improving-seattle").scrollIntoView({behavior: "smooth"})}>
                                {t('learnMore')}
                            </Button>
                            <Button asChild variant={"outline"} onClick={() => router.push("/flights")}>
                                <Link href="/flights">{t('flightfinder')}</Link>
                            </Button>
                        </div>
                    </div>
                    {/*<div*/}
                    {/*    className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">*/}
                    {/*    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">*/}
                    {/*        <div*/}
                    {/*            className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">*/}
                    {/*            <img*/}
                    {/*                src="https://tailwindui.com/img/component-images/project-app-screenshot.png"*/}
                    {/*                alt="App screenshot"*/}
                    {/*                width={2432}*/}
                    {/*                height={1442}*/}
                    {/*                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className=" max-w-2xl">
                        <h2 className="text-3xl font-satoshi-bold tracking-tight text-ecoblue sm:text-5xl">{t('teamHeading')}</h2>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-9 sm:mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8"
                    >
                        {people.map((person) => (
                            <li key={person.name}
                                className="rounded-2xl bg-neutral-200 border border-black/10 px-8 py-10">
                                <img
                                    className="mx-auto h-48 w-48 rounded-full object-cover object-top md:h-52 md:w-52 border border-black/15"
                                    src={person.imageUrl}
                                    alt=""/>
                                <h3 className="mt-6 text-xl font-satoshi-bold text-center justify-center flex leading-7 tracking-tight text-black">{person.name}</h3>
                                <p className="mt-1 text-sm font-satoshi-medium text-center leading-6 text-neutral-500">{person.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className="mx-auto max-w-xl mt-10 sm:mt-20 sm:max-w-7xl sm:p-9 p-6 text-base leading-7 text-gray-700">
                    <h1 id="improving-seattle"
                        className="mt-2 text-3xl font-satoshi-bold tracking-tight text-ecoblue sm:text-4xl">{t('title')}</h1>
                    <div className="mt-10 max-w-3xl font-satoshi-medium">
                        <p>
                            {t('body')}
                        </p>
                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true"/>
                                <span>
                             <strong className="font-semibold text-gray-900">{t('shortTermSolution')}</strong>
                                    {t('shortTermSolutionResponse')}
                           </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true"/>
                                <span>
                             <strong className="font-semibold text-gray-900">
                                {t('longTermSolution')}
                             </strong>
                                    {t('longTermSolutionResponse')}
                           </span>
                            </li>
                        </ul>
                        <Button variant="outline" className="mt-8" onClick={() => router.push("/report")}>
                            {t('readReport')}
                        </Button>
                        <h2 className="mt-16 text-2xl font-satoshi-bold tracking-tight text-gray-900">{t('communityImpactHeading')}</h2>
                        <p className="mt-6">
                            {t('communityImpactText1')}
                        </p>
                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true"/>
                                <span>
                                {t('communityImpactCheck1')}
                            </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true"/>
                                <span>
                                {t('communityImpactCheck2')}
                            </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true"/>
                                <span>
                                {t('communityImpactCheck3')}
                            </span>
                            </li>
                        </ul>
                        <p className="mt-8">
                            {t('communityImpactText2')}
                        </p>
                        <p className="mt-8">
                            {t('communityImpactText3')}
                        </p>
                        <h2 className="mt-16 text-2xl font-satoshi-bold tracking-tight text-gray-900">{t('faq')}</h2>
                        <Accordion type="single" collapsible className="w-full mt-4 text-left">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>{t('faq1')}</AccordionTrigger>
                                <AccordionContent>
                                    {t('faq1Response')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>{t('faq2')}</AccordionTrigger>
                                <AccordionContent>
                                    {t('faq2Response')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>{t('faq3')}</AccordionTrigger>
                                <AccordionContent>
                                    {t('faq3Response')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>{t('faq4')}</AccordionTrigger>
                                <AccordionContent>
                                    {t('faq4Response')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>{t('faq5')}</AccordionTrigger>
                                <AccordionContent>
                                    {t('faq5Response')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <h2 className="mt-16 text-2xl font-satoshi-bold tracking-tight text-gray-900">{t('feedback')}</h2>
                        <p className="mt-6">
                            {t('feedbackText')}
                        </p>
                        <div className="mt-8">
                            <QuestionForm/>
                        </div>
                    </div>
                    <p className="mt-10 text-sm font-satoshi-medium text-gray-400">
                        {t('developedBy')} Musa. {t('viewSource')}{" "}
                        <a
                            href="https://github.com/Spherrrical/ecolot-parking-tool"
                            className="text-neutral-400 underline hover:text-neutral-500"
                        >
                            GitHub
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
