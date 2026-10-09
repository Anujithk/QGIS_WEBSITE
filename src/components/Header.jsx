import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Official Government Utility Top Bar */}
      <div className="gov-flag-bar">
        <div className="gov-flag-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontWeight: 700 }}>കേരള സർക്കാർ</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>GOVERNMENT OF KERALA · LOCAL SELF GOVERNMENT DEPARTMENT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.725rem' }}>
            <span>LSGD CITIZEN PORTAL</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <a href="https://lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              Official State LSGD Website
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-container">
          {/* Logo & Official Emblem */}
          <Link to="/" className="brand-link" aria-label="Kerala Panchayat Directory Home">
            <img
              src="/kerala-gov-logo.png"
              alt="Government of Kerala Official State Emblem"
              className="brand-logo-img"
            />
            <div className="brand-text">
              <span className="brand-malayalam">കേരള ഗ്രാമപഞ്ചായത്ത് ഡയറക്ടറി</span>
              <span className="brand-title">Kerala Panchayat Directory</span>
              <span className="brand-subtitle">Information & Administrative Portal · LSGD Kerala</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/panchayats"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Panchayats
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              About Kerala
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
            <Link to="/panchayats" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}>
              <span>Search Directory</span>
              <ArrowRight size={13} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/panchayats"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Grama Panchayats Directory
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About Kerala LSGD
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Helpdesk & Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
