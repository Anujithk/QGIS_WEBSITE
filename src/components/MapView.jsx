import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, ExternalLink, MapPin, CheckCircle } from 'lucide-react';

export default function MapView({ panchayat }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const { lat, lng } = panchayat.coordinates || { lat: 10.8505, lng: 76.2711 };
  const hasCoordinates = Boolean(panchayat.coordinates && lat && lng);

  useEffect(() => {
    if (!mapContainerRef.current || !hasCoordinates) return;

    // Clean up any existing map instance on re-render / route change
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: false, // Prevents unintended scrolling when browsing page
    });

    mapInstanceRef.current = map;

    // Standard OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom Black & White Map Marker Pin
    const customIcon = L.divIcon({
      className: 'panchayat-map-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #000000;
          color: #ffffff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
          cursor: pointer;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: #ffffff;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add marker and popup
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker
      .bindPopup(
        `<div style="font-family: sans-serif; font-size: 13px; line-height: 1.4; padding: 4px;">
          <strong style="color: #000000; font-size: 14px; display: block; margin-bottom: 2px;">${panchayat.name}</strong>
          <span style="color: #555555; display: block; margin-bottom: 4px;">${panchayat.malayalamName || ''}</span>
          <span style="color: #222222; font-size: 12px; display: block;">${panchayat.officialAddress}</span>
        </div>`
      )
      .openPopup();

    // Trigger map resize check
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, hasCoordinates, panchayat.name, panchayat.malayalamName, panchayat.officialAddress]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const largerMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <div className="map-view-container">
      <div className="map-view-header">
        <div className="map-coordinates-pill">
          <MapPin size={14} />
          <span>
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </span>
        </div>

        <div className="map-header-actions">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label="Get Directions to Panchayat Office"
          >
            <Navigation size={13} />
            <span>Get Directions</span>
          </a>
          <a
            href={largerMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            aria-label="View Larger Map on OpenStreetMap"
          >
            <ExternalLink size={13} />
            <span>View Larger Map</span>
          </a>
        </div>
      </div>

      <div
        ref={mapContainerRef}
        className="map-leaflet-box"
        role="region"
        aria-label={`Interactive map showing location of ${panchayat.name}`}
      />

      <div className="map-view-footer">
        <div className="map-verified-tag">
          <CheckCircle size={15} />
          <span>Verified GPS Coordinates (Grama Panchayat Office)</span>
        </div>
        <div>Data © OpenStreetMap contributors</div>
      </div>
    </div>
  );
}
