import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';
import { DISTRICTS } from '../data/districts';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Column 1: Brand & About Website */}
          <div className="footer-brand">
            <div className="footer-brand-title">Kerala Panchayat Directory</div>
            <p className="footer-brand-desc">
              A comprehensive citizen information platform cataloguing Grama Panchayats across the 14 districts of Kerala. Dedicated to fostering grassroots transparency, civic awareness, and local governance accessibility.
            </p>
            <div className="footer-disclaimer-box">
              <strong>
                <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
                Public Notice & Disclaimer
              </strong>
              This website is an informational directory and is not an official Government of Kerala website unless formally authorized. Please verify official details with the relevant government authority.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-column-title">Directory Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home Portal</Link>
              </li>
              <li>
                <Link to="/panchayats">All Grama Panchayats</Link>
              </li>
              <li>
                <Link to="/about">About Kerala Government</Link>
              </li>
              <li>
                <Link to="/contact">Contact & Helpdesk</Link>
              </li>
              <li>
                <a
                  href="https://lsgkerala.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                >
                  LSGD Kerala Portal <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: District Directory */}
          <div>
            <h4 className="footer-column-title">District Directory</h4>
            <ul className="footer-links" style={{ fontSize: '0.8rem' }}>
              {DISTRICTS.slice(0, 7).map((d) => (
                <li key={d.id}>
                  <Link to={`/panchayats?district=${encodeURIComponent(d.name)}`}>
                    {d.name} ({d.panchayatCount})
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/panchayats" style={{ fontWeight: 600 }}>
                  + View all 14 Districts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Public Administration */}
          <div>
            <h4 className="footer-column-title">LSGD Services</h4>
            <ul className="footer-links">
              <li>
                <a href="https://k-smart.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                  K-Smart Citizen Services
                </a>
              </li>
              <li>
                <a href="https://tax.lsgkerala.gov.in/sanchaya" target="_blank" rel="noopener noreferrer">
                  Sanchaya Property Tax
                </a>
              </li>
              <li>
                <a href="https://cr.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                  Sevana Civil Registration
                </a>
              </li>
              <li>
                <a href="https://kswift.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  K-SWIFT Single Window
                </a>
              </li>
              <li>
                <Link to="/contact">Citizen Support</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Kerala Grama Panchayat Directory. Designed in accordance with Indian State LSGD standards.
          </div>
          <div className="footer-bottom-links">
            <Link to="/about#privacy">Privacy Policy</Link>
            <Link to="/about#terms">Terms of Access</Link>
            <Link to="/about#disclaimer">Full Disclaimer</Link>
            <Link to="/contact">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
