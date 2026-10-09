import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { PANCHAYATS } from '../data/panchayats';

export default function SearchBar({
  placeholder = 'Search by Panchayat name, district, or location...',
  initialQuery = '',
  onSearchSubmit,
  autoFocus = false,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Sync initial query if passed as prop
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Compute suggestions (up to 6)
  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed.length > 0
    ? PANCHAYATS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.district.toLowerCase().includes(trimmed) ||
          p.locationDescription.toLowerCase().includes(trimmed) ||
          p.officialAddress.toLowerCase().includes(trimmed) ||
          p.pinCode.includes(trimmed) ||
          p.blockPanchayat.toLowerCase().includes(trimmed)
        );
      }).slice(0, 6)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      navigate(`/panchayats/${suggestions[selectedIndex].id}`);
      return;
    }

    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    } else {
      const targetQuery = query.trim();
      navigate(targetQuery ? `/panchayats?search=${encodeURIComponent(targetQuery)}` : '/panchayats');
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="search-input-group" role="search">
        <label htmlFor="panchayat-search-input" className="sr-only">
          Search Panchayats
        </label>
        <span className="search-icon-left">
          <Search size={20} />
        </span>
        <input
          id="panchayat-search-input"
          type="text"
          className="search-input"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (trimmed.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          autoFocus={autoFocus}
        />

        <div className="search-actions-right">
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search input"
            >
              <X size={15} />
            </button>
          )}
          <button type="submit" className="search-submit-btn">
            <span>Search</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </form>

      {/* Real-time suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="search-suggestions-dropdown" role="listbox">
          <div className="suggestions-header">
            <span>Matching Grama Panchayats</span>
            <span>{suggestions.length} Results</span>
          </div>
          {suggestions.map((p, index) => (
            <div
              key={p.id}
              role="option"
              aria-selected={selectedIndex === index}
              className={`suggestion-item ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => {
                setIsOpen(false);
                navigate(`/panchayats/${p.id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="suggestion-info">
                <div className="suggestion-name">{p.name}</div>
                <div className="suggestion-details">
                  <span style={{ color: 'var(--color-gray-600)' }}>{p.malayalamName}</span>
                  <span>•</span>
                  <span>{p.blockPanchayat}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="suggestion-badge">{p.district}</span>
                <ArrowRight size={14} color="var(--color-gray-600)" />
              </div>
            </div>
          ))}

          <div
            className="suggestion-view-all"
            onClick={handleSubmit}
            style={{ cursor: 'pointer' }}
          >
            <span>View all results for "{query.trim()}" in directory</span>
            <ArrowRight size={14} />
          </div>
        </div>
      )}
    </div>
  );
}
