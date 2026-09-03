import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import PortfolioPreview from '../components/PortfolioPreview';
import ProcessPreview from '../components/ProcessPreview';
import PricingPreview from '../components/PricingPreview';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Saya Mubiana | Freelance Software Developer & Web Developer"
        description="Saya Mubiana is a freelance software developer and web developer building modern, responsive portfolio websites, professional business websites and custom web solutions for individuals, businesses and organisations."
        canonical="https://sayamubianaa.netlify.app/"
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesPreview />
        <PortfolioPreview />
        <ProcessPreview />
        <PricingPreview />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
