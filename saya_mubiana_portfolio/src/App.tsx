import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@project/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import MaintenancePage from './pages/MaintenancePage';

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
        <Route path="/pricing" element={<Navigate to="/contact" replace />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
