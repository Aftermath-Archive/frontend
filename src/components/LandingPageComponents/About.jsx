export default function About() {
    return (
        <section id="about">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <div className="bg-muted/50 border rounded-lg py-12 flex">
                        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
                            <img
                                src="https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64cd4d0257f3906c2314e093_roboto.png"
                                alt=""
                                className="w-[300px] object-contain rounded-lg"
                            />
                            <div className="bg-green-0 flex flex-col justify-between">
                                <div className="pb-6">
                                    <h2 className="text-3xl md:text-4xl font-bold">
                                        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                                            About{' '}
                                        </span>
                                        Aftermath Archive
                                    </h2>
                                    <p className="text-xl text-muted-foreground mt-4">
                                        <strong>Aftermath Archive</strong> is
                                        your go-to platform for incident
                                        management and post-mortems. Designed to
                                        help teams{' '}
                                        <strong>
                                            respond, analyze, and learn{' '}
                                        </strong>{' '}
                                        from incidents, it provides a
                                        streamlined approach to managing
                                        disruptions and improving system
                                        reliability.
                                    </p>
                                    <p className="text-xl text-muted-foreground mt-4">
                                        Stay organized with powerful tools for
                                        tracking incidents, documenting
                                        resolutions, and generating actionable
                                        insights. Whether you’re handling a
                                        critical outage or refining your
                                        operations, Aftermath Archive empowers
                                        you to turn incidents into opportunities
                                        for growth and resilience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
