import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenReel?: () => void;
  onNavigateToCollection: () => void;
  onNavigateToStory: () => void;
  onNavigateToFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigateToCollection,
  onNavigateToStory,
  onNavigateToFinder
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090909]/90 backdrop-blur-md border-b border-[#C6A15B]/20 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#090909]/80 via-[#090909]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 text-decoration-none"
          >
            <span className="text-[#C6A15B] text-lg font-cinzel tracking-widest group-hover:text-[#E6D2A0] transition-colors">
              &#10037;
            </span>
            <div className="flex flex-col">
              <span className="font-cinzel text-base sm:text-lg font-semibold tracking-[0.22em] text-[#F4EFE5] group-hover:text-[#E6D2A0] transition-colors uppercase">
                ANUBIS PARFUMS
              </span>
              <span className="text-[9px] tracking-[0.24em] text-[#C9B18A]/80 uppercase font-sans">
                Crafted By MAB Technologies SL
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#F4EFE5]/75">
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToCollection();
              }}
              className="hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A15B]"
            >
              Collections
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToStory();
              }}
              className="hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A15B]"
            >
              Our Story
            </a>
            <a
              href="#finder"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToFinder();
              }}
              className="hover:text-[#C6A15B] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A15B]"
            >
              The Art of Perfume
            </a>
          </nav>

          {/* Zone 3: Actions (Search, Cart Bag, SHOP NOW CTA) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#F4EFE5]/80 hover:text-[#C6A15B] transition-colors"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag with Item Count */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#F4EFE5]/90 hover:text-[#C6A15B] transition-colors"
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#C6A15B] text-[#090909] text-[10px] font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Buy CTA */}
            <button
              onClick={onNavigateToCollection}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#C6A15B]/50 bg-gradient-to-r from-[#C6A15B]/20 to-[#C6A15B]/10 hover:from-[#C6A15B] hover:to-[#E6D2A0] text-[#F4EFE5] hover:text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-lg shadow-[#090909]/50 whitespace-nowrap shrink-0"
            >
              Shop Now
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F4EFE5]/80 hover:text-[#C6A15B] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#090909]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-12 border-b border-[#C6A15B]/20">
          <div className="flex flex-col gap-6 text-sm uppercase tracking-[0.2em]">
            <a
              href="#collection"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCollection();
              }}
              className="text-[#F4EFE5] hover:text-[#C6A15B] py-2 border-b border-white/5"
            >
              Collections
            </a>
            <a
              href="#story"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToStory();
              }}
              className="text-[#F4EFE5] hover:text-[#C6A15B] py-2 border-b border-white/5"
            >
              Our Story
            </a>
            <a
              href="#finder"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToFinder();
              }}
              className="text-[#F4EFE5] hover:text-[#C6A15B] py-2 border-b border-white/5"
            >
              The Art of Perfume
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCollection();
              }}
              className="w-full py-3 rounded-full bg-[#C6A15B] text-[#090909] text-xs font-semibold tracking-[0.2em] uppercase text-center"
            >
              Explore Collection
            </button>
            <p className="text-center text-[10px] text-[#C9B18A]/50 tracking-widest uppercase">
              Free insured worldwide delivery above SLE 4,500
            </p>
          </div>
        </div>
      )}
    </>
  );
};
