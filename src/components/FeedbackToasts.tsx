import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, MessageSquare, Phone, Sparkles, X, ShoppingCart } from 'lucide-react';

interface FeedbackToastsProps {
  onApplyCoupon: (code: string) => void;
  openCart: () => void;
  cartCount: number;
}

const SOCIAL_PROOFS = [
  { name: 'John D.', location: 'Downtown', item: 'Truffle Umami Bacon Burger', time: '2 mins ago' },
  { name: 'Samantha K.', location: 'West End', item: 'Hot Pepperoni & Honey Pizza', time: '5 mins ago' },
  { name: 'Marcus L.', location: 'Tech Park', item: 'Korean Sweef Ginger Wings', time: '1 min ago' },
  { name: 'David P.', location: 'South Heights', item: 'Dynamite Waffle Fries', time: '7 mins ago' },
  { name: 'Jessica R.', location: 'Gourmet Square', item: 'Double Stack BBQ Burger', time: '4 mins ago' },
  { name: 'Alex H.', location: 'Silicon Valley', item: 'Warm Lava Fudge Brownie', time: '3 mins ago' }
];

export default function FeedbackToasts({ onApplyCoupon, openCart, cartCount }: FeedbackToastsProps) {
  const [currentProofIdx, setCurrentProofIdx] = useState(0);
  const [showProof, setShowProof] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentDismissed, setExitIntentDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Social Proof Slider cycle
  useEffect(() => {
    const triggerInterval = setInterval(() => {
      // Toggle social toast visibility
      setShowProof(true);
      
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowProof(false);
        // Advance to next index
        setTimeout(() => {
          setCurrentProofIdx((prev) => (prev + 1) % SOCIAL_PROOFS.length);
        }, 500); // delay before choosing next
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 18000); // trigger every 18s

    // Initial trigger
    const initialTimer = setTimeout(() => {
      setShowProof(true);
      setTimeout(() => setShowProof(false), 5000);
    }, 4000);

    return () => {
      clearInterval(triggerInterval);
      clearTimeout(initialTimer);
    };
  }, []);

  // 2. Exit Intent Trigger (detect mouse moving up out of browser viewport)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitIntentDismissed && !showExitIntent) return;
      // Trigger if mouse leaves window upwards
      if (e.clientY < 18) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Fallback: Trigger automatically if they stay idle for 45s without buying
    const fallbackTimer = setTimeout(() => {
      if (!exitIntentDismissed && cartCount === 0) {
        setShowExitIntent(true);
      }
    }, 45000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(fallbackTimer);
    };
  }, [exitIntentDismissed, cartCount, showExitIntent]);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('BITEFIRST15');
    setCopied(true);
    onApplyCoupon('BITEFIRST15');
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const currentProof = SOCIAL_PROOFS[currentProofIdx];

  return (
    <>
      {/* Social Proof Live Toasts */}
      <AnimatePresence>
        {showProof && currentProof && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, y: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed bottom-6 left-6 z-40 bg-white shadow-2xl rounded-2xl p-4 border border-slate-100 flex items-center gap-3 max-w-[340px] pointer-events-auto"
            id="live-order-toast"
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                🔥
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 font-medium">LIVE ORDER RECEIVED</p>
              <p className="text-sm font-semibold text-slate-800 truncate">
                <span className="font-bold text-slate-900">{currentProof.name}</span> from {currentProof.location}
              </p>
              <p className="text-xs font-medium text-red-600 italic truncate">
                Bought {currentProof.item}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentProof.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Call, WhatsApp, and Floating Mini-Cart buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-auto">
        {/* Floating Mini Cart */}
        {cartCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openCart}
            className="relative p-4 bg-[#F77F00] text-white rounded-full shadow-2xl hover:bg-[#d66e00] transition-colors flex items-center justify-center border-2 border-white"
            aria-label="Open Shopping Basket"
            id="floating-cart-btn"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#D62828] text-white font-bold text-xs px-2.5 py-1 rounded-full border border-white">
              {cartCount}
            </span>
          </motion.button>
        )}

        {/* WhatsApp Button */}
        <motion.a
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/18005552483"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center"
          aria-label="Chat on WhatsApp"
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.a>

        {/* Call Hotline Button */}
        <motion.a
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          href="tel:+18005552483"
          className="p-4 bg-[#D62828] text-white rounded-full shadow-2xl hover:bg-[#b02020] transition-colors flex items-center justify-center"
          aria-label="Call Fastfood Hotline"
          id="floating-call-btn"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Exit Intent Secret Coupon Overlay */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400"
              id="exit-intent-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowExitIntent(false);
                  setExitIntentDismissed(true);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
                id="close-exit-intent"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic Banner */}
              <div className="bg-gradient-to-br from-[#D62828] to-[#F77F00] p-8 text-center text-white relative">
                <div className="absolute top-2 left-4 animate-bounce">🍔</div>
                <div className="absolute bottom-4 right-6 text-2xl animate-spin" style={{ animationDuration: '8s' }}>🍕</div>
                <Sparkles className="w-12 h-12 mx-auto text-yellow-300 mb-2 animate-pulse" />
                <h3 className="text-2xl font-extrabold font-display leading-tight mb-1">
                  WAIT! DON’T LEAVE HUNGRY!
                </h3>
                <p className="text-yellow-100 font-medium text-sm">
                  We baked a secret recipe discount before you go.
                </p>
              </div>

              {/* Coupon Box */}
              <div className="p-6 text-center">
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Apply our limited-time coupon code below for <span className="font-bold text-red-600">15% OFF</span> your dynamic fast-food order. No strings attached!
                </p>

                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex items-center justify-between gap-4 mb-6">
                  <div className="text-left">
                    <span className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider">Coupon Code</span>
                    <p className="text-lg font-extrabold text-[#D62828] tracking-widest font-mono">BITEFIRST15</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyCoupon}
                    className="flex items-center gap-2 bg-[#FCBF49] hover:bg-[#e0a631] text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm"
                    id="copy-exit-intent-coupon"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                        APPLIED!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        CLAIM & COPY
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowExitIntent(false);
                      setExitIntentDismissed(true);
                      // Scroll to products
                      document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-[#1e293b] text-white hover:bg-slate-800 transition-colors py-3.5 rounded-2xl font-bold text-sm shadow-md"
                    id="stay-exit-intent"
                  >
                    Order Now with 15% Off
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowExitIntent(false);
                    setExitIntentDismissed(true);
                  }}
                  className="mt-3 text-xs text-slate-400 hover:text-slate-600 font-medium underline"
                  id="skip-exit-intent"
                >
                  No thanks, I will pay full price
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
