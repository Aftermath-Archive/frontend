import {
    RocketLaunchIcon,
    ChartBarIcon,
    LockClosedIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Rapid Incident Response',
        description:
            'Stay on top of disruptions with a quick and organized way to log, track, and resolve incidents. Minimize downtime and keep your team aligned.',
        icon: RocketLaunchIcon,
    },
    {
        name: 'Secure and Reliable Data',
        description:
            'Protect your incident data with robust security features and ensure your information remains accurate, up-to-date, and accessible.',
        icon: LockClosedIcon,
    },
    {
        name: 'Actionable Insights',
        description:
            'Generate meaningful post-mortems and analytics to identify patterns, learn from past incidents, and continually improve your processes.',
        icon: ChartBarIcon,
    },
    {
        name: 'Customizable Workflows',
        description:
            'Adapt the tool to your team’s workflow with flexible configurations and intuitive controls. Designed to work with you, not against you.',
        icon: WrenchScrewdriverIcon,
    },
];

export default function HowItHelps() {
    return (
        <section id="how-it-helps">
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base/7 font-semibold text-teal-600">
                            How it helps
                        </h2>
                        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                            Everything you need to manage incidents effectively
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-600">
                            <strong>Aftermath Archive</strong> equips you with
                            the essential tools to{' '}
                            <strong>
                                streamline incident management, conduct
                                insightful post-mortems, and enhance system
                                reliability.
                            </strong>{' '}
                            Whether you’re responding to an outage or analyzing
                            historical incidents, these features make the
                            process seamless and effective:
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="relative pl-16"
                                >
                                    <dt className="text-base/7 font-semibold text-gray-900">
                                        <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-teal-600">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="size-6 text-white"
                                            />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
