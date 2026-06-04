import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Clients } from './pages/Clients';
import { Notifications } from './pages/Notifications';
import { ClientDashboard } from './pages/client/ClientDashboard';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';

type Page = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'gallery' 
  | 'clients' 
  | 'login' 
  | 'register'
  | 'notifications'
  | 'client-dashboard'
  | 'worker-dashboard'
  | 'admin-dashboard';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    if (currentUser?.rol === 'administrador') {
      setCurrentPage('admin-dashboard');
    } else if (currentUser?.rol === 'trabajador') {
      setCurrentPage('worker-dashboard');
    } else {
      setCurrentPage('client-dashboard');
    }
  };

  const renderPage = () => {
    // Public pages
    if (currentPage === 'home') return <Home onNavigate={handleNavigate} />;
    if (currentPage === 'about') return <About />;
    if (currentPage === 'services') return <Services onNavigate={handleNavigate} />;
    if (currentPage === 'gallery') return <Gallery />;
    if (currentPage === 'clients') return <Clients />;

    // Auth pages
    if (currentPage === 'login') {
      return (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onRegisterClick={() => setCurrentPage('register')}
        />
      );
    }
    if (currentPage === 'register') {
      return (
        <RegisterForm
          onSuccess={() => setCurrentPage('login')}
          onLoginClick={() => setCurrentPage('login')}
        />
      );
    }

    // Protected pages
    if (!currentUser) {
      setCurrentPage('login');
      return null;
    }

    if (currentPage === 'notifications') {
      return <Notifications onNavigate={handleNavigate} />;
    }

    // Role-specific dashboards
    if (currentPage === 'client-dashboard') {
      if (currentUser.rol !== 'cliente') {
        setCurrentPage('home');
        return null;
      }
      return <ClientDashboard />;
    }

    if (currentPage === 'worker-dashboard') {
      if (currentUser.rol !== 'trabajador') {
        setCurrentPage('home');
        return null;
      }
      return <WorkerDashboard />;
    }

    if (currentPage === 'admin-dashboard') {
      if (currentUser.rol !== 'administrador') {
        setCurrentPage('home');
        return null;
      }
      return <AdminDashboard />;
    }

    return <Home onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
