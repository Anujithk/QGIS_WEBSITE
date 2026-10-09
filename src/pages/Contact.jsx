import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Landmark, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    panchayat: '',
    subject: '',
    message: '',
  });

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
      <section className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Mail size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Public Helpdesk & Directory Inquiries
            </span>
          </div>
          <h1 className="page-title">Contact & LSGD Directory Support</h1>
          <p className="page-subtitle">
            Need assistance finding your Grama Panchayat or wish to report updated administrative details? Reach out through our directory inquiry channel.
          </p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {/* Official Helplines */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Government Helplines & Offices</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              For official administrative matters, grievance redressal, and government welfare pension inquiries, citizens can contact the relevant authorities directly:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ border: '1px solid var(--border-medium)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-white)' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  Local Self Government Department (LSGD)
                </h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Government Secretariat (Annex-I), Thiruvananthapuram, Kerala - 695001
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-800)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span><strong>LSGD Helpline:</strong> 0471-2518434 / 2518435</span>
                  <span><strong>E-mail:</strong> lsgd@kerala.gov.in</span>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-medium)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-white)' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  Information Kerala Mission (IKM)
                </h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  State IT mission powering K-Smart, Sanchaya, and Sevana LSGD digital portals.
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-800)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span><strong>K-Smart Toll Free:</strong> 1800 425 2121</span>
                  <span><strong>Web:</strong> https://ikm.gov.in</span>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-medium)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-gray-50)' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                  Chief Minister’s Public Grievance Redressal
                </h3>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>
                  Dial <strong>1076</strong> (Toll Free in Kerala) or submit online at <em>cmo.kerala.gov.in</em>
                </p>
              </div>
            </div>
          </div>

          {/* Directory Contact Form */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Directory Feedback Form</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Use this form to submit directory inquiries, verify phone numbers, or provide corrections.
            </p>

            {submitted ? (
              <div
                style={{
                  border: '2px solid var(--color-black)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-gray-50)',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={40} style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message Received</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your feedback regarding{' '}
                  {formData.panchayat || 'the directory'} has been recorded for review.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', panchayat: '', subject: '', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Full Name *
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
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
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
                  <label htmlFor="contact-panchayat" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
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
                    placeholder="e.g. Kumarakom, Mararikulam South, Meppadi..."
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="filter-select"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    placeholder="Directory update, question, or verification"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Inquiry Message *
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
                    placeholder="Describe your inquiry or directory feedback..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Send size={15} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
