import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PanchayatDirectory from '../pages/PanchayatDirectory';
import PanchayatDetails from '../pages/PanchayatDetails';
import AboutKerala from '../pages/AboutKerala';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/panchayats" element={<PanchayatDirectory />} />
      <Route path="/panchayats/:id" element={<PanchayatDetails />} />
      <Route path="/about" element={<AboutKerala />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
