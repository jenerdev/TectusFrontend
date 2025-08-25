'use client';

import { useEffect, useRef } from 'react';
import './GoogleMap.scss';
import { useBEM } from '@tectus/hooks';

export function GoogleMap() {
	const { B } = useBEM('google-map');
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if window.google is loaded
    if (typeof window !== 'undefined' && (window as any).google) {
      const google = (window as any).google;

      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: 14.5995, lng: 120.9842 }, // Manila as example
        zoom: 12,
      });

      // Example marker
      new google.maps.Marker({
        position: { lat: 14.5995, lng: 120.9842 },
        map,
        title: 'Hello Manila!',
      });
    }
  }, []);

  return (
    <div
      className={B()}
      ref={mapRef}
    />
  );
}
