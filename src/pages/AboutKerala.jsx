import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Shield, Layers, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { DISTRICTS, TOTAL_KERALA_PANCHAYATS, TOTAL_BLOCK_PANCHAYATS } from '../data/districts';

export default function AboutKerala() {
  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Landmark size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Administrative Governance
            </span>
          </div>
          <h1 className="page-title">About the Government of Kerala & Local Self-Government</h1>
          <p className="page-subtitle">
            A comprehensive overview of Kerala's democratic decentralization, three-tier Panchayati Raj institutions, and rural administration.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container section-padding">
        <div className="prose-content">
          <h2>1. Overview of the Government of Kerala</h2>
          <p>
            The Government of Kerala is the supreme administrative authority for the state of Kerala, headquartered at the Government Secretariat in Thiruvananthapuram. Kerala has long been recognized nationally and internationally for its human development indicators, including near-universal literacy, low infant mortality, high life expectancy, and pioneering democratic reforms.
          </p>

          <h2>2. The Three-Tier Panchayati Raj Architecture</h2>
          <p>
            Enacted pursuant to the historic 73rd and 74th Constitutional Amendments of India, the <strong>Kerala Panchayat Raj Act, 1994</strong> established a structured, three-tier local self-governing hierarchy across rural Kerala:
          </p>
          <ul>
            <li>
              <strong>Grama Panchayats (Village Tier):</strong> The fundamental building block of local democracy. Kerala comprises <strong>{TOTAL_KERALA_PANCHAYATS} Grama Panchayats</strong> across 14 districts, each representing a cluster of revenue villages and divided into 13 to 23 electoral wards.
            </li>
            <li>
              <strong>Block Panchayats (Intermediate Tier):</strong> Grouping neighboring Grama Panchayats, Kerala’s <strong>{TOTAL_BLOCK_PANCHAYATS} Block Panchayats</strong> coordinate regional agriculture, rural infrastructure, poverty reduction schemes, and healthcare centres.
            </li>
            <li>
              <strong>District Panchayats (Apex District Tier):</strong> One for each of the <strong>14 Revenue Districts</strong>, responsible for district-wide planning, major rural roads, higher secondary schools, and district hospital administration.
            </li>
          </ul>

          <h2>3. The Historic People's Plan Campaign (Janasoothranam)</h2>
          <p>
            Launched in August 1996, Kerala’s <em>People’s Plan Campaign</em> transformed Indian local governance by devolving 35% to 40% of the State’s developmental budget directly to local self-governments. Through ward-level citizen assemblies (<strong>Grama Sabhas</strong>), local residents identify priorities, prepare neighborhood development plans, and directly audit public spending.
          </p>

          <h2>4. Key Citizen Services Administered by Grama Panchayats</h2>
          <p>
            Grama Panchayats represent the front door of government service delivery in rural Kerala. Essential functions include:
          </p>
          <ul>
            <li><strong>Civil Registration:</strong> Issuance of Birth, Death, and Marriage Certificates under the Registration of Births and Deaths Act.</li>
            <li><strong>Digital Building Permits (K-Smart):</strong> Rapid approvals and occupancy clearances for residential and commercial constructions.</li>
            <li><strong>Property & Land Taxation (Sanchaya):</strong> Assessment, collection, and ownership transfer certifications.</li>
            <li><strong>Social Welfare Pensions (Sevana):</strong> Direct disbursement of old age, disability, agricultural worker, and widow financial security pensions.</li>
            <li><strong>Solid Waste Management:</strong> Systematic non-biodegradable waste recovery facilitated by the <strong>Haritha Karma Sena</strong> (Green Action Force) in collaboration with Suchitwa Mission.</li>
          </ul>

          <h2>5. District Administrative Profile Summary</h2>
          <p>
            Kerala spans 14 administrative revenue districts, categorized into South, Central, and North Kerala regions:
          </p>

          <div className="admin-table-wrapper" style={{ marginTop: '1rem', border: '1px solid var(--grey-300)', borderRadius: 'var(--radius-sm)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Headquarters</th>
                  <th>Grama Panchayats</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICTS.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <Link to={`/panchayats?district=${encodeURIComponent(d.name)}`} style={{ textDecoration: 'underline', fontWeight: 600 }}>
                        {d.name} ({d.malayalamName})
                      </Link>
                    </td>
                    <td>{d.headquarters}</td>
                    <td>{d.panchayatCount}</td>
                    <td>{d.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="disclaimer">6. Legal Notice and Directory Disclaimer</h2>
          <p>
            <strong>This website is an informational directory and is not an official Government of Kerala website unless formally authorized. Please verify official details with the relevant government authority.</strong>
          </p>
          <p>
            For statutory filings, legal verification of boundaries, and official gazette notifications, citizens are advised to refer directly to the Local Self Government Department portal at <a href="https://lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>lsgkerala.gov.in</a> or their designated Grama Panchayat office.
          </p>

          <h2 id="privacy">7. Privacy & Terms of Access</h2>
          <p>
            This public informational directory does not collect personal citizen identifiers, financial tokens, or track confidential individual browsing information. All geographic maps are rendered using OpenStreetMap community datasets.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/panchayats" className="btn btn-primary">
              <span>Explore Panchayat Directory</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Contact Directory Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
