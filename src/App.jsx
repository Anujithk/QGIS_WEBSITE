import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';


// Automatically scroll window to top upon route navigation
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
