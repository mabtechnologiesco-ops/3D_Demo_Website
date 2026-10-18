import React, { useState } from 'react';
import { Fragrance } from '../data/fragrances';
import { X, Plus, Minus, Check, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

interface ProductDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: '30ml' | '50ml' | '100ml', quantity: number) => void;
  allFragrances: Fragrance[];
  onSelectAnother: (fragrance: Fragrance) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  allFragrances,
  onSelectAnother
}) => {
  if (!fragrance) return null;

  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml'>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'pyramid' | 'ritual' | 'flacon'>('pyramid');
  const [addedNotice, setAddedNotice] = useState(false);

  const currentSizeObj =
    fragrance.sizes.find((s) => s.size === selectedSize) || fragrance.sizes[1];

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const recommended = allFragrances.filter((f) => f.id !== fragrance.id).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto bg-[#090909]/85 backdrop-blur-md">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-5xl bg-[#151310] border border-[#C6A15B]/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#090909]/80 text-[#F4EFE5] hover:text-[#C6A15B] border border-[#C6A15B]/20 transition-all hover:scale-105"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Visual Column */}
        <div className="lg:w-1/2 relative bg-[#090909] flex items-center justify-center min-h-[340px] sm:min-h-[460px] overflow-hidden">
          <img
            src={fragrance.image}
            alt={fragrance.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151310] via-transparent to-transparent opacity-60" />

          {/* Size & Weight Tag */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="text-xs font-mono text-[#E6D2A0] bg-[#090909]/85 px-3 py-1.5 rounded-full border border-[#C6A15B]/30">
              {currentSizeObj.flaconWeight}
            </span>
          </div>
        </div>

        {/* Right Details Column (Scrollable) */}
        <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[70vh] lg:max-h-[92vh] space-y-6">
          <div className="space-y-4">
            {/* Category & Badge */}
            <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans">
              <span>{fragrance.category}</span>
              {fragrance.badge && (
                <span className="text-[#E6D2A0] border border-[#C6A15B]/40 px-2.5 py-0.5 rounded-full text-[10px]">
                  {fragrance.badge}
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE5] font-medium tracking-tight">
                {fragrance.name}
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C9B18A]/70 mt-1">
                {fragrance.subtitle}
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl text-[#E6D2A0] font-light tabular-nums">
                  SLE {(currentSizeObj.price * quantity).toLocaleString()}
                </span>
                <span className="text-xs text-[#C9B18A]/60">
                  (SLE {currentSizeObj.price.toLocaleString()} / {selectedSize})
                </span>
              </div>
            </div>

            {/* Long Description */}
            <p className="text-sm leading-relaxed text-[#C9B18A] font-light">
              {fragrance.longDescription}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[#F4EFE5] font-medium block">
                Select Flacon Volume
              </label>
              <div className="grid grid-cols-3 gap-3">
                {fragrance.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                      selectedSize === s.size
                        ? 'border-[#C6A15B] bg-[#C6A15B]/15 text-[#F4EFE5] font-medium shadow-sm'
                        : 'border-[#C6A15B]/20 bg-[#090909]/40 text-[#C9B18A] hover:border-[#C6A15B]/50'
                    }`}
                  >
                    <div className="text-xs font-semibold">{s.size}</div>
                    <div className="text-[11px] font-mono text-[#E6D2A0] tabular-nums mt-0.5">
                      SLE {s.price.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion / Tab Panels for Pyramid, Ritual, Flacon Craft */}
            <div className="pt-3 border-t border-[#C6A15B]/15 space-y-3">
              <div className="flex items-center gap-2 border-b border-[#C6A15B]/15 pb-2 text-xs uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('pyramid')}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === 'pyramid'
                      ? 'text-[#C6A15B] border-b-2 border-[#C6A15B] font-semibold'
                      : 'text-[#C9B18A]/60 hover:text-[#C9B18A]'
                  }`}
                >
                  Olfactory Pyramid
                </button>
                <button
                  onClick={() => setActiveTab('ritual')}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === 'ritual'
                      ? 'text-[#C6A15B] border-b-2 border-[#C6A15B] font-semibold'
                      : 'text-[#C9B18A]/60 hover:text-[#C9B18A]'
                  }`}
                >
                  Application Ritual
                </button>
                <button
                  onClick={() => setActiveTab('flacon')}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === 'flacon'
                      ? 'text-[#C6A15B] border-b-2 border-[#C6A15B] font-semibold'
                      : 'text-[#C9B18A]/60 hover:text-[#C9B18A]'
                  }`}
                >
                  Craft &amp; Glass
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'pyramid' && (
                <div className="space-y-2 text-xs text-[#C9B18A]">
                  <div>
                    <span className="text-[#E6D2A0] font-medium uppercase tracking-wider block text-[11px]">
                      Top Notes (Immediate Sensation):
                    </span>
                    <p className="mt-0.5">{fragrance.pyramid.top.join(' · ')}</p>
                  </div>
                  <div>
                    <span className="text-[#E6D2A0] font-medium uppercase tracking-wider block text-[11px]">
                      Heart Notes (The Sacred Core):
                    </span>
                    <p className="mt-0.5">{fragrance.pyramid.heart.join(' · ')}</p>
                  </div>
                  <div>
                    <span className="text-[#E6D2A0] font-medium uppercase tracking-wider block text-[11px]">
                      Base Notes (Eternal Resonance):
                    </span>
                    <p className="mt-0.5">{fragrance.pyramid.base.join(' · ')}</p>
                  </div>
                </div>
              )}

              {activeTab === 'ritual' && (
                <div className="text-xs text-[#C9B18A] leading-relaxed">
                  <p>{fragrance.ritual}</p>
                  <p className="mt-2 text-[#E6D2A0] italic font-serif text-sm">
                    "{fragrance.inspiration}"
                  </p>
                </div>
              )}

              {activeTab === 'flacon' && (
                <div className="text-xs text-[#C9B18A] leading-relaxed space-y-1">
                  <p>
                    Every flacon is precision-molded by master artisans in heavy crystal glass,
                    followed by hand-polishing to achieve liquid clarity.
                  </p>
                  <p className="text-[#E6D2A0]">
                    Stopper: Solid brushed antique gold zinc alloy with micro-engraved hieroglyphs.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Purchase Action Module */}
          <div className="pt-4 border-t border-[#C6A15B]/20 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#C6A15B]/30 rounded-full px-3 py-2 bg-[#090909]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#C9B18A] hover:text-[#F4EFE5]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono text-sm text-[#F4EFE5] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#C9B18A] hover:text-[#F4EFE5]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#E6D2A0] text-[#090909] font-medium text-xs tracking-[0.2em] uppercase hover:shadow-xl hover:shadow-[#C6A15B]/20 transition-all transform active:scale-95"
              >
                {addedNotice ? 'Added to Bag ✓' : `Add to Bag — SLE ${(currentSizeObj.price * quantity).toLocaleString()}`}
              </button>
            </div>

            {/* Reassurance text */}
            <div className="flex items-center justify-between text-[11px] text-[#C9B18A]/60 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                Complimentary 2ml sample vial included
              </span>
              <span>Complimentary insured shipping</span>
            </div>

            {/* Recommended Companion Section */}
            {recommended.length > 0 && (
              <div className="pt-3 border-t border-white/5">
                <span className="text-[10px] tracking-widest uppercase text-[#C9B18A]/60 block mb-2">
                  Pair with complementary creations:
                </span>
                <div className="flex gap-3">
                  {recommended.map((rec) => (
                    <button
                      key={rec.id}
                      onClick={() => onSelectAnother(rec)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#090909]/60 hover:bg-[#090909] border border-white/5 hover:border-[#C6A15B]/30 text-left transition-colors flex-1"
                    >
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="truncate">
                        <div className="text-xs text-[#F4EFE5] font-serif truncate">{rec.name}</div>
                        <div className="text-[10px] text-[#C9B18A]/60 font-mono">SLE {rec.sizes[0].price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
