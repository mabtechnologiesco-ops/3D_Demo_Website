import React from 'react';
import { motion } from 'motion/react';
import { Fragrance } from '../data/fragrances';
import { useFadeInUp } from '../hooks/useFadeInUp';
import { FadeText } from '@/components/ui/fade-text';
import { ArrowRight, Plus } from 'lucide-react';

interface SignatureCollectionProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  fragrances,
  onSelectFragrance,
  onQuickAdd
}) => {
  // Use Framer Motion hook to orchestrate staggered fade-in-up on viewport entry
  const { ref, isInView, containerVariants, itemVariants } = useFadeInUp<HTMLElement>({
    amount: 0.12,
    once: true,
    distance: 40,
    duration: 0.8,
    staggerChildren: 0.14
  });

  return (
    <motion.section
      id="collection"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header with fade-in-up */}
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans">
          <span className="w-8 h-px bg-[#C6A15B]/40" />
          <span>The Four Vessels of Antiquity</span>
          <span className="w-8 h-px bg-[#C6A15B]/40" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4EFE5] text-balance">
          <FadeText
            direction="up"
            text="SCENTED IN ETERNITY"
            framerProps={{
              show: { transition: { delay: 0.15, type: 'spring' } }
            }}
          />
        </h2>

        <p className="text-base sm:text-lg text-[#C9B18A] font-light max-w-2xl mx-auto leading-relaxed">
          Discover fragrances inspired by the richness, mystery, and sensuality of Ancient Egypt.
          Each flacon is cast from high-density crystal, crowned in brushed antique gold.
        </p>
      </motion.div>

      {/* Product Grid: 4 items, staggered fade-in-up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {fragrances.map((fragrance) => (
          <motion.article
            key={fragrance.id}
            variants={itemVariants}
            className="group relative flex flex-col bg-[#151310]/70 rounded-2xl border border-[#C6A15B]/20 hover:border-[#C6A15B]/50 transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[#C6A15B]/10 hover:-translate-y-1"
          >
            {/* Image Container with subtle zoom */}
            <div
              className="relative w-full aspect-[4/3] overflow-hidden bg-[#090909] cursor-pointer"
              onClick={() => onSelectFragrance(fragrance)}
            >
              <img
                src={fragrance.image}
                alt={fragrance.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim for Contrast & Elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151310] via-transparent to-transparent opacity-80" />

              {/* Subtle Edition Badge */}
              {fragrance.badge && (
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#E6D2A0] bg-[#090909]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C6A15B]/30">
                    {fragrance.badge}
                  </span>
                </div>
              )}

              {/* Quick Size Price Tag */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-sm tracking-tight text-[#F4EFE5] bg-[#090909]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 tabular-nums">
                  From SLE {fragrance.sizes[0].price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Product Metadata & Actions */}
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6">
              <div className="space-y-3">
                {/* Category & Olfactory Notes */}
                <div className="flex items-center justify-between text-xs text-[#C6A15B] tracking-[0.2em] uppercase font-sans">
                  <span>{fragrance.category}</span>
                  <span className="text-[#C9B18A]/60 lowercase italic font-serif text-sm">
                    {fragrance.notes}
                  </span>
                </div>

                {/* Fragrance Title */}
                <h3
                  onClick={() => onSelectFragrance(fragrance)}
                  className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#F4EFE5] group-hover:text-[#E6D2A0] transition-colors cursor-pointer"
                >
                  {fragrance.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-[#C9B18A] font-light leading-relaxed">
                  {fragrance.description}
                </p>

                {/* Key Accords Unboxed Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-[#C9B18A]/75">
                  {fragrance.accords.map((accord, aIdx) => (
                    <React.Fragment key={accord}>
                      <span>{accord}</span>
                      {aIdx < fragrance.accords.length - 1 && (
                        <span className="text-[#C6A15B]/40" aria-hidden="true">
                          &middot;
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Buttons: Discover Fragrance & Quick Add */}
              <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectFragrance(fragrance)}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E6D2A0] hover:text-[#FFFFFF] transition-colors group/btn py-2"
                >
                  <span>Discover Fragrance</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onQuickAdd(fragrance)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C6A15B]/30 hover:border-[#C6A15B] bg-[#090909] text-xs font-medium text-[#F4EFE5] hover:text-[#090909] hover:bg-[#C6A15B] transition-all"
                  title="Add standard 50ml to bag"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};
