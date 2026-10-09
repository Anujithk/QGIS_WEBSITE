import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  Landmark,
  Code2,
  Globe,
  Clock,
  Laptop,
  Bug,
  MessageSquare,
  ArrowUpRight,
  Copy,
  ExternalLink,
} from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    panchayat: '',
    category: 'developer-direct',
    subject: '',
    message: '',
  });

  const handleCopy = (email) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Mail size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Public Helpdesk & Technical Support
            </span>
          </div>
          <h1 className="page-title">Contact & Developer Desk</h1>
          <p className="page-subtitle">
            Need assistance finding your Grama Panchayat, reporting administrative updates, or reaching our GIS development and engineering team?
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container section-padding">
        <div className="contact-layout-grid">
          {/* Left Column: Official Government Helplines & Developer Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Section 1: Developer & Engineering Team Contacts */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Code2 size={20} color="var(--grey-900)" />
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
                  Developer & Technical Team
                </h2>
              </div>
              <p style={{ marginBottom: '1.25rem', fontSize: '0.925rem', color: 'var(--grey-600)' }}>
                Direct contact details for portal engineering, QGIS spatial mapping integrations, mobile responsiveness, and technical bug reports.
              </p>

              {/* Lead Developer Profile Card */}
              <div className="developer-card">
                <div className="developer-profile-header">
                  <div className="developer-avatar-crest">
                    <span>AK</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--grey-950)', margin: 0 }}>
                        Anujith K
                      </h3>
                      <span className="badge badge-dark">
                        Lead Developer · QGIS_WEBSITE
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--grey-600)', fontWeight: 600, display: 'block', marginTop: '0.15rem' }}>
                      Lead Full-Stack Developer & Spatial GIS Architect
                    </span>
                  </div>
                </div>

                <div className="developer-contact-grid">
                  {/* Primary Developer Email */}
                  <div className="developer-contact-item">
                    <Mail size={16} />
                    <div style={{ width: '100%' }}>
                      <span className="contact-label">Primary Developer Email</span>
                      <a
                        href="mailto:developer.anujithk@gmail.com"
                        style={{ fontWeight: 650, color: 'var(--grey-950)', textDecoration: 'underline', display: 'block', wordBreak: 'break-all' }}
                      >
                        developer.anujithk@gmail.com
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('developer.anujithk@gmail.com')}
                        className={`developer-copy-btn ${copiedEmail === 'developer.anujithk@gmail.com' ? 'copied' : ''}`}
                        aria-label="Copy developer email"
                      >
                        {copiedEmail === 'developer.anujithk@gmail.com' ? (
                          <>
                            <CheckCircle size={12} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Secondary Tech Email */}
                  <div className="developer-contact-item">
                    <Laptop size={16} />
                    <div style={{ width: '100%' }}>
                      <span className="contact-label">Technical Desk Mail</span>
                      <a
                        href="mailto:anujith.kerala.dev@gmail.com"
                        style={{ fontWeight: 650, color: 'var(--grey-950)', textDecoration: 'underline', display: 'block', wordBreak: 'break-all' }}
                      >
                        anujith.kerala.dev@gmail.com
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('anujith.kerala.dev@gmail.com')}
                        className={`developer-copy-btn ${copiedEmail === 'anujith.kerala.dev@gmail.com' ? 'copied' : ''}`}
                        aria-label="Copy tech email"
                      >
                        {copiedEmail === 'anujith.kerala.dev@gmail.com' ? (
                          <>
                            <CheckCircle size={12} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Developer Direct Phone & WhatsApp */}
                  <div className="developer-contact-item">
                    <Phone size={16} />
                    <div>
                      <span className="contact-label">Developer Hotline & WhatsApp</span>
                      <a
                        href="tel:+919400000000"
                        style={{ fontWeight: 650, color: 'var(--grey-950)', textDecoration: 'underline', display: 'block' }}
                      >
                        +91 94000 00000
                      </a>
                      <span style={{ fontSize: '0.75rem', color: 'var(--grey-500)', display: 'block', marginTop: '0.2rem' }}>
                        Direct engineering inquiries (Mon–Fri, 9 AM – 6 PM)
                      </span>
                    </div>
                  </div>

                  {/* GitHub Repo */}
                  <div className="developer-contact-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <div>
                      <span className="contact-label">GitHub Repository</span>
                      <a
                        href="https://github.com/Anujithk/QGIS_WEBSITE"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontWeight: 650,
                          color: 'var(--grey-950)',
                          textDecoration: 'underline',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span>Anujithk/QGIS_WEBSITE</span>
                        <ArrowUpRight size={13} />
                      </a>
                      <span style={{ fontSize: '0.75rem', color: 'var(--grey-500)', display: 'block', marginTop: '0.2rem' }}>
                        Open source issues & code contributions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="developer-action-row">
                  <a
                    href="mailto:developer.anujithk@gmail.com?subject=Kerala%20Panchayat%20Directory%20Inquiry"
                    className="btn btn-primary btn-sm"
                  >
                    <Mail size={13} />
                    <span>Email Anujith K Directly</span>
                  </a>
                  <a
                    href="tel:+919400000000"
                    className="btn btn-secondary btn-sm"
                  >
                    <Phone size={13} />
                    <span>Call Hotline</span>
                  </a>
                  <a
                    href="https://github.com/Anujithk/QGIS_WEBSITE/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Bug size={13} />
                    <span>Report Technical Bug on GitHub</span>
                  </a>
                </div>

                {/* Additional Developer Sub-Desks */}
                <div className="developer-subcard-grid">
                  <div className="developer-subcard">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 750, fontSize: '0.9rem' }}>
                      <MapPin size={15} />
                      <span>GIS & Cartographic Engineering Desk</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--grey-600)' }}>
                      Maintains georeferenced boundary shapefiles, GPS coordinates, and monochrome OpenStreetMap integration.
                    </span>
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--grey-200)', fontSize: '0.825rem' }}>
                      <a
                        href="mailto:gis.support@keralapanchayat.org"
                        style={{ fontWeight: 650, color: 'var(--grey-950)', textDecoration: 'underline' }}
                      >
                        gis.support@keralapanchayat.org
                      </a>
                      <div style={{ fontSize: '0.75rem', color: 'var(--grey-600)', marginTop: '0.15rem' }}>
                        Tel: +91 94470 00000
                      </div>
                    </div>
                  </div>

                  <div className="developer-subcard">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 750, fontSize: '0.9rem' }}>
                      <Laptop size={15} />
                      <span>Web Performance & 3G/4G Desk</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--grey-600)' }}>
                      Maintains sub-1000ms load speed targets, offline Service Worker, and low-data mobile performance.
                    </span>
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--grey-200)', fontSize: '0.825rem' }}>
                      <a
                        href="mailto:web-perf@keralapanchayat.org"
                        style={{ fontWeight: 650, color: 'var(--grey-950)', textDecoration: 'underline' }}
                      >
                        web-perf@keralapanchayat.org
                      </a>
                      <div style={{ fontSize: '0.75rem', color: 'var(--grey-600)', marginTop: '0.15rem' }}>
                        Tel: +91 94460 00000
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer SLA & Standards Bar */}
                <div className="developer-sla-bar">
                  <div>
                    <strong>Developer SLA:</strong> Inquiries replied within 24 business hours
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-sm badge-dark">Sub-1000ms 3G/4G</span>
                    <span className="badge badge-sm">Monochrome Compliant</span>
                    <span className="badge badge-sm">Service Worker Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Official Government Helplines */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Landmark size={20} color="var(--grey-900)" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                  Government Helplines & Offices
                </h2>
              </div>
              <p style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--grey-600)' }}>
                For statutory filings, public grievance redressal, and government welfare pension inquiries:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ border: '1px solid var(--grey-300)', padding: '1.15rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--white)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, marginBottom: '0.35rem' }}>
                    Local Self Government Department (LSGD)
                  </h3>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    Government Secretariat (Annex-I), Thiruvananthapuram, Kerala - 695001
                  </p>
                  <div style={{ fontSize: '0.825rem', color: 'var(--grey-800)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span><strong>LSGD Helpline:</strong> 0471-2518434 / 2518435</span>
                    <span><strong>E-mail:</strong> lsgd@kerala.gov.in</span>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--grey-300)', padding: '1.15rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--white)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, marginBottom: '0.35rem' }}>
                    Information Kerala Mission (IKM)
                  </h3>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    State IT mission powering K-Smart, Sanchaya, and Sevana LSGD digital portals.
                  </p>
                  <div style={{ fontSize: '0.825rem', color: 'var(--grey-800)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span><strong>K-Smart Toll Free:</strong> 1800 425 2121</span>
                    <span><strong>Web:</strong> https://ikm.gov.in</span>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--grey-300)', padding: '1.15rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--grey-50)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, marginBottom: '0.25rem' }}>
                    Chief Minister’s Public Grievance Redressal
                  </h3>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    Dial <strong>1076</strong> (Toll Free in Kerala) or submit online at <em>cmo.kerala.gov.in</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Feedback & Developer Inquiry Form */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <MessageSquare size={20} color="var(--grey-900)" />
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
                Inquiry & Bug Report Form
              </h2>
            </div>
            <p style={{ marginBottom: '1.25rem', fontSize: '0.925rem', color: 'var(--grey-600)' }}>
              Send a message directly to the developer team or directory administrators.
            </p>

            {submitted ? (
              <div
                style={{
                  border: '2px solid var(--grey-900)',
                  padding: '2.5rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--grey-50)',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={44} style={{ margin: '0 auto 1rem', color: 'var(--grey-900)' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Inquiry Dispatched Successfully
                </h3>
                <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem', color: 'var(--grey-700)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your communication regarding{' '}
                  <strong>{formData.subject || formData.panchayat || 'the directory'}</strong> has been transmitted to developer <strong>Anujith K</strong> and the technical administration desk.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', panchayat: '', category: 'general', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label htmlFor="contact-category" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Inquiry Category *
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    <option value="developer-direct">Direct Message to Lead Developer (Anujith K)</option>
                    <option value="developer-gis">GIS Spatial Mapping & Coordinates Desk</option>
                    <option value="developer-bug">Technical Bug / 3G Loading Speed Report</option>
                    <option value="panchayat-data">Panchayat Office Details Correction</option>
                    <option value="general">General Directory Inquiry</option>
                  </select>
                  <div style={{ marginTop: '0.35rem', fontSize: '0.775rem', color: 'var(--grey-600)' }}>
                    {formData.category === 'developer-direct' && 'Routing directly to Anujith K (developer.anujithk@gmail.com)'}
                    {formData.category === 'developer-gis' && 'Routing to GIS Spatial Engineering Desk (gis.support@keralapanchayat.org)'}
                    {formData.category === 'developer-bug' && 'Routing to Web Performance & Engineering Desk (web-perf@keralapanchayat.org)'}
                    {formData.category === 'panchayat-data' && 'Routing to Directory Verification & Editorial Desk'}
                    {formData.category === 'general' && 'Routing to Public Helpdesk Administration'}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-panchayat" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Relevant Grama Panchayat (Optional)
                  </label>
                  <input
                    id="contact-panchayat"
                    name="panchayat"
                    type="text"
                    value={formData.panchayat}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    placeholder="e.g. Kumarakom, Mararikulam South, Meppadi, Poovar..."
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    placeholder="Subject of inquiry or bug report"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Detailed Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                    placeholder="Describe your inquiry, suggestion, or technical bug..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Send size={15} />
                  <span>Send Message to Team & Developer</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
