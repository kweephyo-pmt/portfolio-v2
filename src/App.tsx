import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { PortfolioPage } from './pages/PortfolioPage';
import { AdminPage } from './pages/AdminPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { usePortfolioStore } from './store/portfolioStore';
import { useEffect } from 'react';
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
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
