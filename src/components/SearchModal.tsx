import React, { useState, useMemo } from 'react';
import { FRAGRANCES, Fragrance } from '../data/fragrances';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectFragrance
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FRAGRANCES;
    return FRAGRANCES.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.notes.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.keyNotes.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-[#090909]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#151310] border border-[#C6A15B]/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#C6A15B]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by note (Oud, Amber, Rose, Saffron, Leather)..."
              autoFocus
              className="w-full bg-transparent border-none text-[#F4EFE5] placeholder-[#C9B18A]/50 focus:outline-none text-base sm:text-lg font-serif"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#C9B18A] hover:text-[#F4EFE5]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#C9B18A]">
          <span className="text-[#C9B18A]/50">Common accords:</span>
          {['Oud', 'Amber', 'Saffron', 'Rose', 'Vanilla', 'Incense', 'Leather'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#090909] border border-[#C6A15B]/20 hover:border-[#C6A15B] text-[#E6D2A0] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-3 divide-y divide-[#C6A15B]/10">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#C9B18A]">
              No fragrances match "{query}". Try searching for Amber, Rose, or Oud.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFragrance(item);
                  onClose();
                }}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#090909] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded-lg border border-white/5"
                  />
                  <div>
                    <h4 className="font-serif text-lg text-[#F4EFE5] group-hover:text-[#E6D2A0] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#C6A15B] font-mono">{item.category}</p>
                    <p className="text-[11px] text-[#C9B18A]/60 italic font-serif">{item.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E6D2A0] tabular-nums">
                    From SLE {item.sizes[0].price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
