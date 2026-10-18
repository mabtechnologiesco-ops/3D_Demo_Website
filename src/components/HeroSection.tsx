import React from 'react';
import { ThreeBottleCanvas } from './ThreeBottleCanvas';
import { ArrowDown } from 'lucide-react';
import { FadeText } from '@/components/ui/fade-text';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onDiscoverStory: () => void;
  onOpenReel?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onDiscoverStory
}) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Egyptian Golden Hour Environment */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Egyptian Night & Sunset Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#151310] to-[#090909]" />

        {/* Ambient Warm Golden Sunlight Shafts */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[700px] rounded-full blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #C6A15B 0%, #6B321A 50%, transparent 80%)'
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #E6D2A0 0%, #C9B18A 40%, transparent 75%)'
          }}
        />

        {/* Atmospheric Subtle Grid & Sacred Geometry Watermark (quiet texture) */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C6A15B 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8 pr-0 lg:pr-8">
          {/* Eyebrow Label with FadeText */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
            <span className="w-8 h-px bg-[#C6A15B]/50" aria-hidden="true" />
            <FadeText
              direction="down"
              text="The Art of Ancient Perfumery"
              framerProps={{
                show: { transition: { delay: 0.1 } }
              }}
            />
            <span className="text-[#C9B18A]/40 font-mono text-[10px]">· EST. III DYNASTY</span>
          </div>

          {/* Majestic Headline with FadeText */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-[#F4EFE5] text-balance">
            <FadeText
              direction="up"
              text="SCENT OF"
              framerProps={{
                show: { transition: { delay: 0.25, duration: 0.8 } }
              }}
            />
            <span className="block italic font-light bg-gradient-to-r from-[#E6D2A0] via-[#C6A15B] to-[#C9B18A] bg-clip-text text-transparent">
              <FadeText
                direction="right"
                text="ETERNITY"
                framerProps={{
                  show: { transition: { delay: 0.45, duration: 0.9 } }
                }}
              />
            </span>
          </h1>

          {/* Supporting Copy with FadeText */}
          <div className="max-w-xl text-base sm:text-lg leading-relaxed text-[#C9B18A] font-light">
            <FadeText
              direction="up"
              text="Inspired by the timeless mysteries of Ancient Egypt. Discover extraordinary fragrances crafted to awaken the senses and leave an unforgettable impression across centuries."
              framerProps={{
                show: { transition: { delay: 0.65, duration: 0.8 } }
              }}
            />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onExploreCollection}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#E6D2A0] text-[#090909] font-medium text-xs tracking-[0.2em] uppercase hover:shadow-lg hover:shadow-[#C6A15B]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore the Collection
            </button>

            <button
              onClick={onDiscoverStory}
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#F4EFE5] font-medium text-xs tracking-[0.2em] uppercase bg-[#151310]/50 hover:bg-[#151310] transition-all"
            >
              Discover Our Story
            </button>
          </div>

          {/* Proof Strip / Heritage Attributes */}
          <div className="pt-6 border-t border-[#C6A15B]/15 w-full grid grid-cols-3 gap-4 text-left">
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#E6D2A0]">100%</p>
              <p className="text-[11px] tracking-wider uppercase text-[#C9B18A]/70">Pure Resins &amp; Oud</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#E6D2A0]">48 Hrs</p>
              <p className="text-[11px] tracking-wider uppercase text-[#C9B18A]/70">Skin Longevity</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#E6D2A0]">Hand-Cast</p>
              <p className="text-[11px] tracking-wider uppercase text-[#C9B18A]/70">Sculpted Crystal</p>
            </div>
          </div>
        </div>

        {/* Right 3D Visualizer Column */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Subtle Ambient Glow Ring behind 3D flacon */}
          <div className="absolute inset-0 m-auto w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#C6A15B]/10 blur-3xl pointer-events-none" />

          {/* Three.js Real-Time 3D Flacon */}
          <div className="relative w-full max-w-md mx-auto">
            <ThreeBottleCanvas perfumeColor="#C6A15B" />
          </div>

          {/* Flacon Caption */}
          <div className="mt-2 text-center flex flex-col items-center">
            <span className="text-[11px] tracking-[0.22em] text-[#C9B18A]/80 uppercase">
              Flacon No. 01 &middot; The Golden Pharaoh 3D Vessel
            </span>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="relative z-10 mx-auto mt-6 hidden sm:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={onExploreCollection}
          className="text-[10px] tracking-[0.25em] uppercase text-[#C9B18A] flex flex-col items-center gap-2"
          aria-label="Scroll down to fragrances"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C6A15B]" />
        </button>
      </div>
    </section>
  );
};
