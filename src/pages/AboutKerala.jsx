import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Shield, Layers, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { DISTRICTS, TOTAL_KERALA_PANCHAYATS, TOTAL_BLOCK_PANCHAYATS, DISTRICT_PANCHAYATS } from '../data/districts';

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

          <div className="admin-table-wrapper" style={{ marginTop: '1rem', border: '1px solid var(--grey-300)', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>District</th>
                  <th>Headquarters</th>
                  <th style={{ textAlign: 'right' }}>Grama Panchayats</th>
                  <th style={{ textAlign: 'right' }}>Block Panchayats</th>
                  <th style={{ textAlign: 'right' }}>Municipalities</th>
                  <th style={{ textAlign: 'right' }}>Corporations</th>
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
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{d.panchayatCount}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{d.blockCount}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>
                      <Link to={`/panchayats?tab=municipality&district=${encodeURIComponent(d.name)}`} style={{ textDecoration: 'underline' }}>
                        {d.municipalityCount}
                      </Link>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>
                      {d.corporationCount > 0 ? (
                        <Link to={`/panchayats?tab=corporation&district=${encodeURIComponent(d.name)}`} style={{ textDecoration: 'underline', fontWeight: 800 }}>
                          {d.corporationCount}
                        </Link>
                      ) : (
                        <span style={{ color: 'var(--grey-400)' }}>—</span>
                      )}
                    </td>
                    <td>{d.region}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: 'var(--grey-100)', fontWeight: 800, borderTop: '2px solid var(--grey-400)' }}>
                  <td>Total (14 Districts)</td>
                  <td>State-wide LSGD</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>{TOTAL_KERALA_PANCHAYATS}</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>{TOTAL_BLOCK_PANCHAYATS}</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>87</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>6</td>
                  <td>1,200 Total LSGIs</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 750 }}>
            Apex Rural Tier: The 14 District Panchayats (Jilla Panchayats)
          </h3>
          <p>
            The apex rural district tier comprises 14 statutory District Panchayats coordinating rural infrastructure, higher secondary education, and district hospitals:
          </p>

          <div className="admin-table-wrapper" style={{ marginTop: '1rem', border: '1px solid var(--grey-300)', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>District Panchayat</th>
                  <th>Headquarters</th>
                  <th style={{ textAlign: 'right' }}>Divisions</th>
                  <th style={{ textAlign: 'right' }}>Block Panchayats</th>
                  <th style={{ textAlign: 'right' }}>Grama Panchayats</th>
                  <th>Official Contact</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICT_PANCHAYATS.map((dp) => (
                  <tr key={dp.id}>
                    <td>
                      <strong>{dp.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--grey-600)' }}>{dp.malayalamName}</div>
                    </td>
                    <td>{dp.headquarters}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{dp.divisionCount}</td>
                    <td style={{ textAlign: 'right' }}>{dp.blockPanchayatsCount}</td>
                    <td style={{ textAlign: 'right' }}>{dp.gramaPanchayatsCount}</td>
                    <td style={{ fontSize: '0.825rem' }}>
                      <div>{dp.phone}</div>
                      <div style={{ color: 'var(--grey-600)' }}>{dp.email}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 750 }}>
            Urban Local Governance: The 6 Municipal Corporations & 87 Municipalities
          </h3>
          <p>
            Under the <strong>Kerala Municipality Act, 1994</strong> (enacted as per the 74th Constitutional Amendment), urban administration is overseen by the Department of Urban Affairs. Kerala comprises <strong>6 Municipal Corporations</strong> (metropolitan cities) and <strong>87 Municipalities</strong> (classified into Grade 1, Grade 2, and Grade 3).
          </p>

          {/* Corporations Table */}
          <div className="admin-table-wrapper" style={{ marginTop: '1rem', border: '1px solid var(--grey-300)', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Municipal Corporation</th>
                  <th>District</th>
                  <th style={{ textAlign: 'right' }}>Est. Year</th>
                  <th style={{ textAlign: 'right' }}>Divisions</th>
                  <th style={{ textAlign: 'right' }}>Population</th>
                  <th style={{ textAlign: 'right' }}>Area (km²)</th>
                  <th>Headquarters</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'thiruvananthapuram-corp', name: 'Thiruvananthapuram Corporation', mal: 'തിരുവനന്തപുരം', dist: 'Thiruvananthapuram', yr: 1940, w: 101, pop: '9,55,494', area: '214.86', hq: 'Vikas Bhavan, Thiruvananthapuram' },
                  { id: 'kozhikode-corp', name: 'Kozhikode Municipal Corporation', mal: 'കോഴിക്കോട്', dist: 'Kozhikode', yr: 1962, w: 76, pop: '6,09,214', area: '118.31', hq: 'Beach Road, Kozhikode' },
                  { id: 'kochi-corp', name: 'Kochi Municipal Corporation', mal: 'കൊച്ചി', dist: 'Ernakulam', yr: 1967, w: 76, pop: '6,77,381', area: '94.88', hq: 'Marine Drive, Kochi' },
                  { id: 'kollam-corp', name: 'Kollam Municipal Corporation', mal: 'കൊല്ലം', dist: 'Kollam', yr: 2000, w: 56, pop: '3,88,288', area: '73.03', hq: 'Cantonment, Kollam' },
                  { id: 'thrissur-corp', name: 'Thrissur Municipal Corporation', mal: 'തൃശ്ശൂർ', dist: 'Thrissur', yr: 2000, w: 56, pop: '3,15,596', area: '101.42', hq: 'M.O. Road, Thrissur' },
                  { id: 'kannur-corp', name: 'Kannur Municipal Corporation', mal: 'കണ്ണൂർ', dist: 'Kannur', yr: 2015, w: 56, pop: '2,32,486', area: '78.35', hq: 'Thalap, Kannur' },
                ].map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link to={`/panchayats/${c.id}`} style={{ textDecoration: 'underline', fontWeight: 700 }}>
                        {c.name}
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: 'var(--grey-600)' }}>{c.mal}</div>
                    </td>
                    <td>{c.dist}</td>
                    <td style={{ textAlign: 'right' }}>{c.yr}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{c.w}</td>
                    <td style={{ textAlign: 'right' }}>{c.pop}</td>
                    <td style={{ textAlign: 'right' }}>{c.area}</td>
                    <td style={{ fontSize: '0.825rem' }}>{c.hq}</td>
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
