import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Chordly official SVG logo component with accurate gradient squircle icon
 * and crisp typography.
 */
export const ChordlyLogo: React.FC<LogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 40 : 32;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Chordly Squircle App Icon */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center rounded-[10px] overflow-hidden shadow-[0_4px_16px_rgba(255,45,85,0.35)]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 1024 1024" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo_bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FC2D8E" />
              <stop offset="45%" stopColor="#FC2E5C" />
              <stop offset="100%" stopColor="#F8323A" />
            </linearGradient>
            <radialGradient id="logo_glow_tl" cx="20%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Base squircle */}
          <rect width="1024" height="1024" rx="260" fill="url(#logo_bg_grad)" />
          <rect width="1024" height="1024" rx="260" fill="url(#logo_glow_tl)" />
          
          {/* Audio Wave / C-chord dynamic glyph */}
          <g fill="#FFFFFF" transform="translate(10, 10)">
            <path
              d="M554 516c-12-12-21-29-31-43-15-20-49-64-60-84 6-5 78-39 92-46 54-28 118-65 151-118 7-11 11-23 16-34 5 15-20 63-29 77-36 55-95 91-153 121-14 7-30 13-44 21 4 17 53 88 58 106zM394 787c8-4 24-2 34-3 27-4 54-8 80-17 28-10 55-21 80-36 7-5 42-29 44-30-4 10-11 20-18 29-37 49-99 72-159 70-16 0-48-4-61-13z"
              fillOpacity="0.95"
            />
            <path
              d="M521 426c8-5 18-6 27-10 15-6 30-13 45-20 60-29 116-79 139-143 6-17 20-68 10-83-2 5-2 11-3 16-4 15-9 29-16 43-28 56-84 102-137 134-16 9-83 42-88 46 10 24 54 89 59 106-12-13-21-30-32-44-16-22-47-62-59-84 10-8 30-15 42-21 27-13 81-39 103-56 5-4 9-9 13-14 24-27 43-57 58-90 8-17 25-63 20-80-4 5-7 11-11 17-8 12-17 23-28 33-48 46-110 73-171 97-38 15-104 28-112 75-5 28 28 68 44 89 30 42 59 84 88 126 12 17 39 52 46 68-13 0-28-6-42-8-52-4-108 1-151 32-56 41-61 116 3 152 49 28 111 28 165 13 24-7 48-18 69-32 15-11 29-23 41-37 25-29 38-68 25-105-7-20-22-37-33-54-27-40-55-80-82-120-10-15-23-31-31-47z"
              fill="#080A1C"
              fillOpacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <span className="font-bold tracking-tight text-white flex items-center font-sans text-xl leading-none">
          Chordly
        </span>
      )}
    </div>
  );
};
