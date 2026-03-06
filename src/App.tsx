import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { PortfolioPage } from './pages/PortfolioPage';
import { AdminPage } from './pages/AdminPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { usePortfolioStore } from './store/portfolioStore';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

function App() {
  useEffect(() => {
    usePortfolioStore.getState().initFirebase();
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Analytics />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
