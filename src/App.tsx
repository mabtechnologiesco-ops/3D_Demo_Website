import React, { useState, useEffect } from 'react';
import { FRAGRANCES, Fragrance, CartItem } from './data/fragrances';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SignatureCollection } from './components/SignatureCollection';
import { BrandStory } from './components/BrandStory';
import { ScentFinder } from './components/ScentFinder';
import { CinematicBanner } from './components/CinematicBanner';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { CastAndRenderReel } from './components/CastAndRenderReel';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('anubis_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anubis_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (
    fragrance: Fragrance,
    size: '30ml' | '50ml' | '100ml',
    quantity: number
  ) => {
    const sizeObj = fragrance.sizes.find((s) => s.size === size) || fragrance.sizes[1];
    const itemId = `${fragrance.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          fragranceId: fragrance.id,
          name: fragrance.name,
          size,
          price: sizeObj.price,
          quantity,
          image: fragrance.image
        }
      ];
    });

    setIsCartOpen(true);
  };

  const handleQuickAdd = (fragrance: Fragrance) => {
    handleAddToCart(fragrance, '50ml', 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Smooth scroll navigation helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#F4EFE5] selection:bg-[#C6A15B] selection:text-[#090909] relative">
      {/* 1. Luxury Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenReel={() => setIsReelOpen(true)}
        onNavigateToCollection={() => scrollTo('collection')}
        onNavigateToStory={() => scrollTo('story')}
        onNavigateToFinder={() => scrollTo('finder')}
      />

      {/* 2. Cinematic Hero Section with 3D Bottle */}
      <main>
        <HeroSection
          onExploreCollection={() => scrollTo('collection')}
          onDiscoverStory={() => scrollTo('story')}
          onOpenReel={() => setIsReelOpen(true)}
        />

        {/* 3. Signature Fragrance Collection */}
        <SignatureCollection
          fragrances={FRAGRANCES}
          onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
          onQuickAdd={handleQuickAdd}
        />

        {/* 4. Immersive Brand Story */}
        <BrandStory onExploreHeritage={() => scrollTo('finder')} />

        {/* 5. Interactive Scent Finder */}
        <ScentFinder
          onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
        />

        {/* 6. Full-Width Cinematic Banner */}
        <CinematicBanner
          onExploreCollection={() => scrollTo('collection')}
          onOpenReel={() => setIsReelOpen(true)}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        onOpenReel={() => setIsReelOpen(true)}
        onNavigateToCollection={() => scrollTo('collection')}
        onNavigateToStory={() => scrollTo('story')}
        onNavigateToFinder={() => scrollTo('finder')}
      />

      {/* Interactive Overlays & Modals */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        fragrance={selectedFragrance}
        onClose={() => setSelectedFragrance(null)}
        onAddToCart={handleAddToCart}
        allFragrances={FRAGRANCES}
        onSelectAnother={(f) => setSelectedFragrance(f)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectFragrance={(f) => setSelectedFragrance(f)}
      />

      {/* Cast & Render Scroll-Scrubbed 3D Film Viewer Modal */}
      <CastAndRenderReel
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />
    </div>
  );
}
