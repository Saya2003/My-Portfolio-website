import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import PortfolioPreview from '../components/PortfolioPreview';
import FAQ from '../components/FAQ';
import QuoteForm from '../components/QuoteForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
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
