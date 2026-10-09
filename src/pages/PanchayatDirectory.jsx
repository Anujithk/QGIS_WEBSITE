import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, Building2, CheckCircle2 } from 'lucide-react';
import PanchayatCard from '../components/PanchayatCard';
import { PANCHAYATS } from '../data/panchayats';
import { DISTRICTS } from '../data/districts';

export default function PanchayatDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params from URL
  const queryParam = searchParams.get('search') || '';
  const districtParam = searchParams.get('district') || 'all';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedDistrict, setSelectedDistrict] = useState(districtParam);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' (A-Z), 'desc' (Z-A), 'district'

  // Synchronize state with URL parameters
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedDistrict(searchParams.get('district') || 'all');
  }, [searchParams]);

  const updateFilters = (newSearch, newDistrict) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newDistrict && newDistrict !== 'all') params.set('district', newDistrict);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateFilters(val.trim(), selectedDistrict);
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    updateFilters(searchTerm.trim(), val);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('all');
    setSortOrder('asc');
    setSearchParams({});
  };

  // Filter and sort Panchayats
  const filteredPanchayats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return PANCHAYATS.filter((p) => {
      // District match
      const matchesDistrict =
        selectedDistrict === 'all' ||
        p.district.toLowerCase() === selectedDistrict.toLowerCase();

      // Search match
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.district.toLowerCase().includes(term) ||
        p.blockPanchayat.toLowerCase().includes(term) ||
        p.officialAddress.toLowerCase().includes(term) ||
        p.pinCode.includes(term) ||
        p.category.toLowerCase().includes(term);

      return matchesDistrict && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === 'district') {
        return a.district.localeCompare(b.district) || a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedDistrict, sortOrder]);

  const hasActiveFilters = searchTerm !== '' || selectedDistrict !== 'all';

  return (
    <div>
      {/* Directory Header Banner */}
      <section className="directory-header-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Building2 size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Official LSGD Registry
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Kerala Grama Panchayat Directory
          </h1>
          <p style={{ maxWidth: '720px', color: 'var(--color-gray-700)', margin: 0 }}>
            Search, filter, and inspect Grama Panchayats across Kerala. Access verified administrative divisions, village office locations, coordinates, and local public services.
          </p>

          {/* Filter Bar */}
          <div className="directory-filter-bar" role="search" aria-label="Directory Filters">
            <div className="filter-controls-group">
              {/* Search text box */}
              <div className="filter-input-search">
                <input
                  type="text"
                  placeholder="Search by name, PIN, block, or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.65rem 1rem 0.65rem 2.4rem',
                    fontSize: '0.9rem',
                    width: '100%',
                    backgroundColor: 'var(--color-white)',
                  }}
                  aria-label="Filter Panchayats by search text"
                />
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-gray-500)',
                  }}
                />
              </div>

              {/* District dropdown */}
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="filter-select"
                aria-label="Filter by District"
              >
                <option value="all">All 14 Districts</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.panchayatCount} Panchayats)
                  </option>
                ))}
              </select>

              {/* Sorting dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
                aria-label="Sort Order"
              >
                <option value="asc">Alphabetical: A to Z</option>
                <option value="desc">Alphabetical: Z to A</option>
                <option value="district">Group by District</option>
              </select>
            </div>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                aria-label="Reset all search filters"
              >
                <RotateCcw size={14} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Directory Listings */}
      <section className="container" style={{ paddingBottom: '4rem', paddingTop: '1rem' }}>
        <div className="filter-results-status">
          <div>
            Showing <span className="results-count-bold">{filteredPanchayats.length}</span> Grama{' '}
            {filteredPanchayats.length === 1 ? 'Panchayat' : 'Panchayats'}
            {selectedDistrict !== 'all' && (
              <span>
                {' '}in <strong>{selectedDistrict}</strong> district
              </span>
            )}
            {searchTerm && (
              <span>
                {' '}matching "<strong>{searchTerm}</strong>"
              </span>
            )}
          </div>
          <span className="sample-notice-pill">Local Sample Dataset ({PANCHAYATS.length} total)</span>
        </div>

        {/* Results Grid or Empty State */}
        {filteredPanchayats.length > 0 ? (
          <div className="panchayats-grid">
            {filteredPanchayats.map((panchayat) => (
              <PanchayatCard key={panchayat.id} panchayat={panchayat} />
            ))}
          </div>
        ) : (
          <div className="empty-results-box">
            <Building2 size={48} color="var(--color-gray-400)" />
            <h2 className="empty-results-title">No Panchayats found. Try another search.</h2>
            <p className="empty-results-desc">
              We couldn't find any Grama Panchayats matching your current search criteria. Try modifying your keywords, selecting a different district, or clearing filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-primary btn-sm"
            >
              <RotateCcw size={14} />
              <span>Reset Search and Show All</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
