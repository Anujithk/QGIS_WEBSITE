import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  RotateCcw,
  Building2,
  Building,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import PanchayatCard from '../components/PanchayatCard';
import { PANCHAYATS } from '../data/panchayats';
import {
  DISTRICTS,
  DISTRICT_PANCHAYATS,
  TOTAL_KERALA_PANCHAYATS,
  TOTAL_BLOCK_PANCHAYATS,
  TOTAL_DISTRICT_PANCHAYATS,
  TOTAL_MUNICIPALITIES,
  TOTAL_CORPORATIONS,
  TOTAL_URBAN_BODIES
} from '../data/districts';
import { BLOCK_PANCHAYATS } from '../data/blocks';
import { CORPORATIONS, MUNICIPALITIES } from '../data/urban';

export default function PanchayatDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsTopRef = useRef(null);

  // URL query params
  const activeTabParam = searchParams.get('tab') || 'grama'; // 'grama', 'block', 'district', 'municipality', 'corporation'
  const queryParam = searchParams.get('search') || '';
  const districtParam = searchParams.get('district') || 'all';
  const blockParam = searchParams.get('block') || 'all';
  const gradeParam = searchParams.get('grade') || 'all';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedDistrict, setSelectedDistrict] = useState(districtParam);
  const [selectedBlock, setSelectedBlock] = useState(blockParam);
  const [selectedGrade, setSelectedGrade] = useState(gradeParam);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc', 'district', 'wards', 'pop', 'area'
  const [currentPage, setCurrentPage] = useState(isNaN(pageParam) || pageParam < 1 ? 1 : pageParam);
  const [pageSize, setPageSize] = useState(24);

  // Sync state when URL params change
  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'grama');
    setSearchTerm(searchParams.get('search') || '');
    setSelectedDistrict(searchParams.get('district') || 'all');
    setSelectedBlock(searchParams.get('block') || 'all');
    setSelectedGrade(searchParams.get('grade') || 'all');
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

  const handleGradeChange = (e) => {
    const val = e.target.value;
    setSelectedGrade(val);
    setCurrentPage(1);
    updateQueryParams({ grade: val, page: 1 });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('all');
    setSelectedBlock('all');
    setSelectedGrade('all');
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

  // Filter & sort Grama Panchayats (941)
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

  // Filter Block Panchayats (152)
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

  // Filter District Panchayats (14)
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

  // Filter Municipalities (87)
  const filteredMunicipalities = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return MUNICIPALITIES.filter((m) => {
      const matchesDistrict =
        selectedDistrict === 'all' ||
        m.district.toLowerCase() === selectedDistrict.toLowerCase();

      const matchesGrade =
        selectedGrade === 'all' || m.grade === selectedGrade;

      const matchesSearch =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.shortName.toLowerCase().includes(term) ||
        (m.malayalamName && m.malayalamName.includes(term)) ||
        m.district.toLowerCase().includes(term) ||
        m.headquarters.toLowerCase().includes(term) ||
        m.pinCode.includes(term) ||
        m.grade.toLowerCase().includes(term);

      return matchesDistrict && matchesGrade && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === 'desc') return b.name.localeCompare(a.name);
      if (sortOrder === 'district') {
        return a.district.localeCompare(b.district) || a.name.localeCompare(b.name);
      }
      if (sortOrder === 'wards') return b.wardCount - a.wardCount;
      if (sortOrder === 'pop') {
        const popA = a.populationRaw || parseInt(String(a.population).replace(/,/g, ''), 10) || 0;
        const popB = b.populationRaw || parseInt(String(b.population).replace(/,/g, ''), 10) || 0;
        return popB - popA;
      }
      if (sortOrder === 'area') return b.areaSqKm - a.areaSqKm;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedDistrict, selectedGrade, sortOrder]);

  // Filter Corporations (6)
  const filteredCorporations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return CORPORATIONS.filter((c) => {
      const matchesDistrict =
        selectedDistrict === 'all' ||
        c.district.toLowerCase() === selectedDistrict.toLowerCase();

      const matchesSearch =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.shortName.toLowerCase().includes(term) ||
        (c.malayalamName && c.malayalamName.includes(term)) ||
        c.district.toLowerCase().includes(term) ||
        c.headquarters.toLowerCase().includes(term);

      return matchesDistrict && matchesSearch;
    }).sort((a, b) => b.population - a.population);
  }, [searchTerm, selectedDistrict]);

  // Pagination for Grama Panchayats
  const totalGramaItems = filteredGramaPanchayats.length;
  const totalGramaPages = pageSize === 'all' ? 1 : Math.ceil(totalGramaItems / pageSize) || 1;
  const validGramaPage = Math.min(Math.max(currentPage, 1), totalGramaPages);

  const paginatedGramaPanchayats = useMemo(() => {
    if (pageSize === 'all') return filteredGramaPanchayats;
    const start = (validGramaPage - 1) * pageSize;
    return filteredGramaPanchayats.slice(start, start + pageSize);
  }, [filteredGramaPanchayats, validGramaPage, pageSize]);

  // Pagination for Municipalities
  const totalMunItems = filteredMunicipalities.length;
  const totalMunPages = pageSize === 'all' ? 1 : Math.ceil(totalMunItems / pageSize) || 1;
  const validMunPage = Math.min(Math.max(currentPage, 1), totalMunPages);

  const paginatedMunicipalities = useMemo(() => {
    if (pageSize === 'all') return filteredMunicipalities;
    const start = (validMunPage - 1) * pageSize;
    return filteredMunicipalities.slice(start, start + pageSize);
  }, [filteredMunicipalities, validMunPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateQueryParams({ page });
    if (resultsTopRef.current) {
      resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedDistrict !== 'all' ||
    selectedBlock !== 'all' ||
    selectedGrade !== 'all';

  // Smart ellipsis page numbers
  const getPageNumbers = (totalP, currentP) => {
    const pages = [];
    if (totalP <= 7) {
      for (let i = 1; i <= totalP; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentP > 3) pages.push('ellipsis-1');

      const start = Math.max(2, currentP - 1);
      const end = Math.min(totalP - 1, currentP + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentP < totalP - 2) pages.push('ellipsis-2');
      pages.push(totalP);
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
            Kerala Local Bodies Directory
          </h1>
          <p style={{ maxWidth: '820px', color: 'var(--color-gray-700)', margin: 0 }}>
            Complete statutory directory of all rural and urban local self-government institutions in Kerala: <strong>{TOTAL_KERALA_PANCHAYATS} Grama Panchayats</strong>, <strong>{TOTAL_BLOCK_PANCHAYATS} Block Panchayats</strong>, <strong>{TOTAL_DISTRICT_PANCHAYATS} District Panchayats</strong>, <strong>{TOTAL_MUNICIPALITIES} Municipalities</strong>, and <strong>{TOTAL_CORPORATIONS} Municipal Corporations</strong>.
          </p>

          {/* Five Administrative Tier Tabs */}
          <div className="tier-tabs-bar" role="tablist" aria-label="Administrative Tiers">
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
              aria-selected={activeTab === 'municipality'}
              className={`tier-tab-btn ${activeTab === 'municipality' ? 'active' : ''}`}
              onClick={() => handleTabChange('municipality')}
            >
              <span>Municipalities</span>
              <span className="tier-tab-badge">{TOTAL_MUNICIPALITIES}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'corporation'}
              className={`tier-tab-btn ${activeTab === 'corporation' ? 'active' : ''}`}
              onClick={() => handleTabChange('corporation')}
            >
              <span>Corporations</span>
              <span className="tier-tab-badge">{TOTAL_CORPORATIONS}</span>
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
                      : activeTab === 'municipality'
                      ? 'Search by Municipality, PIN, grade, or district...'
                      : activeTab === 'corporation'
                      ? 'Search by Corporation city, district, or HQ...'
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
                    {d.name} ({d.panchayatCount} GP · {d.municipalityCount} Mun{d.corporationCount ? ` · ${d.corporationCount} Corp` : ''})
                  </option>
                ))}
              </select>

              {/* Block dropdown (only for Grama tab) */}
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

              {/* Municipality Grade filter */}
              {activeTab === 'municipality' && (
                <select
                  value={selectedGrade}
                  onChange={handleGradeChange}
                  className="filter-select"
                  aria-label="Filter by Grade"
                >
                  <option value="all">All Municipality Grades</option>
                  <option value="Grade 1">Grade 1 Municipalities</option>
                  <option value="Grade 2">Grade 2 Municipalities</option>
                  <option value="Grade 3">Grade 3 Municipalities</option>
                </select>
              )}

              {/* Sorting dropdown */}
              {(activeTab === 'grama' || activeTab === 'municipality') && (
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
                  {activeTab === 'municipality' && (
                    <>
                      <option value="pop">Highest Population</option>
                      <option value="area">Largest Area (km²)</option>
                    </>
                  )}
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
                    (Page {validGramaPage} of {totalGramaPages})
                  </span>
                )}
              </div>
              <span className="sample-notice-pill">
                Village Tier · {TOTAL_KERALA_PANCHAYATS} Grama Panchayats
              </span>
            </div>

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

                  {pageSize !== 'all' && totalGramaPages > 1 && (
                    <div className="pagination-controls" aria-label="Pagination">
                      <button
                        type="button"
                        onClick={() => handlePageChange(1)}
                        disabled={validGramaPage === 1}
                        className="pagination-btn"
                        title="First Page"
                        aria-label="First Page"
                      >
                        <ChevronsLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(validGramaPage - 1)}
                        disabled={validGramaPage === 1}
                        className="pagination-btn"
                        title="Previous Page"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {getPageNumbers(totalGramaPages, validGramaPage).map((item, idx) => {
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
                            className={`pagination-btn ${item === validGramaPage ? 'active' : ''}`}
                            aria-label={`Page ${item}`}
                            aria-current={item === validGramaPage ? 'page' : undefined}
                          >
                            {item}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => handlePageChange(validGramaPage + 1)}
                        disabled={validGramaPage === totalGramaPages}
                        className="pagination-btn"
                        title="Next Page"
                        aria-label="Next Page"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(totalGramaPages)}
                        disabled={validGramaPage === totalGramaPages}
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

        {/* ==================== TAB 2: MUNICIPALITIES ==================== */}
        {activeTab === 'municipality' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{totalMunItems}</span> of {TOTAL_MUNICIPALITIES} Municipalities
                {selectedDistrict !== 'all' && (
                  <span>
                    {' '}in <strong>{selectedDistrict}</strong> district
                  </span>
                )}
                {selectedGrade !== 'all' && (
                  <span>
                    {' '}(<strong>{selectedGrade}</strong>)
                  </span>
                )}
                {searchTerm && (
                  <span>
                    {' '}matching "<strong>{searchTerm}</strong>"
                  </span>
                )}
                {totalMunItems > 0 && pageSize !== 'all' && (
                  <span style={{ color: 'var(--grey-600)', marginLeft: '0.5rem' }}>
                    (Page {validMunPage} of {totalMunPages})
                  </span>
                )}
              </div>
              <span className="sample-notice-pill">
                Urban Local Bodies · {TOTAL_MUNICIPALITIES} Municipalities
              </span>
            </div>

            {paginatedMunicipalities.length > 0 ? (
              <>
                <div className="admin-tier-grid">
                  {paginatedMunicipalities.map((mun) => (
                    <div key={mun.id} className="admin-tier-card">
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span className="admin-tier-badge">{mun.district}</span>
                          <span className="badge badge-dark" style={{ fontSize: '0.7rem' }}>{mun.grade}</span>
                        </div>
                        <h3 className="admin-tier-title">
                          <Link to={`/panchayats/${mun.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {mun.name}
                          </Link>
                        </h3>
                        <div className="admin-tier-malayalam">{mun.malayalamName}</div>

                        <div className="admin-tier-meta-list">
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Headquarters:</span>
                            <span className="admin-tier-meta-val">{mun.headquarters} (PIN: {mun.pinCode})</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Electoral Wards:</span>
                            <span className="admin-tier-meta-val">{mun.wardCount} Wards</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Population (Census):</span>
                            <span className="admin-tier-meta-val">{mun.population.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Geographic Area:</span>
                            <span className="admin-tier-meta-val">{mun.areaSqKm} km²</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Formation Year:</span>
                            <span className="admin-tier-meta-val">{mun.formationYear || 'Historic'}</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Contact Phone:</span>
                            <span className="admin-tier-meta-val">{mun.phone}</span>
                          </div>
                          <div className="admin-tier-meta-item">
                            <span className="admin-tier-meta-label">Email:</span>
                            <span className="admin-tier-meta-val" style={{ fontSize: '0.725rem' }}>{mun.email}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <Link
                          to={`/panchayats/${mun.id}`}
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </Link>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${mun.coordinates.lat},${mun.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark btn-sm"
                          style={{ justifyContent: 'center', padding: '0.4rem 0.65rem' }}
                          title="Directions to Municipal Office"
                          aria-label="Directions to Municipal Office"
                        >
                          <MapPin size={13} />
                        </a>
                      </div>
                    </div>
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
                      <option value={24}>24 Municipalities</option>
                      <option value={48}>48 Municipalities</option>
                      <option value="all">Show All ({totalMunItems})</option>
                    </select>
                  </div>

                  {pageSize !== 'all' && totalMunPages > 1 && (
                    <div className="pagination-controls" aria-label="Pagination">
                      <button
                        type="button"
                        onClick={() => handlePageChange(1)}
                        disabled={validMunPage === 1}
                        className="pagination-btn"
                        title="First Page"
                      >
                        <ChevronsLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(validMunPage - 1)}
                        disabled={validMunPage === 1}
                        className="pagination-btn"
                        title="Previous Page"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {getPageNumbers(totalMunPages, validMunPage).map((item, idx) => {
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
                            className={`pagination-btn ${item === validMunPage ? 'active' : ''}`}
                          >
                            {item}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => handlePageChange(validMunPage + 1)}
                        disabled={validMunPage === totalMunPages}
                        className="pagination-btn"
                        title="Next Page"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePageChange(totalMunPages)}
                        disabled={validMunPage === totalMunPages}
                        className="pagination-btn"
                        title="Last Page"
                      >
                        <ChevronsRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-results-box">
                <Building size={48} color="var(--color-gray-400)" />
                <h2 className="empty-results-title">No Municipalities found.</h2>
                <p className="empty-results-desc">
                  Try clearing your search keyword, selecting a different district, or resetting grade filters.
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

        {/* ==================== TAB 3: CORPORATIONS ==================== */}
        {activeTab === 'corporation' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{filteredCorporations.length}</span> of {TOTAL_CORPORATIONS} Municipal Corporations
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
                Metropolitan Tier · {TOTAL_CORPORATIONS} Municipal Corporations
              </span>
            </div>

            {filteredCorporations.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                {filteredCorporations.map((corp) => (
                  <div
                    key={corp.id}
                    className="admin-tier-card"
                    style={{ borderTop: '4px solid var(--grey-950)' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className="badge badge-dark">Municipal Corporation</span>
                        <span className="admin-tier-badge">{corp.district} District</span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.35rem 0 0.15rem 0', color: 'var(--grey-950)' }}>
                        <Link to={`/panchayats/${corp.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {corp.name}
                        </Link>
                      </h3>
                      <div className="admin-tier-malayalam" style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {corp.malayalamName}
                      </div>

                      <p style={{ fontSize: '0.875rem', color: 'var(--grey-700)', margin: '0.75rem 0', lineHeight: 1.5 }}>
                        {corp.description}
                      </p>

                      <div className="admin-tier-meta-list">
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Headquarters:</span>
                          <span className="admin-tier-meta-val">{corp.headquarters} (PIN: {corp.pinCode})</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Electoral Wards:</span>
                          <span className="admin-tier-meta-val" style={{ fontWeight: 800 }}>{corp.wardCount} Divisions</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Population (Census):</span>
                          <span className="admin-tier-meta-val">{corp.population.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Geographic Area:</span>
                          <span className="admin-tier-meta-val">{corp.areaSqKm} km² ({corp.densityPerSqKm}/km²)</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Year of Establishment:</span>
                          <span className="admin-tier-meta-val">{corp.formationYear}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Office Phone:</span>
                          <span className="admin-tier-meta-val">{corp.phone}</span>
                        </div>
                        <div className="admin-tier-meta-item">
                          <span className="admin-tier-meta-label">Official Email:</span>
                          <span className="admin-tier-meta-val" style={{ fontSize: '0.725rem' }}>{corp.email}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--grey-150)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey-600)', letterSpacing: '0.04em' }}>
                          Key Urban Portals & Missions
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                          {corp.services.slice(0, 4).map((s, idx) => (
                            <span key={idx} className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <Link
                        to={`/panchayats/${corp.id}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </Link>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${corp.coordinates.lat},${corp.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-dark btn-sm"
                        style={{ justifyContent: 'center', padding: '0.4rem 0.65rem' }}
                        title="Navigate to Municipal Corporation"
                      >
                        <MapPin size={13} />
                      </a>
                      {corp.website && (
                        <a
                          href={corp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ justifyContent: 'center', padding: '0.4rem 0.65rem' }}
                          title="Official Corporation Portal"
                        >
                          <ExternalLink size={13} />
                          <span>Portal</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <Building2 size={48} color="var(--color-gray-400)" />
                <h2 className="empty-results-title">No Municipal Corporations found.</h2>
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

        {/* ==================== TAB 4: BLOCK PANCHAYATS ==================== */}
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
                Intermediate Tier · {TOTAL_BLOCK_PANCHAYATS} Block Panchayats
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

        {/* ==================== TAB 5: DISTRICT PANCHAYATS ==================== */}
        {activeTab === 'district' && (
          <div>
            <div className="filter-results-status">
              <div>
                Showing <span className="results-count-bold">{filteredDistrictPanchayats.length}</span> of {TOTAL_DISTRICT_PANCHAYATS} District Panchayats (Jilla Panchayats)
              </div>
              <span className="sample-notice-pill">
                Apex Rural Tier · {TOTAL_DISTRICT_PANCHAYATS} District Panchayats
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
