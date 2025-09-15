'use client';

import { useEffect, useRef } from 'react';
import './GoogleMap.scss';
import { useBEM } from '@tectus/hooks';

export type PinColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'orange';

const pinImageLocation = 'http://maps.google.com/mapfiles/ms/icons/';

export const PinIcons: Record<PinColor, string> = {
  red: `${pinImageLocation}red-dot.png`,
  blue: `${pinImageLocation}blue-dot.png`,
  green: `${pinImageLocation}green-dot.png`,
  yellow: `${pinImageLocation}yellow-dot.png`,
  purple: `${pinImageLocation}purple-dot.png`,
  pink: `${pinImageLocation}pink-dot.png`,
  orange: `${pinImageLocation}orange-dot.png`,
};

interface Location {
  lat: number;
  lng: number;
  title?: string;
  pinColor?: PinColor;
}

interface GoogleMapProps {
  height?: string;
  heightTabletLg?: string;
  locations?: Location[]; // multiple markers
}

export function GoogleMap({
  height = '27.5rem',
  heightTabletLg = '37.5rem',
  locations = [],
}: GoogleMapProps) {
  const { B } = useBEM('google-map');
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).google) {
      const google = (window as any).google;

      const map = new google.maps.Map(mapRef.current!, {
        center: locations[0] || { lat: 14.5995, lng: 120.9842 },
        zoom: 12,
      });

      const bounds = new google.maps.LatLngBounds();

      locations.forEach((loc) => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.title || '',
          icon: {
            url: PinIcons[loc.pinColor || 'red'],
          }
        });
        bounds.extend({ lat: loc.lat, lng: loc.lng });
      });

      if (locations.length > 1) {
        map.fitBounds(bounds); // adjust view to fit all markers
      }
    }
  }, [locations]);

  return (
    <div
      className={B()}
      ref={mapRef}
      style={
        {
          '--google-map-height': height,
          '--google-map-height-tablet-lg': heightTabletLg,
        } as React.CSSProperties
      }
    />
  );
}


// 'use client';

// import { useEffect, useRef } from 'react';
// import './GoogleMap.scss';
// import { useBEM } from '@tectus/hooks';

// interface GoogleMapProps {
//   height?: string;
//   heightTabletLg?: string;
// }

// export function GoogleMap({ height = '27.5rem', heightTabletLg = '37.5rem' }: GoogleMapProps) {
// 	const { B } = useBEM('google-map');
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Check if window.google is loaded
//     if (typeof window !== 'undefined' && (window as any).google) {
//       const google = (window as any).google;

//       const map = new google.maps.Map(mapRef.current!, {
//         center: { lat: 14.5995, lng: 120.9842 }, // Manila as example
//         zoom: 12,
//       });

//       // Example marker
//       new google.maps.Marker({
//         position: { lat: 14.5995, lng: 120.9842 },
//         map,
//         title: 'Hello Manila!',
//       });
//     }
//   }, []);

//   return (
//     <div
//       className={B()}
//       ref={mapRef}
//       style={{
//         "--google-map-height": height,
//         "--google-map-height-tablet-lg": heightTabletLg,
//       } as React.CSSProperties}
//     />
//   );
// }
