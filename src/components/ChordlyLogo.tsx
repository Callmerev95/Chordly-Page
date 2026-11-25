import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Chordly Variation 29 brand mark: Newsreader italic wordmark + crimson waveform tile.
 */
export const ChordlyLogo: React.FC<LogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 32 : 28;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className="relative flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden border border-white/15"
        style={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <img
          src="/assets/aistudio/Chordly_Icon_16_Circle_672d82db.png"
          alt="Chordly"
          className="w-full h-full object-cover scale-[1.03]"
          draggable={false}
        />
      </div>

      {showWordmark && (
        <span
          className={`font-serif italic tracking-[-0.03em] text-white whitespace-nowrap shrink-0 leading-none ${
            size === 'sm' ? 'text-[20px]' : size === 'lg' ? 'text-[28px]' : 'text-[24px]'
          }`}
        >
          Chordly.
        </span>
      )}
    </div>
  );
};
