import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Building2, Building, Map, ShieldCheck, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import DistrictCard from '../components/DistrictCard';
import PanchayatCard from '../components/PanchayatCard';
import {
  DISTRICTS,
  TOTAL_KERALA_PANCHAYATS,
  TOTAL_BLOCK_PANCHAYATS,
  TOTAL_MUNICIPALITIES,
  TOTAL_CORPORATIONS,
  TOTAL_KERALA_LSGIS
} from '../data/districts';
import { PANCHAYATS } from '../data/panchayats';

export default function Home() {
  const featuredPanchayats = PANCHAYATS.filter((p) => p.isFeatured);

  return (
    <div>
      {/* Official Hero Section with Emblem & Rich Shading */}
      <section className="home-hero">
        <div className="container hero-content">
          {/* Official Emblem Crest */}
          <div className="hero-emblem-crest">
            <img
              src="/kerala-gov-logo.png"
              alt="Government of Kerala Emblem"
              className="hero-logo-large"
            />
            <div className="hero-emblem-titles">
              <span className="hero-state-label">കേരള സർക്കാർ · GOVERNMENT OF KERALA</span>
              <span className="hero-dept-label">LOCAL SELF GOVERNMENT DEPARTMENT (LSGD)</span>
            </div>
          </div>

          <h1 className="hero-title">Discover Kerala Local Self-Governments</h1>

          <p className="hero-description">
            Explore Kerala's local self-government institutions, revenue districts, urban local bodies, public services, and official LSGD information in one unified portal.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="Search by Panchayat, Municipality, Corporation, or district..." autoFocus />
          </div>

          {/* Quick Administrative Stats Bar with Multi-Shade Elevation */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <div className="stat-number">14</div>
              <div className="stat-label">Districts</div>
              <div className="stat-sub">Revenue Divisions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_CORPORATIONS}</div>
              <div className="stat-label">Corporations</div>
              <div className="stat-sub">Metropolitan Tier</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_MUNICIPALITIES}</div>
              <div className="stat-label">Municipalities</div>
              <div className="stat-sub">Urban Councils</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_BLOCK_PANCHAYATS}</div>
              <div className="stat-label">Block Panchayats</div>
              <div className="stat-sub">Intermediate Tier</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_KERALA_PANCHAYATS}</div>
              <div className="stat-label">Grama Panchayats</div>
              <div className="stat-sub">Village Institutions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{TOTAL_KERALA_LSGIS}</div>
              <div className="stat-label">Total LSGIs</div>
              <div className="stat-sub">Statewide Democracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by District Section */}
      <section className="container section-padding">
        <div className="section-header-row">
          <div>
            <div className="section-tag-row">
              <span className="section-kicker">ADMINISTRATIVE DIVISIONS</span>
            </div>
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

      {/* Urban Local Bodies Spotlight (Corporations & Municipalities) */}
      <section className="container section-padding" style={{ paddingTop: 0 }}>
        <div className="section-header-row">
          <div>
            <div className="section-tag-row">
              <span className="section-kicker">URBAN LOCAL BODIES (NAGARPALIKA)</span>
              <span className="sample-notice-pill">6 Corporations · 87 Municipalities</span>
            </div>
            <h2 className="section-title">
              <Building size={24} />
              <span>Municipal Corporations of Kerala</span>
            </h2>
            <p className="section-subtitle">
              The 6 apex municipal corporations administering Kerala’s major urban agglomerations and commercial hubs
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link to="/panchayats?tab=corporation" className="btn btn-primary btn-sm">
              <span>All 6 Corporations</span>
              <ArrowRight size={13} />
            </Link>
            <Link to="/panchayats?tab=municipality" className="btn btn-secondary btn-sm">
              <span>All 87 Municipalities</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {[
            { id: 'thiruvananthapuram-corp', name: 'Thiruvananthapuram Corporation', mal: 'തിരുവനന്തപുരം കോർപ്പറേഷൻ', dist: 'Thiruvananthapuram', wards: 101, pop: '9,55,494', role: 'State Capital & Oldest Corporation (Est. 1940)' },
            { id: 'kochi-corp', name: 'Kochi Municipal Corporation', mal: 'കൊച്ചി കോർപ്പറേഷൻ', dist: 'Ernakulam', wards: 76, pop: '6,77,381', role: 'Commercial & Maritime Financial Hub (Est. 1967)' },
            { id: 'kozhikode-corp', name: 'Kozhikode Municipal Corporation', mal: 'കോഴിക്കോട് കോർപ്പറേഷൻ', dist: 'Kozhikode', wards: 76, pop: '6,09,214', role: 'Historic Spice Trade Capital & City of Literature (Est. 1962)' },
            { id: 'kollam-corp', name: 'Kollam Municipal Corporation', mal: 'കൊല്ലം കോർപ്പറേഷൻ', dist: 'Kollam', wards: 56, pop: '3,88,288', role: 'Historic Port City on Ashtamudi Lake (Est. 2000)' },
            { id: 'thrissur-corp', name: 'Thrissur Municipal Corporation', mal: 'തൃശ്ശൂർ കോർപ്പറേഷൻ', dist: 'Thrissur', wards: 56, pop: '3,15,596', role: 'Cultural Capital & Heritage Metropolis (Est. 2000)' },
            { id: 'kannur-corp', name: 'Kannur Municipal Corporation', mal: 'കണ്ണൂർ കോർപ്പറേഷൻ', dist: 'Kannur', wards: 56, pop: '2,32,486', role: 'Handloom & Coastal Malabar Metropolis (Est. 2015)' },
          ].map((c) => (
            <div key={c.id} className="admin-tier-card" style={{ borderTop: '3px solid var(--grey-900)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span className="badge badge-dark">Corporation</span>
                  <span className="admin-tier-badge">{c.dist}</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.2rem 0', color: 'var(--grey-950)' }}>
                  <Link to={`/panchayats/${c.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {c.name}
                  </Link>
                </h4>
                <div className="admin-tier-malayalam" style={{ fontSize: '0.9rem' }}>{c.mal}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--grey-600)', margin: '0.4rem 0 0.6rem 0' }}>{c.role}</p>

                <div className="admin-tier-meta-list">
                  <div className="admin-tier-meta-item">
                    <span className="admin-tier-meta-label">Divisions:</span>
                    <span className="admin-tier-meta-val">{c.wards} Wards</span>
                  </div>
                  <div className="admin-tier-meta-item">
                    <span className="admin-tier-meta-label">Population:</span>
                    <span className="admin-tier-meta-val">{c.pop}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/panchayats/${c.id}`}
                className="btn btn-outline-dark btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>View Corporation Details</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Panchayats Section with Shaded Backdrop */}
      <section className="section-padding section-band-shaded">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-tag-row">
                <span className="section-kicker">LSGD DIRECTORY</span>
                <span className="sample-notice-pill">State-wide Registry · 941 Panchayats</span>
              </div>
              <h2 className="section-title">
                <Building2 size={24} />
                <span>Featured Panchayats</span>
              </h2>
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

          <div className="sample-data-footer-note">
            <span>
              <strong>State-wide Administrative Registry:</strong> Comprehensive registry across all 14 District Panchayats, 152 Block Panchayats, and 941 Grama Panchayats of Kerala with official headquarters, PIN codes, wards, and GIS coordinates.
            </span>
          </div>
        </div>
      </section>

      {/* About Kerala Government & Local Self-Government Section */}
      <section className="container section-padding">
        <div className="section-header">
          <div className="section-tag-row">
            <span className="section-kicker">GOVERNANCE & CIVIC CHARTER</span>
          </div>
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
            <div className="info-card-header">
              <span className="info-card-number">01 / ARCHITECTURE</span>
            </div>
            <h3 className="info-card-title">Three-Tier Panchayati Raj</h3>
            <p className="info-card-text">
              Under the Kerala Panchayat Raj Act, 1994, rural administration is structured into three tiers: <strong>Grama Panchayats</strong> at the village level, <strong>Block Panchayats</strong> at the intermediate level, and <strong>District Panchayats</strong> at the apex district level.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <span className="info-card-number">02 / DECENTRALIZATION</span>
            </div>
            <h3 className="info-card-title">People's Plan Campaign</h3>
            <p className="info-card-text">
              Kerala is globally celebrated for pioneering democratic decentralization (Janasoothranam), devolving significant state developmental funds and decision-making powers directly to elected local bodies for grassroots planning.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <span className="info-card-number">03 / CITIZEN SERVICES</span>
            </div>
            <h3 className="info-card-title">Frontline Service Delivery</h3>
            <p className="info-card-text">
              Grama Panchayats are the direct interface for citizens, administering vital records, building permissions, property taxation via Sanchaya, poverty alleviation schemes, waste management through Haritha Karma Sena, and welfare pensions.
            </p>
          </div>
        </div>

        <div className="about-cta-banner">
          <div>
            <h4 className="about-cta-title">
              Want to learn more about Kerala's administrative departments?
            </h4>
            <p className="about-cta-desc">
              Read our comprehensive guide detailing the constitutional framework, ward allocations, and citizen charter.
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
