import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@project/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
