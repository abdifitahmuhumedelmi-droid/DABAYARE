import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialOffers from './components/SpecialOffers';
import Menu from './components/MenuSection';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import MobileApp from './components/MobileApp';
import Gallery from './components/Gallery';
import LocationHours from './components/LocationHours';
import FaqSection from './components/FaqSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FeedbackToasts from './components/FeedbackToasts';

import { MenuItem, CartItem, Coupon } from './types';
import { SPECIAL_COUPONS } from './data';
import { initAuth, googleSignIn, logout } from './lib/auth';
import { User } from 'firebase/auth';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Authentication & token states
  const [user, setUser] = useState<User | null>(null);
  const [googleDocToken, setGoogleDocToken] = useState<string | null>(() => {
    return localStorage.getItem('bitecraft_google_token');
  });

  // Shopping cart list state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bitecraft_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('bitecraft_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // Feedback notifications
  const [pushedMessage, setPushedMessage] = useState<string | null>(null);

  // Favorites list state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('bitecraft_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        triggerToastPing('Removed item from your favorites list.');
        return prev.filter(f => f !== id);
      } else {
        triggerToastPing('Added item to your favorites wishlist! ❤️');
        return [...prev, id];
      }
    });
  };

  // Sync states to local storage
  useEffect(() => {
    localStorage.setItem('bitecraft_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('bitecraft_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('bitecraft_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    if (googleDocToken) {
      localStorage.setItem('bitecraft_google_token', googleDocToken);
    } else {
      localStorage.removeItem('bitecraft_google_token');
    }
  }, [googleDocToken]);

  // Handle Firebase Auth changes
  useEffect(() => {
    const unsubscribe = initAuth(
      (resolvedUser, resolvedToken) => {
        setUser(resolvedUser);
        if (resolvedToken) {
          setGoogleDocToken(resolvedToken);
        }
      },
      () => {
        // Fallback or guest user action
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Google Login Auth trigger
  const handleGoogleLogin = async () => {
    try {
      const response = await googleSignIn();
      if (response) {
        setUser(response.user);
        setGoogleDocToken(response.accessToken);
        triggerToastPing(`Welcome, ${response.user.displayName || 'Gourmet Lover'}! Connected securely.`);
      }
    } catch (err) {
      console.error(err);
      triggerToastPing('Failed connecting Google credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setGoogleDocToken(null);
      triggerToastPing('Logged out safely. Hope to dine soon!');
    } catch (err) {
      console.error(err);
    }
  };

  // Helper push messages
  const triggerToastPing = (msg: string) => {
    setPushedMessage(msg);
    setTimeout(() => {
      setPushedMessage(null);
    }, 4000);
  };

  // Cart operations
  const handleAddToCart = (product: MenuItem, quantity: number, customization: string) => {
    setCartItems((prevItems) => {
      // Find if item already exists in cart with EXACT same customization modifier
      const existingIdx = prevItems.findIndex(
        (it) => it.menuItem.id === product.id && it.customization === customization
      );

      if (existingIdx !== -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        triggerToastPing(`Added ${quantity}x extra ${product.name} to your basket!`);
        return updated;
      } else {
        triggerToastPing(`Success! Added ${product.name} to basket.`);
        return [
          ...prevItems,
          {
            id: `${product.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            menuItem: product,
            quantity,
            customization
          }
        ];
      }
    });

    // Option: open drawer on add
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
    triggerToastPing('Removed item from shopping basket.');
  };

  const handleApplyCouponCode = async (code: string): Promise<boolean> => {
    const coupon = SPECIAL_COUPONS.find((c) => c.code === code.trim().toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      triggerToastPing(`Coupon ${coupon.code} applied successfully! Saved ${coupon.discountPercentage}%.`);
      return true;
    }
    return false;
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleManualApplyCoupon = (code: string) => {
    handleApplyCouponCode(code);
  };

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800 font-sans flex flex-col justify-between selection:bg-[#FCBF49] selection:text-slate-950 overflow-x-hidden antialiased scroll-smooth">
      
      {/* SOLID / TRANSPARENT NAVIGATION HEADER */}
      <Navbar 
        user={user}
        googleDocToken={googleDocToken}
        handleLogin={handleGoogleLogin}
        handleLogout={handleLogout}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        isLoggingIn={false}
      />

      <main className="flex-1 bg-white">
        
        {/* HERO HEADER & HOURLY ACTION */}
        <Hero onScrollToMenu={() => {
          const el = document.getElementById('menu-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* ACTIVE FLASH SIZZLING DEALS countdown cards */}
        <SpecialOffers onApplyCoupon={handleManualApplyCoupon} />

        {/* COMPREHENSIVE DUAL-STYLING MENU CATALOG customizer modal */}
        <Menu 
          onAddToCart={handleAddToCart} 
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* BRAND WHY CHOOSE US TILE CARDS */}
        <WhyChooseUs />

        {/* PROCESS FLOW STAGE GRAPHICS */}
        <HowItWorks />

        {/* USER SOCIAL PROOF SLIDERS */}
        <Testimonials />

        {/* MOBILE APP VIP PERK PROMOTIONS */}
        <MobileApp />

        {/* RESTAURANT CHROME PORTFOLIO GALLERY */}
        <Gallery />

        {/* CONTACT INFO hours drive-thru */}
        <LocationHours />

        {/* DETAILED FAQ SEGMENTS ACCORDIONS */}
        <FaqSection />

        {/* CLUB NEWSLETTER discount codes */}
        <Newsletter onApplyCoupon={handleManualApplyCoupon} />

      </main>

      {/* FOOTER links with return top buttons */}
      <Footer />

      {/* FLOATING ACTION CART SHORTCUT BUTTON */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white rounded-2xl p-4.5 shadow-2xl flex items-center gap-3 select-none cursor-pointer border border-white/20"
            id="floating-basket-quick-action"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 stroke-[2.5px]" />
              <span className="absolute -top-3 -right-3 bg-[#FCBF49] text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 font-mono">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline pr-1">
              Check out Basket
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHECKOUT CART DRAWER SLIDER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCouponCode={handleApplyCouponCode}
        onClearCart={handleClearCart}
        user={user}
        googleDocToken={googleDocToken}
        handleGoogleLogin={handleGoogleLogin}
      />

      {/* SOCIAL PROOF NOTIFICATION TINKERS */}
      <FeedbackToasts 
        onApplyCoupon={handleManualApplyCoupon} 
        openCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

    </div>
  );
}
