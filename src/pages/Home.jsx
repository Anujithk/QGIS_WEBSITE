import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Building2, Map, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import DistrictCard from '../components/DistrictCard';
import PanchayatCard from '../components/PanchayatCard';
import { DISTRICTS, TOTAL_KERALA_PANCHAYATS, TOTAL_BLOCK_PANCHAYATS } from '../data/districts';
import { PANCHAYATS } from '../data/panchayats';

export default function Home() {
  const featuredPanchayats = PANCHAYATS.filter((p) => p.isFeatured);

  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container hero-content">
          <div className="hero-pill">
            <Layers size={14} />
            <span>Local Self Government Directory · Kerala</span>
          </div>

          <h1 className="hero-title">Discover Your Grama Panchayat</h1>

          <p className="hero-description">
            Explore Kerala's local self-government institutions, administrative divisions, public services, and Panchayat information in one place.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="Search by Panchayat name, district, or location..." autoFocus />
          </div>

          {/* Quick Administrative Stats Bar */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <div className="stat-number">14</div>
              <div className="stat-label">Districts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_BLOCK_PANCHAYATS}</div>
              <div className="stat-label">Block Panchayats</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_KERALA_PANCHAYATS}</div>
              <div className="stat-label">Grama Panchayats</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3-Tier</div>
              <div className="stat-label">Panchayati Raj</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by District Section */}
      <section className="container section-padding">
        <div className="section-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <h2 className="section-title">
              <Map size={24} />
              <span>Explore by District</span>
            </h2>
            <p className="section-subtitle">
              Browse Grama Panchayats across all 14 administrative districts of Kerala
            </p>
          </div>
          <Link to="/panchayats" className="btn btn-secondary btn-sm">
            <span>View All Panchayats</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="districts-grid">
          {DISTRICTS.map((district) => (
            <DistrictCard key={district.id} district={district} />
          ))}
        </div>
      </section>

      {/* Featured Panchayats Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-gray-100)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <h2 className="section-title" style={{ margin: 0 }}>
                  <Building2 size={24} />
                  <span>Featured Panchayats</span>
                </h2>
                <span className="sample-notice-pill">Sample Directory Records</span>
              </div>
              <p className="section-subtitle">
                Highlighted Grama Panchayats illustrating decentralized governance and public service profiles
              </p>
            </div>
            <Link to="/panchayats" className="btn btn-primary btn-sm">
              <span>Full Directory ({PANCHAYATS.length} Records)</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="panchayats-grid">
            {featuredPanchayats.map((panchayat) => (
              <PanchayatCard key={panchayat.id} panchayat={panchayat} />
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-600)' }}>
              Note: Demonstration data displayed for public directory layout illustration. Real office coordinates and administrative boundaries verified where indicated.
            </span>
          </div>
        </div>
      </section>

      {/* About Kerala Government & Local Self-Government Section */}
      <section className="container section-padding">
        <div className="section-header">
          <h2 className="section-title">
            <ShieldCheck size={24} />
            <span>Local Self-Government in Kerala</span>
          </h2>
          <p className="section-subtitle">
            An overview of decentralized planning, grassroots democracy, and public administration in Kerala
          </p>
        </div>

        <div className="info-cards-grid">
          <div className="info-card">
            <span className="info-card-number">01 / STRUCTURE</span>
            <h3 className="info-card-title">Three-Tier Panchayati Raj</h3>
            <p className="info-card-text">
              Under the Kerala Panchayat Raj Act, 1994, rural administration is structured into three tiers: <strong>Grama Panchayats</strong> at the village level, <strong>Block Panchayats</strong> at the intermediate level, and <strong>District Panchayats</strong> at the apex district level.
            </p>
          </div>

          <div className="info-card">
            <span className="info-card-number">02 / DECENTRALIZATION</span>
            <h3 className="info-card-title">People's Plan Campaign</h3>
            <p className="info-card-text">
              Kerala is globally celebrated for pioneering democratic decentralization (Janasoothranam), devolving significant state developmental funds and decision-making powers directly to elected local bodies for grassroots planning.
            </p>
          </div>

          <div className="info-card">
            <span className="info-card-number">03 / CITIZEN SERVICES</span>
            <h3 className="info-card-title">Frontline Service Delivery</h3>
            <p className="info-card-text">
              Grama Panchayats are the direct interface for citizens, administering vital records, building permissions, property taxation via Sanchaya, poverty alleviation schemes, waste management through Haritha Karma Sena, and welfare pensions.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-gray-50)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Want to learn more about Kerala's administrative departments?
            </h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Read our comprehensive guide detailing the constitutional framework, ward wards allocation, and citizen charter.
            </p>
          </div>
          <Link to="/about" className="btn btn-outline-dark btn-sm">
            <span>Read About Kerala LSGD</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
