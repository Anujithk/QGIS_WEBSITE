import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            border: '2px solid var(--color-black)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FileQuestion size={32} />
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>404 - Page Not Found</h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          The Grama Panchayat or directory page you requested does not exist or may have been relocated. Please check the spelling or explore the comprehensive directory.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <Link to="/panchayats" className="btn btn-primary">
            <Search size={15} />
            <span>Browse Panchayat Directory</span>
          </Link>
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft size={15} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
