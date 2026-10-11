import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  RotateCcw,
  Building2,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import PanchayatCard from '../components/PanchayatCard';
import { PANCHAYATS } from '../data/panchayats';
import { DISTRICTS, DISTRICT_PANCHAYATS, TOTAL_KERALA_PANCHAYATS, TOTAL_BLOCK_PANCHAYATS, TOTAL_DISTRICT_PANCHAYATS } from '../data/districts';
import { BLOCK_PANCHAYATS } from '../data/blocks';

export default function PanchayatDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsTopRef = useRef(null);

  // URL query params
  const activeTabParam = searchParams.get('tab') || 'grama'; // 'grama', 'block', 'district'
  const queryParam = searchParams.get('search') || '';
  const districtParam = searchParams.get('district') || 'all';
  const blockParam = searchParams.get('block') || 'all';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedDistrict, setSelectedDistrict] = useState(districtParam);
  const [selectedBlock, setSelectedBlock] = useState(blockParam);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc', 'district', 'wards'
  const [currentPage, setCurrentPage] = useState(isNaN(pageParam) || pageParam < 1 ? 1 : pageParam);
  const [pageSize, setPageSize] = useState(24);

  // Sync state when URL params change
  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'grama');
    setSearchTerm(searchParams.get('search') || '');
    setSelectedDistrict(searchParams.get('district') || 'all');
    setSelectedBlock(searchParams.get('block') || 'all');
    const p = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams]);

  // Update URL params helper
  const updateQueryParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === 'all' || (key === 'page' && val === 1) || (key === 'tab' && val === 'grama')) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    setSearchParams(nextParams);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    updateQueryParams({ tab, page: 1 });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setCurrentPage(1);
    updateQueryParams({ search: val.trim(), page: 1 });
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    setSelectedBlock('all');
    setCurrentPage(1);
    updateQueryParams({ district: val, block: 'all', page: 1 });
  };

  const handleBlockChange = (e) => {
    const val = e.target.value;
    setSelectedBlock(val);
    setCurrentPage(1);
    updateQueryParams({ block: val, page: 1 });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('all');
    setSelectedBlock('all');
    setSortOrder('asc');
    setCurrentPage(1);
    setSearchParams(activeTab !== 'grama' ? { tab: activeTab } : {});
  };

  // Available block panchayats for secondary filter
  const availableBlocks = useMemo(() => {
    if (selectedDistrict === 'all') {
      return BLOCK_PANCHAYATS;
    }
    return BLOCK_PANCHAYATS.filter(
      (b) => b.district.toLowerCase() === selectedDistrict.toLowerCase()
    );
  }, [selectedDistrict]);

  // Filter & sort Grama Panchayats
  const filteredGramaPanchayats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return PANCHAYATS.filter((p) => {
      const matchesDistrict =
        selectedDistrict === 'all' ||
        p.district.toLowerCase() === selectedDistrict.toLowerCase();

      const matchesBlock =
        selectedBlock === 'all' ||
        p.blockPanchayat.toLowerCase().includes(selectedBlock.toLowerCase());

      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        (p.malayalamName && p.malayalamName.includes(term)) ||
        p.district.toLowerCase().includes(term) ||
        p.blockPanchayat.toLowerCase().includes(term) ||
        p.pinCode.includes(term) ||
        p.officialAddress.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return matchesDistrict && matchesBlock && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === 'desc') return b.name.localeCompare(a.name);
      if (sortOrder === 'district') {
        return a.district.localeCompare(b.district) || a.name.localeCompare(b.name);
      }
      if (sortOrder === 'wards') return b.wardCount - a.wardCount;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedDistrict, selectedBlock, sortOrder]);

  // Filter Block Panchayats
  const filteredBlockPanchayats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return BLOCK_PANCHAYATS.filter((b) => {
      const matchesDistrict =
        selectedDistrict === 'all' ||
        b.district.toLowerCase() === selectedDistrict.toLowerCase();

      const matchesSearch =
        !term ||
        b.name.toLowerCase().includes(term) ||
        (b.malayalamName && b.malayalamName.includes(term)) ||
        b.headquarters.toLowerCase().includes(term) ||
        b.district.toLowerCase().includes(term);

      return matchesDistrict && matchesSearch;
    }).sort((a, b) => a.district.localeCompare(b.district) || a.name.localeCompare(b.name));
  }, [searchTerm, selectedDistrict]);

  // Filter District Panchayats
  const filteredDistrictPanchayats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return DISTRICT_PANCHAYATS.filter((dp) => {
      const matchesDistrict =
        selectedDistrict === 'all' ||
        dp.district.toLowerCase() === selectedDistrict.toLowerCase();

      const matchesSearch =
        !term ||
        dp.name.toLowerCase().includes(term) ||
        (dp.malayalamName && dp.malayalamName.includes(term)) ||
        dp.headquarters.toLowerCase().includes(term) ||
        dp.district.toLowerCase().includes(term);

      return matchesDistrict && matchesSearch;
    });
  }, [searchTerm, selectedDistrict]);

  // Grama pagination calculations
  const totalGramaItems = filteredGramaPanchayats.length;
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(totalGramaItems / pageSize) || 1;
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedGramaPanchayats = useMemo(() => {
    if (pageSize === 'all') return filteredGramaPanchayats;
    const start = (validCurrentPage - 1) * pageSize;
    return filteredGramaPanchayats.slice(start, start + pageSize);
  }, [filteredGramaPanchayats, validCurrentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateQueryParams({ page });
    if (resultsTopRef.current) {
      resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hasActiveFilters =
    searchTerm !== '' || selectedDistrict !== 'all' || selectedBlock !== 'all';

  // Generate pagination page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validCurrentPage > 3) pages.push('ellipsis-1');

      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (validCurrentPage < totalPages - 2) pages.push('ellipsis-2');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      {/* Directory Header Banner */}
      <section className="directory-header-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Building2 size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Official LSGD Registry · Government of Kerala
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Kerala Panchayat Directory
          </h1>
          <p style={{ maxWidth: '780px', color: 'var(--color-gray-700)', margin: 0 }}>
            Complete statutory directory of the three-tier Panchayati Raj system in Kerala: <strong>{TOTAL_KERALA_PANCHAYATS} Grama Panchayats</strong>, <strong>{TOTAL_BLOCK_PANCHAYATS} Block Panchayats</strong>, and <strong>{TOTAL_DISTRICT_PANCHAYATS} District Panchayats</strong> across all 14 districts.
          </p>

          {/* Three Tier Navigation Tabs */}
          <div className="tier-tabs-bar" role="tablist" aria-label="Panchayati Raj Tiers">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'grama'}
              className={`tier-tab-btn ${activeTab === 'grama' ? 'active' : ''}`}
              onClick={() => handleTabChange('grama')}
            >
              <span>Grama Panchayats</span>
              <span className="tier-tab-badge">{TOTAL_KERALA_PANCHAYATS}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'block'}
              className={`tier-tab-btn ${activeTab === 'block' ? 'active' : ''}`}
              onClick={() => handleTabChange('block')}
            >
              <span>Block Panchayats</span>
              <span className="tier-tab-badge">{TOTAL_BLOCK_PANCHAYATS}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'district'}
              className={`tier-tab-btn ${activeTab === 'district' ? 'active' : ''}`}
              onClick={() => handleTabChange('district')}
            >
              <span>District Panchayats</span>
              <span className="tier-tab-badge">{TOTAL_DISTRICT_PANCHAYATS}</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="directory-filter-bar" role="search" aria-label="Directory Filters">
            <div className="filter-controls-group">
              {/* Search text box */}
              <div className="filter-input-search">
                <input
                  type="text"
                  placeholder={
                    activeTab === 'grama'
                      ? 'Search by Panchayat, PIN, block, or ward...'
                      : activeTab === 'block'
                      ? 'Search by Block name, headquarters, or district...'
                      : 'Search by District Panchayat or headquarters...'
                  }
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
                  aria-label="Filter records"
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

              {/* Block dropdown (only relevant for Grama tab when district is selected) */}
              {activeTab === 'grama' && selectedDistrict !== 'all' && (
                <select
                  value={selectedBlock}
                  onChange={handleBlockChange}
                  className="filter-select"
                  aria-label="Filter by Block Panchayat"
                >
                  <option value="all">All Blocks in {selectedDistrict}</option>
                  {availableBlocks.map((b) => (
                    <option key={b.id} value={b.name.replace(' Block Panchayat', '')}>
                      {b.name.replace(' Block Panchayat', '')} ({b.gramaPanchayatCount} Panchayats)
                    </option>
                  ))}
                </select>
              )}

              {/* Sorting dropdown (for Grama tab) */}
              {activeTab === 'grama' && (
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="filter-select"
                  aria-label="Sort Order"
                >
                  <option value="asc">Alphabetical: A to Z</option>
                  <option value="desc">Alphabetical: Z to A</option>
                  <option value="district">Group by District</option>
                  <option value="wards">Most Electoral Wards</option>
                </select>
              )}
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
      <section className="container" style={{ paddingBottom: '4rem', paddingTop: '1rem' }} ref={resultsTopRef}>
        
        {/* ==================== TAB 1: GRAMA PANCHAYATS ==================== */}
        {activeTab === 'grama' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{totalGramaItems}</span> Grama{' '}
                {totalGramaItems === 1 ? 'Panchayat' : 'Panchayats'}
                {selectedDistrict !== 'all' && (
                  <span>
                    {' '}in <strong>{selectedDistrict}</strong> district
                  </span>
                )}
                {selectedBlock !== 'all' && (
                  <span>
                    {' '}under <strong>{selectedBlock} Block</strong>
                  </span>
                )}
                {searchTerm && (
                  <span>
                    {' '}matching "<strong>{searchTerm}</strong>"
                  </span>
                )}
                {totalGramaItems > 0 && pageSize !== 'all' && (
                  <span style={{ color: 'var(--grey-600)', marginLeft: '0.5rem' }}>
                    (Page {validCurrentPage} of {totalPages})
                  </span>
                )}
              </div>
              <span className="sample-notice-pill">
                State-wide Registry · {TOTAL_KERALA_PANCHAYATS} Grama Panchayats
              </span>
            </div>

            {/* Results Grid or Empty State */}
            {paginatedGramaPanchayats.length > 0 ? (
              <>
                <div className="panchayats-grid">
                  {paginatedGramaPanchayats.map((panchayat) => (
                    <PanchayatCard key={panchayat.id} panchayat={panchayat} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-wrapper">
                  <div className="pagination-page-size">
                    <span>Showing per page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        const val = e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10);
                        setPageSize(val);
                        setCurrentPage(1);
                      }}
                      className="filter-select"
                      style={{ padding: '0.35rem 0.65rem', minHeight: '34px', fontSize: '0.825rem' }}
                      aria-label="Items per page"
                    >
                      <option value={24}>24 Panchayats</option>
                      <option value={48}>48 Panchayats</option>
                      <option value={96}>96 Panchayats</option>
                      <option value="all">Show All ({totalGramaItems})</option>
                    </select>
                  </div>

                  {pageSize !== 'all' && totalPages > 1 && (
                    <div className="pagination-controls" aria-label="Pagination">
                      <button
                        type="button"
                        onClick={() => handlePageChange(1)}
                        disabled={validCurrentPage === 1}
                        className="pagination-btn"
                        title="First Page"
                        aria-label="First Page"
                      >
                        <ChevronsLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(validCurrentPage - 1)}
                        disabled={validCurrentPage === 1}
                        className="pagination-btn"
                        title="Previous Page"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {getPageNumbers().map((item, idx) => {
                        if (typeof item === 'string') {
                          return (
                            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                              ...
                            </span>
                          );
                        }
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handlePageChange(item)}
                            className={`pagination-btn ${item === validCurrentPage ? 'active' : ''}`}
                            aria-label={`Page ${item}`}
                            aria-current={item === validCurrentPage ? 'page' : undefined}
                          >
                            {item}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => handlePageChange(validCurrentPage + 1)}
                        disabled={validCurrentPage === totalPages}
                        className="pagination-btn"
                        title="Next Page"
                        aria-label="Next Page"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={validCurrentPage === totalPages}
                        className="pagination-btn"
                        title="Last Page"
                        aria-label="Last Page"
                      >
                        <ChevronsRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-results-box">
                <Building2 size={48} color="var(--color-gray-400)" />
                <h2 className="empty-results-title">No Panchayats found. Try another search.</h2>
                <p className="empty-results-desc">
                  We couldn't find any Grama Panchayats matching your current filters. Try modifying your keywords, selecting a different district or block, or clearing filters.
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
          </div>
        )}

        {/* ==================== TAB 2: BLOCK PANCHAYATS ==================== */}
        {activeTab === 'block' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{filteredBlockPanchayats.length}</span> of {TOTAL_BLOCK_PANCHAYATS} Block Panchayats
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
              <span className="sample-notice-pill">
                Intermediate Tier · 152 Block Panchayats
              </span>
            </div>

            {filteredBlockPanchayats.length > 0 ? (
              <div className="admin-tier-grid">
                {filteredBlockPanchayats.map((block) => (
                  <div key={block.id} className="admin-tier-card">
                    <div>
                      <div className="admin-tier-badge">
                        <span>{block.district}</span>
                      </div>
                      <h3 className="admin-tier-title">{block.name}</h3>
                      <div className="admin-tier-malayalam">{block.malayalamName}</div>

                      <div className="admin-tier-meta-list">
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Headquarters:</span>
                          <span className="admin-tier-meta-val">{block.headquarters}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Grama Panchayats:</span>
                          <span className="admin-tier-meta-val">{block.gramaPanchayatCount} Village Bodies</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Administrative Tier:</span>
                          <span className="admin-tier-meta-val">Intermediate Block</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('grama');
                        setSelectedDistrict(block.district);
                        setSelectedBlock(block.name.replace(' Block Panchayat', ''));
                        setCurrentPage(1);
                        updateQueryParams({
                          tab: 'grama',
                          district: block.district,
                          block: block.name.replace(' Block Panchayat', ''),
                          page: 1,
                        });
                      }}
                      className="btn btn-outline-dark btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>View {block.gramaPanchayatCount} Grama Panchayats</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <Building2 size={48} color="var(--color-gray-400)" />
                <h2 className="empty-results-title">No Block Panchayats found.</h2>
                <p className="empty-results-desc">
                  Try adjusting your keywords or clearing the district filter.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: DISTRICT PANCHAYATS ==================== */}
        {activeTab === 'district' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{filteredDistrictPanchayats.length}</span> of {TOTAL_DISTRICT_PANCHAYATS} District Panchayats (Jilla Panchayats)
              </div>
              <span className="sample-notice-pill">
                Apex Tier · 14 District Panchayats
              </span>
            </div>

            {filteredDistrictPanchayats.length > 0 ? (
              <div className="admin-tier-grid">
                {filteredDistrictPanchayats.map((dp) => (
                  <div key={dp.id} className="admin-tier-card">
                    <div>
                      <div className="admin-tier-badge">
                        <span>Apex Tier · {dp.district}</span>
                      </div>
                      <h3 className="admin-tier-title">{dp.name}</h3>
                      <div className="admin-tier-malayalam">{dp.malayalamName}</div>

                      <div className="admin-tier-meta-list">
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Headquarters:</span>
                          <span className="admin-tier-meta-val">{dp.headquarters}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">District Divisions:</span>
                          <span className="admin-tier-meta-val">{dp.divisionCount} Electoral Divisions</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Block Panchayats:</span>
                          <span className="admin-tier-meta-val">{dp.blockPanchayatsCount} Blocks</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Grama Panchayats:</span>
                          <span className="admin-tier-meta-val">{dp.gramaPanchayatsCount} Panchayats</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Contact:</span>
                          <span className="admin-tier-meta-val">{dp.phone}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Official Email:</span>
                          <span className="admin-tier-meta-val" style={{ fontSize: '0.75rem' }}>{dp.email}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('grama');
                        setSelectedDistrict(dp.district);
                        setSelectedBlock('all');
                        setCurrentPage(1);
                        updateQueryParams({
                          tab: 'grama',
                          district: dp.district,
                          block: 'all',
                          page: 1,
                        });
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Explore {dp.gramaPanchayatsCount} Panchayats in {dp.district}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <Building2 size={48} color="var(--color-gray-400)" />
                <h2 className="empty-results-title">No District Panchayats found.</h2>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}
