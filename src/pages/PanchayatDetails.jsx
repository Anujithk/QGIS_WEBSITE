import React, { lazy, Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Building,
  Building2,
  Layers,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PANCHAYATS } from '../data/panchayats';
import { CORPORATIONS, MUNICIPALITIES } from '../data/urban';
import NotFound from './NotFound';

// Lazy-load Leaflet map so critical administrative details load sub-300ms on 3G/4G
const MapView = lazy(() => import('../components/MapView'));

export default function PanchayatDetails() {
  const { id } = useParams();

  // Find local body across all 3 tiers (Grama Panchayats, Corporations, Municipalities)
  const localBody = useMemo(() => {
    return (
      PANCHAYATS.find((p) => p.id === id) ||
      CORPORATIONS.find((c) => c.id === id) ||
      MUNICIPALITIES.find((m) => m.id === id)
    );
  }, [id]);

  // If local body slug doesn't exist, render custom 404
  if (!localBody) {
    return <NotFound />;
  }

  const isCorporation = localBody.type === 'Municipal Corporation';
  const isMunicipality = localBody.type === 'Municipality';
  const isUrban = isCorporation || isMunicipality;
  const isGramaPanchayat = !isUrban;

  const { lat, lng } = localBody.coordinates || {};
  const googleMapsDirectionsUrl =
    lat && lng ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : null;

  // Breadcrumb targets based on tier
  const tierDirectoryPath = isCorporation
    ? '/panchayats?tab=corporation'
    : isMunicipality
      ? '/panchayats?tab=municipality'
      : '/panchayats';

  const tierDirectoryLabel = isCorporation
    ? 'Municipal Corporations'
    : isMunicipality
      ? 'Municipalities'
      : 'Panchayats';

  const districtDirectoryPath = isCorporation
    ? `/panchayats?tab=corporation&district=${encodeURIComponent(localBody.district)}`
    : isMunicipality
      ? `/panchayats?tab=municipality&district=${encodeURIComponent(localBody.district)}`
      : `/panchayats?district=${encodeURIComponent(localBody.district)}`;

  // Find related local bodies in the same district for fast navigation
  const relatedBodies = useMemo(() => {
    if (isUrban) {
      const otherUrban = [
        ...CORPORATIONS.filter((c) => c.district.toLowerCase() === localBody.district.toLowerCase() && c.id !== localBody.id),
        ...MUNICIPALITIES.filter((m) => m.district.toLowerCase() === localBody.district.toLowerCase() && m.id !== localBody.id)
      ];
      if (otherUrban.length >= 3) return otherUrban.slice(0, 4);
      // If few urban bodies, supplement with panchayats in the district
      const districtPanchayats = PANCHAYATS.filter(
        (p) => p.district.toLowerCase() === localBody.district.toLowerCase()
      ).slice(0, 4 - otherUrban.length);
      return [...otherUrban, ...districtPanchayats];
    }
    // For Grama Panchayat: same block first, then same district
    const sameBlock = PANCHAYATS.filter(
      (p) => p.district.toLowerCase() === localBody.district.toLowerCase() &&
        p.blockPanchayat === localBody.blockPanchayat &&
        p.id !== localBody.id
    ).slice(0, 4);
    if (sameBlock.length >= 4) return sameBlock;
    const sameDistrict = PANCHAYATS.filter(
      (p) => p.district.toLowerCase() === localBody.district.toLowerCase() &&
        p.id !== localBody.id &&
        !sameBlock.some(b => b.id === p.id)
    ).slice(0, 4 - sameBlock.length);
    return [...sameBlock, ...sameDistrict];
  }, [localBody, isUrban]);

  return (
    <div>
      {/* Page Header & Breadcrumbs */}
      <section className="details-page-header">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to={tierDirectoryPath}>{tierDirectoryLabel}</Link>
            <ChevronRight size={14} />
            <Link to={districtDirectoryPath}>
              {localBody.district}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-black)', fontWeight: 600 }}>{localBody.name}</span>
          </nav>

          <div className="details-title-row">
            <div className="details-heading-box">
              <h1 className="details-panchayat-name">{localBody.name}</h1>
              {localBody.malayalamName && (
                <div className="details-malayalam-name">{localBody.malayalamName}</div>
              )}
              <div className="details-badge-row">
                <span className="badge badge-dark">{localBody.district} District</span>
                <span className="badge">{localBody.category || localBody.type}</span>
                {localBody.grade && (
                  <span className="badge badge-dark">{localBody.grade}</span>
                )}
                {localBody.formationYear && (
                  <span className="badge">Est. {localBody.formationYear}</span>
                )}
                {localBody.harithaKarmaSenaActive && (
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
                <span>
                  {isCorporation
                    ? 'Directions to Corporation'
                    : isMunicipality
                      ? 'Directions to Municipality'
                      : 'Navigate to Office'}
                </span>
              </a>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div className="details-stats-grid">
            <div className="details-stat-box">
              <span className="details-stat-label">PIN Code</span>
              <span className="details-stat-value">{localBody.pinCode}</span>
            </div>
            <div className="details-stat-box">
              <span className="details-stat-label">
                {isCorporation ? 'Council Divisions' : 'Electoral Wards'}
              </span>
              <span className="details-stat-value">
                {localBody.wardCount ? `${localBody.wardCount} ${isCorporation ? 'Divisions' : 'Wards'}` : 'Verified SEC'}
              </span>
            </div>
            {localBody.areaSqKm && (
              <div className="details-stat-box">
                <span className="details-stat-label">Geographic Area</span>
                <span className="details-stat-value">{localBody.areaSqKm} km²</span>
              </div>
            )}
            {(localBody.populationFormatted || localBody.population) && (
              <div className="details-stat-box">
                <span className="details-stat-label">Population (Census)</span>
                <span className="details-stat-value">
                  {localBody.populationFormatted || localBody.population.toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="details-stat-box">
              <span className="details-stat-label">
                {isUrban ? 'Administrative Tier' : 'Block Tier'}
              </span>
              <span className="details-stat-value" style={{ fontSize: '0.925rem' }}>
                {isUrban ? 'Urban Local Body (Nagarpalika)' : localBody.blockPanchayat}
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
              <h3>
                {isCorporation
                  ? 'Municipal Corporation Office Location & Map'
                  : isMunicipality
                    ? 'Municipal Office Location & Map'
                    : 'Panchayat Office Location & Map'}
              </h3>
            </div>
            <div className="details-section-body" style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {localBody.locationDescription || localBody.description}
              </div>
              <Suspense
                fallback={
                  <div
                    style={{
                      height: '380px',
                      backgroundColor: 'var(--grey-100)',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      border: '1px dashed var(--grey-300)',
                      color: 'var(--grey-600)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '2px solid var(--grey-300)',
                        borderTopColor: 'var(--grey-900)',
                        borderRadius: '50%',
                        animation: 'spin-fast 0.6s linear infinite',
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      Loading GIS Map Coordinates...
                    </span>
                  </div>
                }
              >
                <MapView panchayat={localBody} />
              </Suspense>
            </div>
          </div>

          {/* Section 2: Administrative Hierarchy */}
          <div className="details-section-box">
            <div className="details-section-header">
              <Landmark size={18} />
              <h3>Administrative Information & Jurisdiction</h3>
            </div>
            <div className="details-section-body" style={{ padding: 0 }}>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <tbody>
                    <tr>
                      <th>Local Self-Government Body</th>
                      <td>
                        <strong>{localBody.name}</strong>{' '}
                        {localBody.malayalamName ? `(${localBody.malayalamName})` : ''}
                      </td>
                    </tr>
                    <tr>
                      <th>Administrative Classification</th>
                      <td>
                        <span className="badge badge-dark" style={{ marginRight: '0.5rem' }}>
                          {localBody.type}
                        </span>
                        <span>{localBody.category}</span>
                      </td>
                    </tr>
                    {isUrban ? (
                      <>
                        <tr>
                          <th>Urban Governance Framework</th>
                          <td>
                            Kerala Municipality Act, 1994 & 74th Constitutional Amendment (Nagarpalika)
                          </td>
                        </tr>
                        {localBody.formationYear && (
                          <tr>
                            <th>Year of Establishment</th>
                            <td>{localBody.formationYear}</td>
                          </tr>
                        )}
                        {localBody.headquarters && (
                          <tr>
                            <th>Official Headquarters</th>
                            <td>{localBody.headquarters}</td>
                          </tr>
                        )}
                        {localBody.densityPerSqKm && (
                          <tr>
                            <th>Population Density</th>
                            <td>{localBody.densityPerSqKm.toLocaleString('en-IN')} persons / km²</td>
                          </tr>
                        )}
                      </>
                    ) : (
                      <>
                        <tr>
                          <th>Intermediate Tier (Block)</th>
                          <td>
                            <Link
                              to={`/panchayats?district=${encodeURIComponent(localBody.district)}&block=${encodeURIComponent(localBody.blockPanchayat.replace(' Block Panchayat', ''))}`}
                              style={{ textDecoration: 'underline', fontWeight: 600 }}
                            >
                              {localBody.blockPanchayat}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Apex District Tier</th>
                          <td>
                            <Link
                              to={`/panchayats?tab=district&district=${encodeURIComponent(localBody.district)}`}
                              style={{ textDecoration: 'underline', fontWeight: 600 }}
                            >
                              {localBody.districtPanchayat}
                            </Link>
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th>Revenue District</th>
                      <td>
                        <Link
                          to={districtDirectoryPath}
                          style={{ textDecoration: 'underline', fontWeight: 600 }}
                        >
                          {localBody.district} District
                        </Link>
                      </td>
                    </tr>
                    {localBody.assemblyConstituency && (
                      <tr>
                        <th>Legislative Assembly Constituency (LAC)</th>
                        <td>{localBody.assemblyConstituency}</td>
                      </tr>
                    )}
                    {localBody.parliamentaryConstituency && (
                      <tr>
                        <th>Parliamentary Constituency (Lok Sabha)</th>
                        <td>{localBody.parliamentaryConstituency}</td>
                      </tr>
                    )}
                    <tr>
                      <th>Electoral Wards / Divisions</th>
                      <td>
                        {localBody.wardCount}{' '}
                        {isCorporation ? 'Council Divisions' : 'Electoral Wards'}
                      </td>
                    </tr>
                    <tr>
                      <th>State Administrative Cadre</th>
                      <td>
                        {isUrban
                          ? 'Department of Urban Affairs, Local Self Government Department (LSGD), Government of Kerala'
                          : 'Department of Panchayats, Local Self Government Department (LSGD), Government of Kerala'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Citizen Public Services */}
          <div className="details-section-box">
            <div className="details-section-header">
              <FileText size={18} />
              <h3>
                {isCorporation
                  ? 'Municipal Corporation Frontline Public Services'
                  : isMunicipality
                    ? 'Municipal Frontline Public Services'
                    : 'Panchayat Frontline Public Services'}
              </h3>
            </div>
            <div className="details-section-body">
              <p style={{ marginBottom: '1.25rem', fontSize: '0.925rem' }}>
                {isUrban
                  ? `The following urban citizen services, trade licenses, building sanctions, and statutory certificates are administered through ${localBody.name} under the Kerala LSGD Citizen Charter and the K-Smart digital portal:`
                  : `The following citizen services and statutory certificates are typically administered through this Grama Panchayat under the Kerala LSGD Citizen Charter:`}
              </p>

              <ul className="services-list">
                {localBody.services && localBody.services.length > 0 ? (
                  localBody.services.map((service, index) => (
                    <li key={index} className="service-item">
                      <CheckCircle size={16} />
                      <span>{service}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>Civil Registration (Birth, Death, and Marriage Certification)</span>
                    </li>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>K-Smart Digital Building Permits, Occupancy & Regularization</span>
                    </li>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>Property Tax & Profession Tax Online Assessment (Sanchaya)</span>
                    </li>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>Haritha Karma Sena Non-Biodegradable Solid Waste Collection</span>
                    </li>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>Dangerous & Offensive (D&O) Trade Licenses and Renewals</span>
                    </li>
                    <li className="service-item">
                      <CheckCircle size={16} />
                      <span>Street Lighting, Public Sanitation, Drainage, and Vector Control</span>
                    </li>
                  </>
                )}
              </ul>

              <div className="service-disclaimer-alert">
                <strong>Digital Portal Access & Citizen Charter:</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--color-gray-700)' }}>
                  Citizens can access online services 24x7 via the unified Government of Kerala{' '}
                  <strong>K-Smart</strong> (for municipal corporations and municipalities),{' '}
                  <strong>Sanchaya</strong> (e-taxation), and <strong>ILGMS</strong> (Integrated Local Governance Management System) platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Related Local Bodies in District */}
          {relatedBodies.length > 0 && (
            <div className="details-section-box">
              <div className="details-section-header">
                <Building2 size={18} />
                <h3>Other Local Bodies in {localBody.district} District</h3>
              </div>
              <div className="details-section-body" style={{ padding: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  {relatedBodies.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/panchayats/${rel.id}`}
                      style={{
                        padding: '0.85rem',
                        border: '1px solid var(--grey-250)',
                        borderRadius: 'var(--radius-xs)',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: 'var(--grey-50)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.4rem',
                        transition: 'border-color 0.15s ease, transform 0.15s ease',
                      }}
                      className="related-body-link"
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="badge" style={{ fontSize: '0.675rem', padding: '0.1rem 0.35rem' }}>
                            {rel.type}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: 'var(--grey-600)' }}>
                            PIN {rel.pinCode}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0.35rem 0 0.15rem 0', color: 'var(--grey-950)' }}>
                          {rel.name}
                        </h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--grey-600)' }}>
                          {rel.malayalamName}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.775rem', fontWeight: 600, color: 'var(--grey-900)', marginTop: '0.35rem' }}>
                        <span>Inspect Profile</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Official Contact Card & Working Hours */}
        <div className="details-sidebar-column">
          <div className="contact-sidebar-card">
            <div className="contact-sidebar-header">
              <h3 className="contact-sidebar-title">
                {isCorporation
                  ? 'Corporation Office & Contacts'
                  : isMunicipality
                    ? 'Municipal Office & Contacts'
                    : 'Office Contact & Details'}
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--color-gray-600)' }}>
                {isCorporation
                  ? 'Official Municipal Corporation Secretariat'
                  : isMunicipality
                    ? 'Official Municipal Council Secretariat'
                    : 'Official Grama Panchayat Secretariat'}
              </span>
            </div>

            <ul className="contact-info-list">
              {/* Office Address */}
              {localBody.officialAddress && (
                <li className="contact-item">
                  <MapPin size={17} />
                  <div>
                    <span className="contact-label">Official Address</span>
                    <span>{localBody.officialAddress}</span>
                  </div>
                </li>
              )}

              {/* Contact Phone */}
              {(localBody.contactNumber || localBody.phone) && (
                <li className="contact-item">
                  <Phone size={17} />
                  <div>
                    <span className="contact-label">Telephone Number</span>
                    <a
                      href={`tel:${(localBody.contactNumber || localBody.phone).replace(/\s+/g, '')}`}
                      style={{ fontWeight: 600, textDecoration: 'underline' }}
                    >
                      {localBody.contactNumber || localBody.phone}
                    </a>
                  </div>
                </li>
              )}

              {/* Official Email */}
              {localBody.email && (
                <li className="contact-item">
                  <Mail size={17} />
                  <div>
                    <span className="contact-label">Official E-Mail</span>
                    <a
                      href={`mailto:${localBody.email}`}
                      style={{ wordBreak: 'break-all', textDecoration: 'underline' }}
                    >
                      {localBody.email}
                    </a>
                  </div>
                </li>
              )}

              {/* Working Hours */}
              {localBody.workingHours && (
                <li className="contact-item">
                  <Clock size={17} />
                  <div>
                    <span className="contact-label">Working Hours</span>
                    <span>{localBody.workingHours}</span>
                  </div>
                </li>
              )}

              {/* Official Website / LSGD Portal */}
              {(localBody.officialWebsite || localBody.website) && (
                <li className="contact-item">
                  <Globe size={17} />
                  <div>
                    <span className="contact-label">
                      {isCorporation
                        ? 'Official Corporation Portal'
                        : isMunicipality
                          ? 'Official Municipal Portal'
                          : 'Official LSGD Portal'}
                    </span>
                    <a
                      href={localBody.officialWebsite || localBody.website}
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
                      <span>
                        {isCorporation
                          ? 'Visit Corporation Website'
                          : isMunicipality
                            ? 'Visit Municipal Website'
                            : 'Visit Panchayat Portal'}
                      </span>
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
                style={{ width: '100%', justifyContent: 'center' }}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 700,
                color: 'var(--color-black)',
                marginBottom: '0.35rem',
              }}
            >
              <AlertCircle size={15} />
              <span>Right to Information (RTI)</span>
            </div>
            {isCorporation
              ? 'Citizens may submit RTI applications to the designated State Public Information Officer (SPIO / Corporation Secretary / Revenue Officer) at this Municipal Corporation office.'
              : isMunicipality
                ? 'Citizens may submit RTI applications to the designated State Public Information Officer (SPIO / Municipal Secretary) at this Municipal Council office.'
                : 'Citizens may file RTI queries with the designated State Public Information Officer (SPIO / Junior Superintendent) at this Grama Panchayat office.'}
          </div>
        </div>
      </section>
    </div>
  );
}

