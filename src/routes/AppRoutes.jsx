import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Code-split routes with dynamic imports for sub-second 3G/4G loading speed
const Home = lazy(() => import('../pages/Home'));
const PanchayatDirectory = lazy(() => import('../pages/PanchayatDirectory'));
const PanchayatDetails = lazy(() => import('../pages/PanchayatDetails'));
const AboutKerala = lazy(() => import('../pages/AboutKerala'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Sub-second, zero-layout-shift fallback placeholder
function PageLoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        gap: '0.85rem',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--grey-300)',
          borderTopColor: 'var(--grey-950)',
          borderRadius: '50%',
          animation: 'spin-fast 0.6s linear infinite',
        }}
      />
      <span style={{ fontSize: '0.825rem', color: 'var(--grey-600)', fontWeight: 600 }}>
        Loading Kerala LSGD Directory...
      </span>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panchayats" element={<PanchayatDirectory />} />
        <Route path="/panchayats/:id" element={<PanchayatDetails />} />
        <Route path="/about" element={<AboutKerala />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
