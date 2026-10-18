import React, { useState } from 'react';
import { TEMPLE_STORY_IMAGE } from '../data/fragrances';
import { FadeText } from '@/components/ui/fade-text';
import { Sparkles, Compass, Shield } from 'lucide-react';

interface BrandStoryProps {
  onExploreHeritage?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onExploreHeritage }) => {
  const [expandedStory, setExpandedStory] = useState(false);

  return (
    <section id="story" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Monumental Temple Image */}
        <div className="lg:col-span-6 relative group overflow-hidden rounded-3xl border border-[#C6A15B]/25 shadow-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#090909]">
            <img
              src={TEMPLE_STORY_IMAGE}
              alt="Ancient Egyptian Temple Hall with golden hour light"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/20 to-transparent" />

            {/* Inscribed Temple Quote */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#E6D2A0] block mb-1">
                Hypostyle Hall of Karnak
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#F4EFE5]">
                "The gods inhale the breath of sweet resins and grant life eternal."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans">
            <span className="w-8 h-px bg-[#C6A15B]/40" />
            <span>Our Royal Provenance</span>
          </div>

          {/* Heading with FadeText */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4EFE5] leading-[1.05]">
            <FadeText
              direction="up"
              text="BORN FROM THE"
              framerProps={{
                show: { transition: { delay: 0.2, type: 'spring' } }
              }}
            />
            <span className="italic font-light text-[#E6D2A0] block mt-1">
              <FadeText
                direction="right"
                text="MYSTERY OF EGYPT"
                framerProps={{
                  show: { transition: { delay: 0.35, type: 'spring' } }
                }}
              />
            </span>
          </h2>

          {/* Gold Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-[#C6A15B] to-transparent" />

          {/* Core Story Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-[#C9B18A] font-light leading-relaxed">
            <p>
              Long before modern perfumery, fragrance was woven into the rituals, ceremonies, and
              royal traditions of Ancient Egypt.
            </p>
            <p>
              Inspired by this extraordinary heritage, our fragrance collection brings together
              captivating aromas, precious ingredients, and a modern vision of timeless luxury.
            </p>
            <p className="font-serif italic text-[#F4EFE5] text-lg sm:text-xl border-l-2 border-[#C6A15B]/50 pl-4 py-1">
              "Every fragrance tells a story. Every note leaves a memory. Every drop captures a
              moment of eternity."
            </p>
          </div>

          {/* Expanded Heritage Chapters */}
          {expandedStory && (
            <div className="p-5 rounded-2xl bg-[#151310] border border-[#C6A15B]/20 text-xs sm:text-sm text-[#C9B18A] space-y-3">
              <p>
                <strong className="text-[#E6D2A0] font-serif uppercase tracking-wider block mb-1">
                  The Ancient Kyphi Formula
                </strong>
                The Pharaohs reserved Kyphi — an opulent blend of sweet calamus, myrrh, frankincense,
                honey, and wine — to perfume royal sanctuaries as Ra descended each evening.
              </p>
              <p>
                <strong className="text-[#E6D2A0] font-serif uppercase tracking-wider block mb-1">
                  Flacon Sculpture Atelier
                </strong>
                Masterfully engineered and sculpted by MAB Technologies SL, each glass flacon is
                weighted according to golden ratio proportions, ensuring an enduring physical presence.
              </p>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => setExpandedStory(!expandedStory)}
              className="px-7 py-3.5 rounded-full border border-[#C6A15B]/40 hover:border-[#C6A15B] text-xs font-semibold tracking-[0.2em] uppercase text-[#F4EFE5] hover:bg-[#C6A15B] hover:text-[#090909] transition-all"
            >
              {expandedStory ? 'Close Heritage Notes' : 'Discover Our Heritage'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
