import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onOpenReel?: () => void;
  onNavigateToCollection: () => void;
  onNavigateToStory: () => void;
  onNavigateToFinder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCollection,
  onNavigateToStory,
  onNavigateToFinder
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#090909] text-[#F4EFE5] border-t border-[#C6A15B]/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Newsletter & Atelier Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#C6A15B]/15 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase block">
              The Pharaoh’s Dispatch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE5]">
              Subscribe to Private Resinous Harvests
            </h3>
            <p className="text-xs sm:text-sm text-[#C9B18A] font-light max-w-md leading-relaxed">
              Receive private invitations to limited batch flacon releases, ancient incense discoveries,
              and private client appointments.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#151310] border border-[#C6A15B]/40 text-[#E6D2A0] text-xs">
                <Check className="w-4 h-4 text-[#C6A15B]" />
                <span>You have been inscribed in the Royal Archive. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-[#151310] border border-[#C6A15B]/30 text-xs text-[#F4EFE5] placeholder-[#C9B18A]/50 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#C6A15B] text-[#090909] text-xs font-semibold uppercase tracking-wider hover:bg-[#E6D2A0] transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Egyptian Sacred Geometry Accent Line */}
        <div className="flex items-center justify-center gap-4 text-[#C6A15B]/30 my-4 text-xs">
          <span className="w-16 h-px bg-[#C6A15B]/20" />
          <span>&#10037;</span>
          <span className="font-cinzel tracking-[0.3em] uppercase text-[10px] text-[#C9B18A]/60">
            ANUBIS &middot; LUXOR &middot; HELIOPOLIS &middot; ALEXANDRIA
          </span>
          <span>&#10037;</span>
          <span className="w-16 h-px bg-[#C6A15B]/20" />
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light text-[#C9B18A]">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#C6A15B] text-base font-cinzel">&#10037;</span>
              <span className="font-cinzel text-base tracking-[0.2em] font-semibold text-[#F4EFE5]">
                ANUBIS PARFUMS
              </span>
            </div>
            <p className="text-xs text-[#C9B18A]/80 leading-relaxed font-light">
              Haute Parfumerie distilled from sacred Ancient Egyptian kyphi traditions, wild aged oud,
              and sculpted crystal vessels.
            </p>
          </div>

          {/* Fragrances */}
          <div className="space-y-3">
            <h4 className="text-[#E6D2A0] font-serif text-sm uppercase tracking-wider font-medium">
              Vessels &amp; Scents
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onNavigateToCollection}
                  className="hover:text-[#F4EFE5] transition-colors"
                >
                  Golden Pharaoh (50ml)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToCollection}
                  className="hover:text-[#F4EFE5] transition-colors"
                >
                  Queen of the Nile (50ml)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToCollection}
                  className="hover:text-[#F4EFE5] transition-colors"
                >
                  Temple of Oud (50ml)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToCollection}
                  className="hover:text-[#F4EFE5] transition-colors"
                >
                  Black Obelisk (50ml)
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage & 3D Atelier */}
          <div className="space-y-3">
            <h4 className="text-[#E6D2A0] font-serif text-sm uppercase tracking-wider font-medium">
              Atelier &amp; Craft
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onNavigateToStory} className="hover:text-[#F4EFE5] transition-colors">
                  Our Egyptian Story
                </button>
              </li>
              <li>
                <button onClick={onNavigateToFinder} className="hover:text-[#F4EFE5] transition-colors">
                  Olfactory Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToStory}
                  className="hover:text-[#F4EFE5] transition-colors text-[#C6A15B]"
                >
                  Bespoke Flacon Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[#E6D2A0] font-serif text-sm uppercase tracking-wider font-medium">
              Client Concierge
            </h4>
            <ul className="space-y-2">
              <li>112 Render Lane &amp; Corniche El Nil</li>
              <li>Tuesday – Sunday, 9am till sunset</li>
              <li>concierge@anubisparfums.com</li>
              <li>Worldwide Insured Armored Courier</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-[#C6A15B]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C9B18A]/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p>© 2026 ANUBIS PARFUMS. All rights reserved.</p>
            <span className="hidden sm:inline-block text-[#C6A15B]/40" aria-hidden="true">&middot;</span>
            <p className="text-[#E6D2A0] font-medium tracking-wide">
              Crafted By MAB Technologies SL
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span>Cairo</span>
            <span>&middot;</span>
            <span>Paris</span>
            <span>&middot;</span>
            <span>London</span>
            <span>&middot;</span>
            <span>Kyoto</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
