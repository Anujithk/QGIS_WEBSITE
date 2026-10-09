import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, Compass, Info, Mail } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Official Government Utility Bar */}
      <div className="gov-flag-bar">
        <div className="gov-flag-inner">
          <span>Government of Kerala · Local Self Government Department (LSGD)</span>
          <span>Official Public Information Directory</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-container">
          {/* Logo / Emblem */}
          <Link to="/" className="brand-link" aria-label="Kerala Panchayat Directory Home">
            <div className="brand-emblem">
              <span>LSGD</span>
              <span className="brand-emblem-kerala">KERALA</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">Kerala Panchayat Directory</span>
              <span className="brand-subtitle">Grama Panchayat Information Portal</span>
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
              Explore Directory
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
                Panchayats Directory
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About Kerala Government
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact & LSGD Helpline
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
