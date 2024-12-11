import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function AccordionFAQ() {
    return (
        <section id="faq">
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base/7 font-semibold text-teal-600">
                            FAQ
                        </h2>
                        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                            Have questions? We&apos;ve got answers.
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-600">
                            Whether you’re wondering about deployment,
                            customization, or security, our FAQ covers the most
                            common queries about Aftermath Archive. Designed to
                            empower your incident management, our software is
                            accessible, open-source, and built with flexibility
                            in mind. If you don’t find what you’re looking for
                            here, feel free to reach out to our community or
                            check the documentation.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes! Aftermath Archive follows accessibility
                                    best practices to ensure it’s usable by
                                    everyone, including those who rely on
                                    assistive technologies.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Can I self-host Aftermath Archive?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Absolutely. Aftermath Archive is designed
                                    for self-hosting, giving you full control
                                    over your data and deployment.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is Aftermath Archive free to use?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes, it’s fully open-source and free. You
                                    can download, use, and modify it as you
                                    need.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    How secure is Aftermath Archive?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Security is a priority. We follow best
                                    practices for encryption, authentication,
                                    and secure data handling.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>
                                    Can I customize the app to fit my needs?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes, Aftermath Archive is extensible and
                                    customizable. You can modify the codebase or
                                    integrate it with your existing tools and
                                    platforms.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>
                                    What kind of support is available?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Since it’s open-source, support is
                                    community-driven. You can contribute or ask
                                    for help on GitHub or community forums.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-7">
                                <AccordionTrigger>
                                    Is there a deployment guide?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes, detailed documentation is provided to
                                    help you deploy Aftermath Archive on your
                                    infrastructure.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
