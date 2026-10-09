import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Building,
  Layers,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  Landmark,
} from 'lucide-react';
import MapView from '../components/MapView';
import { PANCHAYATS } from '../data/panchayats';
import NotFound from './NotFound';

export default function PanchayatDetails() {
  const { id } = useParams();
  const panchayat = PANCHAYATS.find((p) => p.id === id);

  // If Panchayat slug doesn't exist, render custom 404
  if (!panchayat) {
    return <NotFound />;
  }

  const { lat, lng } = panchayat.coordinates || {};
  const googleMapsDirectionsUrl = lat && lng ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : null;

  return (
    <div>
      {/* Page Header & Breadcrumbs */}
      <section className="details-page-header">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/panchayats">Panchayats</Link>
            <ChevronRight size={14} />
            <Link to={`/panchayats?district=${encodeURIComponent(panchayat.district)}`}>
              {panchayat.district}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-black)', fontWeight: 600 }}>{panchayat.name}</span>
          </nav>

          <div className="details-title-row">
            <div className="details-heading-box">
              <h1 className="details-panchayat-name">{panchayat.name}</h1>
              {panchayat.malayalamName && (
                <div className="details-malayalam-name">{panchayat.malayalamName}</div>
              )}
              <div className="details-badge-row">
                <span className="badge badge-dark">{panchayat.district} District</span>
                <span className="badge">{panchayat.category}</span>
                {panchayat.harithaKarmaSenaActive && (
                  <span className="badge" style={{ backgroundColor: 'var(--color-white)' }}>
                    Haritha Karma Sena Active
                  </span>
                )}
              </div>
            </div>

            {googleMapsDirectionsUrl && (
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <MapPin size={14} />
                <span>Navigate to Office</span>
              </a>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div className="details-stats-grid">
            <div className="details-stat-box">
              <span className="details-stat-label">PIN Code</span>
              <span className="details-stat-value">{panchayat.pinCode}</span>
            </div>
            <div className="details-stat-box">
              <span className="details-stat-label">Total Wards</span>
              <span className="details-stat-value">{panchayat.wardCount || 'Verified by SEC'}</span>
            </div>
            {panchayat.areaSqKm && (
              <div className="details-stat-box">
                <span className="details-stat-label">Geographic Area</span>
                <span className="details-stat-value">{panchayat.areaSqKm} km²</span>
              </div>
            )}
            {panchayat.population && (
              <div className="details-stat-box">
                <span className="details-stat-label">Population (Census)</span>
                <span className="details-stat-value">{panchayat.population}</span>
              </div>
            )}
            <div className="details-stat-box">
              <span className="details-stat-label">Block Tier</span>
              <span className="details-stat-value" style={{ fontSize: '0.95rem' }}>
                {panchayat.blockPanchayat}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Two-Column Responsive Grid */}
      <section className="container details-layout-grid" style={{ paddingBottom: '4.5rem' }}>
        {/* Left Column: Map, Administrative Details, Citizen Services */}
        <div className="details-main-column">
          {/* Section 1: Interactive Map & Verified Location */}
          <div id="map-section" className="details-section-box">
            <div className="details-section-header">
              <MapPin size={18} />
              <h3>Panchayat Office Location & Map</h3>
            </div>
            <div className="details-section-body" style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {panchayat.locationDescription}
              </div>
              <MapView panchayat={panchayat} />
            </div>
          </div>

          {/* Section 2: Administrative Hierarchy */}
          <div className="details-section-box">
            <div className="details-section-header">
              <Landmark size={18} />
              <h3>Administrative Information & Jurisdiction</h3>
            </div>
            <div className="details-section-body" style={{ padding: 0 }}>
              <table className="admin-table">
                <tbody>
                  <tr>
                    <th>Grama Panchayat</th>
                    <td>{panchayat.name} ({panchayat.malayalamName || ''})</td>
                  </tr>
                  <tr>
                    <th>Intermediate Tier</th>
                    <td>{panchayat.blockPanchayat}</td>
                  </tr>
                  <tr>
                    <th>Apex District Tier</th>
                    <td>{panchayat.districtPanchayat}</td>
                  </tr>
                  <tr>
                    <th>Revenue District</th>
                    <td>{panchayat.district}</td>
                  </tr>
                  {panchayat.assemblyConstituency && (
                    <tr>
                      <th>Legislative Assembly Constituency (LAC)</th>
                      <td>{panchayat.assemblyConstituency}</td>
                    </tr>
                  )}
                  {panchayat.parliamentaryConstituency && (
                    <tr>
                      <th>Parliamentary Constituency (Lok Sabha)</th>
                      <td>{panchayat.parliamentaryConstituency}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Electoral Wards Count</th>
                    <td>{panchayat.wardCount} Electoral Wards</td>
                  </tr>
                  <tr>
                    <th>State Administrative Cadre</th>
                    <td>Local Self Government Department (LSGD), Government of Kerala</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Citizen Public Services */}
          <div className="details-section-box">
            <div className="details-section-header">
              <FileText size={18} />
              <h3>Panchayat Frontline Public Services</h3>
            </div>
            <div className="details-section-body">
              <p style={{ marginBottom: '1.25rem', fontSize: '0.925rem' }}>
                The following citizen services and statutory certificates are typically administered through this Grama Panchayat under the Kerala LSGD Citizen Charter:
              </p>

              <ul className="services-list">
                {panchayat.services.map((service, index) => (
                  <li key={index} className="service-item">
                    <CheckCircle size={16} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>

              <div className="service-disclaimer-alert">
                <strong>Notice on Application Procedures:</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--color-gray-700)' }}>
                  Service availability, fee schedules, and required application paperwork must be confirmed directly with the respective Panchayat office or via the unified <strong>K-Smart</strong> / <strong>Sanchaya</strong> digital governance portals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Official Contact Card & Working Hours */}
        <div className="details-sidebar-column">
          <div className="contact-sidebar-card">
            <div className="contact-sidebar-header">
              <h3 className="contact-sidebar-title">Office Contact & Details</h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--color-gray-600)' }}>
                Official Grama Panchayat Secretariat
              </span>
            </div>

            <ul className="contact-info-list">
              {/* Office Address */}
              {panchayat.officialAddress && (
                <li className="contact-item">
                  <MapPin size={17} />
                  <div>
                    <span className="contact-label">Official Address</span>
                    <span>{panchayat.officialAddress}</span>
                  </div>
                </li>
              )}

              {/* Contact Phone */}
              {panchayat.contactNumber && (
                <li className="contact-item">
                  <Phone size={17} />
                  <div>
                    <span className="contact-label">Telephone Number</span>
                    <a
                      href={`tel:${panchayat.contactNumber.replace(/\s+/g, '')}`}
                      style={{ fontWeight: 600, textDecoration: 'underline' }}
                    >
                      {panchayat.contactNumber}
                    </a>
                  </div>
                </li>
              )}

              {/* Official Email */}
              {panchayat.email && (
                <li className="contact-item">
                  <Mail size={17} />
                  <div>
                    <span className="contact-label">Official E-Mail</span>
                    <a
                      href={`mailto:${panchayat.email}`}
                      style={{ wordBreak: 'break-all', textDecoration: 'underline' }}
                    >
                      {panchayat.email}
                    </a>
                  </div>
                </li>
              )}

              {/* Working Hours */}
              {panchayat.workingHours && (
                <li className="contact-item">
                  <Clock size={17} />
                  <div>
                    <span className="contact-label">Working Hours</span>
                    <span>{panchayat.workingHours}</span>
                  </div>
                </li>
              )}

              {/* Official Website / LSGD Portal */}
              {panchayat.officialWebsite && (
                <li className="contact-item">
                  <Globe size={17} />
                  <div>
                    <span className="contact-label">Official LSGD Portal</span>
                    <a
                      href={panchayat.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'underline',
                        fontWeight: 600,
                      }}
                    >
                      <span>Visit Panchayat Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </li>
              )}
            </ul>

            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
              <a
                href="#map-section"
                className="btn btn-outline-dark btn-sm"
                style={{ width: '100%' }}
              >
                <span>Jump to Interactive Map</span>
              </a>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div
            style={{
              padding: '1.25rem',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-gray-50)',
              fontSize: '0.825rem',
              color: 'var(--color-gray-700)',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.35rem' }}>
              <AlertCircle size={15} />
              <span>Right to Information (RTI)</span>
            </div>
            Citizens may file RTI queries with the designated State Public Information Officer (SPIO / Junior Superintendent) at this Grama Panchayat office.
          </div>
        </div>
      </section>
    </div>
  );
}
