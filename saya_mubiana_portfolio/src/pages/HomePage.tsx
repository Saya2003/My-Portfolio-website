import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import PortfolioPreview from '../components/PortfolioPreview';
import FAQ from '../components/FAQ';
import QuoteForm from '../components/QuoteForm';
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
        <Services />
        <PortfolioPreview />
        <Process />
        <Pricing />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
