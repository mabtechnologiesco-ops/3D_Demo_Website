import React, { useState } from 'react';
import { CartItem } from '../data/fragrances';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [giftBox, setGiftBox] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'confirmed'>('cart');
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 4500 || subtotal === 0 ? 0 : 450;
  const total = subtotal + shipping;

  const handleSimulateCheckout = () => {
    const randomRef = `AP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randomRef);
    setCheckoutStep('confirmed');
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#090909]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-[#151310] border-l border-[#C6A15B]/25 h-full flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#C6A15B]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C6A15B]" />
            <h2 className="font-serif text-xl text-[#F4EFE5] tracking-wide">
              {checkoutStep === 'confirmed' ? 'Order Confirmed' : 'Your Fragrance Bag'}
            </h2>
            {items.length > 0 && checkoutStep === 'cart' && (
              <span className="text-xs font-mono text-[#C6A15B] bg-[#C6A15B]/15 px-2 py-0.5 rounded-full">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#C9B18A] hover:text-[#F4EFE5] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {checkoutStep === 'confirmed' ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] text-2xl">
              &#10037;
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE5]">
              Rites of Preparation Initiated
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-mono">
              Reference #{orderRef}
            </p>
            <p className="text-sm text-[#C9B18A] leading-relaxed max-w-xs">
              Your bespoke flacon is being hand-inspected, waxed with royal gold seals, and prepared
              for expedited armored courier departure from our Cairo atelier.
            </p>
            <div className="p-4 rounded-xl bg-[#090909] border border-[#C6A15B]/20 w-full text-left text-xs space-y-2">
              <div className="flex justify-between text-[#C9B18A]">
                <span>Total Settled:</span>
                <span className="font-mono text-[#E6D2A0] tabular-nums font-semibold">
                  SLE {total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#C9B18A]">
                <span>Packaging:</span>
                <span className="text-[#F4EFE5]">Satin Lined Obsidian Coffret</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-full bg-[#C6A15B] text-[#090909] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#E6D2A0] transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#C6A15B]/40 stroke-1" />
            <h3 className="font-serif text-2xl text-[#F4EFE5]">Your bag is currently empty</h3>
            <p className="text-xs text-[#C9B18A] max-w-xs leading-relaxed">
              Explore the four sacred fragrances of Ancient Egypt and select your signature flacon.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full border border-[#C6A15B]/40 text-xs tracking-widest uppercase text-[#E6D2A0] hover:bg-[#C6A15B]/10 transition-colors"
            >
              Discover Fragrances
            </button>
          </div>
        ) : (
          <div className="p-6 flex-1 overflow-y-auto space-y-4 divide-y divide-[#C6A15B]/10">
            {items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 rounded-xl object-cover bg-[#090909] border border-[#C6A15B]/20 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-base text-[#F4EFE5] truncate">{item.name}</h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#C9B18A]/50 hover:text-red-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#C6A15B] font-mono">{item.size}</p>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#C6A15B]/20 rounded-full px-2 py-0.5 bg-[#090909]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-[#C9B18A] hover:text-[#F4EFE5]"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-[#F4EFE5] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-[#C9B18A] hover:text-[#F4EFE5]"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono text-sm text-[#E6D2A0] tabular-nums">
                      SLE {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Complimentary Luxury Coffret Gift Box Selector */}
            <div className="pt-4 mt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090909]/60 border border-[#C6A15B]/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftBox}
                  onChange={(e) => setGiftBox(e.target.checked)}
                  className="w-4 h-4 accent-[#C6A15B] rounded"
                />
                <div className="flex-1 text-xs">
                  <span className="text-[#F4EFE5] font-medium block">
                    Complimentary Obsidian Coffret Gift Packaging
                  </span>
                  <span className="text-[#C9B18A]/60">
                    Hand-tied with golden ribbon &amp; wax seal (Free)
                  </span>
                </div>
                <Gift className="w-4 h-4 text-[#C6A15B]" />
              </label>
            </div>
          </div>
        )}

        {/* Drawer Footer with Subtotal & Simulated Checkout */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-[#C6A15B]/20 bg-[#090909]/80 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#C9B18A]">
                <span>Subtotal</span>
                <span className="font-mono text-[#F4EFE5] tabular-nums">SLE {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#C9B18A]">
                <span>Insured International Courier</span>
                <span className="text-[#E6D2A0] font-mono">
                  {shipping === 0 ? 'Complimentary' : `SLE ${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#C6A15B]/15 text-[#F4EFE5] font-semibold">
                <span>Estimated Total</span>
                <span className="font-mono text-lg text-[#E6D2A0] tabular-nums">SLE {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#E6D2A0] text-[#090909] text-xs font-semibold uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-[#C6A15B]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Luxury Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#C9B18A]/60 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Includes 2 complimentary tester vials &amp; certificate of authenticity</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
