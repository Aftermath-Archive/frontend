import About from '@/components/About';
import CTA from '@/components/CTA';
import AccordionFAQ from '@/components/Faq';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function LandingPage() {
    return (
        <body>
            <HeaderMenu />
            <Hero />
            <About />
            <HowItWorks />
            <Features />
            <CTA />
            <AccordionFAQ />
            <Footer />
        </body>
    );
}
