import React, { useState } from 'react';
import { FRAGRANCES, Fragrance } from '../data/fragrances';
import { FadeText } from '@/components/ui/fade-text';
import { Flame, Flower2, TreePine, ArrowRight } from 'lucide-react';

interface ScentFinderProps {
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const ScentFinder: React.FC<ScentFinderProps> = ({ onSelectFragrance }) => {
  const [selectedFamily, setSelectedFamily] = useState<
    'Amber & Intense' | 'Floral & Sensual' | 'Woody & Mysterious'
  >('Amber & Intense');

  const families = [
    {
      id: 'Amber & Intense' as const,
      label: 'AMBER & INTENSE',
      sublabel: 'Golden warmth, spiced resins, and solar radiance',
      icon: Flame,
      notes: 'Amber, Saffron, Honey, Cistus Labdanum',
      mood: 'Commanding, decadent, regal'
    },
    {
      id: 'Floral & Sensual' as const,
      label: 'FLORAL & SENSUAL',
      sublabel: 'Lotus blossoms, royal roses, and bourbon vanilla',
      icon: Flower2,
      notes: 'Damask Rose, Blue Lotus, Jasmine, Vanilla Pod',
      mood: 'Intimate, mesmerizing, velvety'
    },
    {
      id: 'Woody & Mysterious' as const,
      label: 'WOODY & MYSTERIOUS',
      sublabel: 'Aged agarwood, temple smoke, and black obsidian',
      icon: TreePine,
      notes: 'Wild Oud, Frankincense, Sandalwood, Leather',
      mood: 'Sacred, monolithic, nocturnal'
    }
  ];

  const filteredFragrances = FRAGRANCES.filter((f) => f.category === selectedFamily);

  return (
    <section id="finder" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans">
          <span className="w-8 h-px bg-[#C6A15B]/40" />
          <span>Interactive Discovery</span>
          <span className="w-8 h-px bg-[#C6A15B]/40" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4EFE5]">
          <FadeText
            direction="up"
            text="FIND YOUR SIGNATURE SCENT"
            framerProps={{
              show: { transition: { delay: 0.15, type: 'spring' } }
            }}
          />
        </h2>

        <p className="text-base sm:text-lg text-[#C9B18A] font-light max-w-xl mx-auto leading-relaxed">
          Select an olfactory family below to uncover fragrances formulated to harmonize with your
          presence and personal aura.
        </p>
      </div>

      {/* Fragrance Families Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {families.map((family) => {
          const Icon = family.icon;
          const isSelected = selectedFamily === family.id;
          return (
            <button
              key={family.id}
              onClick={() => setSelectedFamily(family.id)}
              className={`p-6 sm:p-8 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1c1914] to-[#12100d] border-[#C6A15B] shadow-xl shadow-[#C6A15B]/10 ring-1 ring-[#C6A15B]/30'
                  : 'bg-[#151310]/60 border-[#C6A15B]/20 hover:border-[#C6A15B]/40 hover:bg-[#151310]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#C6A15B] text-[#090909]' : 'bg-[#090909] text-[#C6A15B]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9B18A]/60">
                  {family.mood}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#F4EFE5] font-medium tracking-tight mb-2">
                {family.label}
              </h3>

              <p className="text-xs text-[#C9B18A] font-light leading-relaxed mb-4">
                {family.sublabel}
              </p>

              <div className="pt-3 border-t border-[#C6A15B]/15 text-[11px] text-[#E6D2A0]/80">
                <span className="text-[#C9B18A]/50 block uppercase tracking-wider text-[9px] mb-0.5">
                  Core Accords
                </span>
                {family.notes}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filtered Fragrance Cards Result */}
      <div className="bg-[#151310]/80 border border-[#C6A15B]/25 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C6A15B]/15 mb-8">
          <div>
            <h3 className="font-serif text-2xl text-[#F4EFE5]">
              Curated for {selectedFamily}
            </h3>
            <p className="text-xs text-[#C9B18A]/70 uppercase tracking-widest mt-1">
              {filteredFragrances.length} creation{filteredFragrances.length > 1 ? 's' : ''} matched in Egyptian archives
            </p>
          </div>

          <span className="text-xs font-mono text-[#C6A15B]">
            Concentration: 24%–30% Extrait
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFragrances.map((fragrance) => (
            <div
              key={fragrance.id}
              className="flex flex-col sm:flex-row gap-6 items-center p-4 sm:p-6 rounded-2xl bg-[#090909]/60 border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 transition-all group"
            >
              <img
                src={fragrance.image}
                alt={fragrance.name}
                className="w-36 h-44 object-cover rounded-xl border border-white/5 shrink-0 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="flex-1 space-y-3 text-left w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C6A15B]">
                    {fragrance.subtitle}
                  </span>
                  <span className="font-mono text-xs text-[#E6D2A0] tabular-nums">
                    From SLE {fragrance.sizes[0].price.toLocaleString()}
                  </span>
                </div>

                <h4 className="font-serif text-2xl text-[#F4EFE5] group-hover:text-[#E6D2A0] transition-colors">
                  {fragrance.name}
                </h4>

                <p className="text-xs text-[#C9B18A] line-clamp-2 leading-relaxed">
                  {fragrance.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectFragrance(fragrance)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C6A15B] hover:text-[#FFFFFF] uppercase tracking-wider font-medium transition-colors"
                  >
                    <span>Examine Flacon &amp; Pyramid</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
