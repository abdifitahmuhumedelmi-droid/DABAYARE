import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, LogOut, CheckCircle2, CloudLightning, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  googleDocToken: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  cartCount: number;
  onCartOpen: () => void;
  isLoggingIn: boolean;
}

export default function Navbar({
  user,
  googleDocToken,
  handleLogin,
  handleLogout,
  cartCount,
  onCartOpen,
  isLoggingIn
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Monitor screen scroll to swap styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu-section' },
    { label: 'Offers', href: '#offers-section' },
    { label: 'Reviews', href: '#testimonials-section' },
    { label: 'Gallery', href: '#gallery-section' },
    { label: 'Location', href: '#location-section' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
      id="main-navigation-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Segment */}
          <a href="#home" className="flex items-center gap-2 group-hover:scale-105 transition-transform" id="brand-logo-link">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-md border-2 border-white">
              B
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-[#D62828] select-none block leading-none">
                Bite<span className="text-[#F77F00]">Craft</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FCBF49] font-bold block mt-0.5">
                Premium Diner
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-semibold text-sm transition-colors relative group py-2 ${
                  isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-slate-900 md:text-white hover:text-yellow-300'
                }`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-all origin-left duration-250"></span>
              </a>
            ))}
          </div>

          {/* Action Utilities Buttons */}
          <div className="flex items-center gap-3">
            {/* Google Docs Connection Indicator */}
            {user && (
              <div 
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold select-none ${
                  googleDocToken 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}
                title={googleDocToken ? "Connected to Google Workspace Docs!" : "Connected via Firebase Auth, missing active Google session"}
              >
                {googleDocToken ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10" />
                    <span>Docs Connected</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    <span>Docs Pending</span>
                  </>
                )}
              </div>
            )}

            {/* Authentication Button Segment */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 py-1.5 px-2.5 rounded-full focus:outline-none transition-all"
                    id="user-profile-dropdown-btn"
                  >
                    {user.photoURL ? (
                      <img
                        referrerPolicy="no-referrer"
                        src={user.photoURL}
                        alt={user.displayName || 'User Profile'}
                        className="w-7 h-7 rounded-full object-cover border border-slate-300"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="hidden sm:inline font-bold text-xs text-slate-800 truncate max-w-[100px]">
                      {user.displayName?.split(' ')[0] || 'Member'}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute right-0 mt-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 text-left z-50 overflow-hidden"
                        id="user-dropdown-container"
                      >
                        <div className="px-4 py-2 border-b border-slate-100 mb-2">
                          <p className="font-extrabold text-sm text-slate-900 truncate">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        
                        <div className="px-4 py-1.5 text-xs text-slate-500 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                          <span>Workspace Ready</span>
                        </div>

                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2 font-semibold"
                          id="logout-btn"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button text-xs"
                  id="google-login-navbar-btn"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents hidden sm:inline text-xs">Sign In</span>
                    <span className="gsi-material-button-contents sm:hidden text-xs">Login</span>
                  </div>
                </button>
              )}
            </div>

            {/* Shopping Basket button with counter */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className={`relative p-2.5 rounded-full border flex items-center justify-center transition-all ${
                isScrolled
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                  : 'bg-white/10 header-cart-transparent hover:bg-white/20 border-white/20 text-white md:bg-white/15'
              }`}
              id="header-basket-trigger"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-full transition-all ${
                isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              id="mobile-navigation-toggle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-2xl"
            id="mobile-nav-drawer"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bold text-slate-700 hover:text-red-600 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-all text-sm block"
                  id={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
              {user && !googleDocToken && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-semibold mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  Connect Google completely to export receipts to Google Docs!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
