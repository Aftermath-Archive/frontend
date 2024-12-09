import About from '@/components/LandingPageComponents/About';
import CTA from '@/components/LandingPageComponents/CTA';
import AccordionFAQ from '@/components/LandingPageComponents/Faq';
import HowItHelps from '@/components/LandingPageComponents/HowItHelps';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/LandingPageComponents/HeaderMenu';
import Hero from '@/components/LandingPageComponents/Hero';
import Features from '@/components/LandingPageComponents/Features';

export default function LandingPage() {
    return (
        <body>
            <HeaderMenu />
            <Hero />
            <About />
            <HowItHelps />
            <Features />
            <CTA />
            <AccordionFAQ />
            <Footer />
        </body>
    );
}
