import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export default function DistrictCard({ district }) {
  if (!district) return null;

  return (
    <Link
      to={`/panchayats?district=${encodeURIComponent(district.name)}`}
      className="district-card"
      aria-label={`Explore ${district.name} district, ${district.panchayatCount} Panchayats`}
    >
      <div className="district-card-content">
        <h4 className="district-card-title">{district.name}</h4>
        <div className="district-card-malayalam">{district.malayalamName}</div>
        <div className="district-card-count">
          <span>{district.panchayatCount} Grama Panchayats</span>
        </div>
      </div>
      <div className="district-card-arrow">
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}
