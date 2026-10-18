import React from 'react';
import { TEMPLE_STORY_IMAGE } from '../data/fragrances';
import { FadeText } from '@/components/ui/fade-text';

interface CinematicBannerProps {
  onExploreCollection: () => void;
  onOpenReel?: () => void;
}

export const CinematicBanner: React.FC<CinematicBannerProps> = ({
  onExploreCollection
}) => {
  return (
    <section className="relative w-full py-32 sm:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center my-12">
      {/* Background Architectural Egyptian Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={TEMPLE_STORY_IMAGE}
          alt="Ancient Temple Columns at Dusk"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Deep Chiaroscuro Gradient Scrim for Legibility & Drama */}
        <div className="absolute inset-0 bg-[#090909]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]" />
      </div>

      {/* Atmospheric Golden Particle Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C6A15B 0%, #6B321A 70%, transparent 100%)'
        }}
      />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-[#C6A15B] uppercase font-sans">
          <FadeText direction="down" text="Monumental Craftsmanship" />
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#F4EFE5] text-balance flex flex-col items-center">
          <FadeText
            direction="up"
            text="MORE THAN A FRAGRANCE."
            framerProps={{ show: { transition: { delay: 0.15 } } }}
          />
          <span className="italic font-light text-[#E6D2A0] block mt-1">
            <FadeText
              direction="left"
              text="A LEGACY."
              framerProps={{ show: { transition: { delay: 0.35 } } }}
            />
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#C9B18A] font-light leading-relaxed">
          Discover a world where ancient inspiration meets modern perfumery. Each drop is distilled
          with the reverence of an eternal offering.
        </p>

        <div className="flex justify-center pt-4">
          <button
            onClick={onExploreCollection}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#E6D2A0] text-[#090909] font-medium text-xs tracking-[0.2em] uppercase hover:shadow-2xl hover:shadow-[#C6A15B]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </section>
  );
};
