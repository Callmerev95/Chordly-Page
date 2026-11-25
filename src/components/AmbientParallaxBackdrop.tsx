import React from 'react';

/**
 * Variation 29 Obsidian-Noir backdrop (#070708) with dual crimson radial ambient glows
 * and subtle architectural side hairlines.
 */
export const AmbientParallaxBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#070708]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 80% 20%, rgba(255, 45, 85, 0.15), transparent 40%), radial-gradient(circle at 10% 90%, rgba(255, 45, 85, 0.08), transparent 40%)',
      }}
    >
      <div className="max-w-7xl mx-auto h-full border-x border-white/[0.04]" />
    </div>
  );
};
