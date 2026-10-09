import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Building2, Map, ShieldCheck, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import DistrictCard from '../components/DistrictCard';
import PanchayatCard from '../components/PanchayatCard';
import { DISTRICTS, TOTAL_KERALA_PANCHAYATS, TOTAL_BLOCK_PANCHAYATS } from '../data/districts';
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

          <h1 className="hero-title">Discover Your Grama Panchayat</h1>

          <p className="hero-description">
            Explore Kerala's local self-government institutions, administrative divisions, public services, and Panchayat information in one place.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="Search by Panchayat name, district, or location..." autoFocus />
          </div>

          {/* Quick Administrative Stats Bar with Multi-Shade Elevation */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <div className="stat-number">14</div>
              <div className="stat-label">Districts</div>
              <div className="stat-sub">Revenue Divisions</div>
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
              <div className="stat-number">3-Tier</div>
              <div className="stat-label">Panchayati Raj</div>
              <div className="stat-sub">Decentralized LSGD</div>
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

      {/* Featured Panchayats Section with Shaded Backdrop */}
      <section className="section-padding section-band-shaded">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-tag-row">
                <span className="section-kicker">LSGD DIRECTORY</span>
                <span className="sample-notice-pill">Sample Records</span>
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
              <strong>Public Notice:</strong> Demonstration data displayed for public directory layout illustration. Real office coordinates and administrative boundaries verified where indicated.
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
