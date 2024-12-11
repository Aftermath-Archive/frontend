import Layout from '@/components/Layout/Layout';

import About from '@/components/LandingPageComponents/About';
import CTA from '@/components/LandingPageComponents/CTA';
import AccordionFAQ from '@/components/LandingPageComponents/Faq';
import HowItHelps from '@/components/LandingPageComponents/HowItHelps';
import Hero from '@/components/LandingPageComponents/Hero';
import Features from '@/components/LandingPageComponents/Features';

export default function LandingPage() {
    return (
        <Layout>
            <Hero />
            <About />
            <HowItHelps />
            <Features />
            <CTA />
            <AccordionFAQ />
        </Layout>
    );
}
