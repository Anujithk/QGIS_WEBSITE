import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function PanchayatCard({ panchayat }) {
  if (!panchayat) return null;

  return (
    <article className="panchayat-card">
      <div className="panchayat-card-header">
        <div className="panchayat-card-meta">
          <span className="district-pill">{panchayat.district}</span>
          <span className="category-tag" title={panchayat.category}>
            {panchayat.category}
          </span>
        </div>
        <h3 className="panchayat-card-title">{panchayat.name}</h3>
        <div className="panchayat-card-malayalam">{panchayat.malayalamName}</div>
      </div>

      <div className="panchayat-card-body">
        <div className="card-info-item">
          <Building2 size={15} />
          <span>
            <strong>Block:</strong> {panchayat.blockPanchayat}
          </span>
        </div>
        <div className="card-info-item">
          <MapPin size={15} />
          <span title={panchayat.officialAddress}>
            {panchayat.officialAddress.length > 70
              ? `${panchayat.officialAddress.substring(0, 70)}...`
              : panchayat.officialAddress}
          </span>
        </div>
        <div className="card-info-item">
          <Phone size={15} />
          <span>{panchayat.contactNumber || 'Contact Office Directly'}</span>
        </div>
      </div>

      <div className="panchayat-card-footer">
        <span className="card-badge-small">
          PIN: <strong>{panchayat.pinCode}</strong>
        </span>
        <Link
          to={`/panchayats/${panchayat.id}`}
          className="panchayat-card-btn"
          aria-label={`View details for ${panchayat.name}`}
        >
          <span>View Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
