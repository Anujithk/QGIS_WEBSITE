import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';
import { DISTRICTS } from '../data/districts';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Column 1: Brand & Official Emblem */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <img
                src="/kerala-gov-logo.png"
                alt="Government of Kerala State Emblem"
                style={{ height: '52px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95 }}
              />
              <div>
                <div className="footer-brand-title">Kerala Panchayat Directory</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--shade-400)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Government of Kerala · LSGD
                </div>
              </div>
            </div>

            <p className="footer-brand-desc">
              Public information repository providing administrative, territorial, and civic service details for Grama Panchayats across the 14 revenue districts of Kerala.
            </p>

            <div className="footer-disclaimer-box">
              <strong>
                <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '5px' }} />
                Public Information Notice & Disclaimer
              </strong>
              This website is an informational directory and is not an official Government of Kerala website unless formally authorized. Please verify official details with the relevant government authority.
            </div>
          </div>

          {/* Column 2: Directory Navigation */}
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
                <Link to="/contact">Helpdesk & Contact</Link>
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
            <ul className="footer-links" style={{ fontSize: '0.825rem' }}>
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

          {/* Column 4: Public Administration Portals */}
          <div>
            <h4 className="footer-column-title">LSGD Digital Services</h4>
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
                <Link to="/contact">Citizen Support & RTI</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Government of Kerala LSGD Informational Directory. Designed in accordance with National Portal of India standards.
            <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--grey-400)' }}>
              Portal Engineering & Spatial Systems by <strong>Anujith K</strong> · Direct Dev Mail: <a href="mailto:developer.anujithk@gmail.com" style={{ textDecoration: 'underline', color: 'var(--white)' }}>developer.anujithk@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom-links">
            <Link to="/about#privacy">Privacy Policy</Link>
            <Link to="/about#terms">Terms of Access</Link>
            <Link to="/about#disclaimer">Full Disclaimer</Link>
            <Link to="/contact">Developer & Support Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
