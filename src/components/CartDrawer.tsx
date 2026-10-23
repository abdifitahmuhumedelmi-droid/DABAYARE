import React, { useState, useMemo } from 'react';
import { User } from 'firebase/auth';
import { CartItem, MenuItem, Order, Coupon } from '../types';
import { exportReceiptToGoogleDoc } from '../lib/docsExporter';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShoppingBasket, Trash2, Tag, Percent, ArrowRight, ShieldCheck, 
  MapPin, Phone, Mail, FileText, CheckCircle2, Loader2, Sparkles, CreditCard, DollarSign 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCouponCode: (code: string) => Promise<boolean>;
  onClearCart: () => void;
  user: User | null;
  googleDocToken: string | null;
  handleGoogleLogin: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  appliedCoupon,
  onApplyCouponCode,
  onClearCart,
  user,
  googleDocToken,
  handleGoogleLogin
}: CartDrawerProps) {
  // Checkout & success states
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  
  // Exporter to Google Docs state
  const [isExportingDoc, setIsExportingDoc] = useState(false);
  const [exportedDocUrl, setExportedDocUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'apple-pay' | 'google-pay'>('card');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  // Card details mock
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCVC] = useState('');

  // Auto-fill emails if user is authenticated
  useMemo(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, name, email]);

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = deliveryMethod === 'delivery' ? 2.99 : 0.00;
  const tax = subtotal * 0.08; // 8% Sales tax

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return subtotal * (appliedCoupon.discountPercentage / 100);
  }, [appliedCoupon, subtotal]);

  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);

  // Apply Coupon action
  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoInput.trim() === '') return;
    
    const success = await onApplyCouponCode(promoInput.trim().toUpperCase());
    if (success) {
      setPromoInput('');
    } else {
      setPromoError('Voucher code invalid or expired!');
    }
  };

  // Submit checkout order
  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (name.trim() === '' || phone.trim() === '' || email.trim() === '') {
      alert('Please fill out Name, Phone, and Email to proceed!');
      return;
    }

    if (deliveryMethod === 'delivery' && address.trim() === '') {
      alert('Please fill out the Delivery address!');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate cooking, preparing tracking
    setTimeout(() => {
      const simulatedOrder: Order = {
        id: `BC-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        tax,
        discount,
        total: grandTotal,
        status: 'placed',
        timestamp: new Date().toISOString(),
        customerDetails: {
          name,
          phone,
          address: deliveryMethod === 'delivery' ? address : 'Dine-In Curbside Pick up',
          email,
          notes
        },
        paymentMethod,
        estimatedDeliveryTime: deliveryMethod === 'delivery' ? '22 Mins (Insulated Express)' : '10 Mins (Curbside DriveThru)'
      };

      setCompletedOrder(simulatedOrder);
      setIsPlacingOrder(false);
      onClearCart(); // empty cart
      
      // reset states
      setIsCheckoutExpanded(false);
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
      setPromoInput('');
    }, 2500);
  };

  // Export receipt details to Google Doc
  const handleExportToGoogleDocs = async () => {
    if (!completedOrder) return;
    
    // Explicit user confirmation dialog before modifying Google Docs files
    const confirmChoice = window.confirm(
      `Save a custom-styled BiteCraft PDF receipt of Order ID: ${completedOrder.id} to your personal Google Drive / Docs account?`
    );
    if (!confirmChoice) return;

    if (!googleDocToken) {
      setExportError('Token unavailable. Re-authenticate completely.');
      return;
    }

    setIsExportingDoc(true);
    setExportError(null);

    try {
      const docLink = await exportReceiptToGoogleDoc(completedOrder, googleDocToken);
      setExportedDocUrl(docLink);
    } catch (err: any) {
      console.error(err);
      setExportError(err?.message || 'Failed to export receipt. Ensure Google Docs api parameters are configured.');
    } finally {
      setIsExportingDoc(false);
    }
  };

  const handleApplePaySubmit = () => {
    alert('Simulating Apple Pay authorization... Touch ID approved!');
    handlePlaceOrderSubmit({ preventDefault: () => {} } as any);
  };

  const handleGooglePaySubmit = () => {
    alert('Simulating Google Pay secure billing... Card authorized!');
    handlePlaceOrderSubmit({ preventDefault: () => {} } as any);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Main Slide Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between"
              id="shopping-cart-drawer-panel"
            >
              
              {/* Header Box */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                  <ShoppingBasket className="w-5 h-5 text-[#FCBF49]" />
                  <h2 className="font-extrabold font-display text-base">
                    {completedOrder ? 'Receipt Verified' : 'Your Sabor Basket'}
                  </h2>
                </div>
                
                <button
                  onClick={() => {
                    // Reset success screens if user closes
                    if (completedOrder) {
                      setCompletedOrder(null);
                      setExportedDocUrl(null);
                      setExportError(null);
                    }
                    onClose();
                  }}
                  className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                  id="close-drawer-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BODY: Swaps based on completed screen */}
              {completedOrder ? (
                /* SUCCESS SCREEN */
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center" id="order-success-screen animate-fade">
                  {/* Glowing success checkmark */}
                  <div className="w-16 h-16 bg-emerald-50 rounded-full border-4 border-emerald-500/20 flex items-center justify-center text-emerald-600 font-extrabold text-2xl mx-auto animate-bounce mt-4 shadow-sm">
                    ✔️
                  </div>

                  <div>
                    <h2 className="text-2xl font-black font-display text-slate-950">
                      We Seared Your Order!
                    </h2>
                    <p className="text-slate-500 text-xs mt-1 font-mono">
                      ORDER ID: {completedOrder.id}
                    </p>
                  </div>

                  {/* Realtime Delivery Tracking HUD */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-150 p-4 text-left space-y-4">
                    <h4 className="text-xs font-black font-mono text-slate-400 uppercase tracking-widest leading-none">
                      Insulated Dispatch Tracker
                    </h4>

                    {/* Progress dots bar */}
                    <div className="relative flex justify-between items-center max-w-[280px] mx-auto pt-2">
                      <div className="absolute top-[34px] left-2 right-2 h-1 bg-slate-200"></div>
                      <div className="absolute top-[34px] left-2 w-1/3 h-1 bg-[#D62828]"></div>
                      
                      {/* Placed dot */}
                      <div className="flex flex-col items-center gap-1.5 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold text-[10px] border border-[#D62828] shadow-sm">
                          1
                        </div>
                        <span className="text-[9px] font-bold text-slate-900 font-mono">PLACED</span>
                      </div>

                      {/* Cooking dot */}
                      <div className="flex flex-col items-center gap-1.5 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] border-2 border-dashed border-red-500 animate-spin">
                          🍳
                        </div>
                        <span className="text-[9px] font-extrabold text-slate-900 font-mono animate-pulse">COOKING</span>
                      </div>

                      {/* Delivering dot */}
                      <div className="flex flex-col items-center gap-1.5 relative z-10 opacity-30">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-[10px]">
                          3
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 font-mono">ON TRANSIT</span>
                      </div>
                    </div>

                    <p className="text-center text-xs text-slate-500 font-medium">
                      Estimated Delivery Time: <strong>{completedOrder.estimatedDeliveryTime}</strong>
                    </p>
                  </div>

                  {/* RESTAURANT RECONCILIATION EXPORTER - GOOGLE WORKSPACE */}
                  <div className="bg-[#eff6ff] rounded-2xl border border-blue-150 p-5 text-left space-y-3 shadow-inner">
                    <div className="flex items-center gap-2 text-indigo-700">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-extrabold font-display text-sm">
                        Google Docs Integration
                      </h4>
                    </div>
                    
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Convert this order receipt into an official, monospaced formatted Google Doc file exported directly to your Drive! Accessible offline.
                    </p>

                    {/* Exporter Interaction */}
                    {exportedDocUrl ? (
                      <div className="space-y-2">
                        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-emerald-800 text-xs font-bold leading-normal flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Receipt exported successfully onto your Google Docs file list!</span>
                        </div>
                        <a
                          href={exportedDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors block text-center uppercase tracking-wider"
                          id="open-google-doc-receipt"
                        >
                          📂 Open Receipt in Google Docs
                        </a>
                      </div>
                    ) : (
                      <div>
                        {/* Auth Check for workspace */}
                        {user ? (
                          googleDocToken ? (
                            <button
                              onClick={handleExportToGoogleDocs}
                              disabled={isExportingDoc}
                              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                              id="export-receipt-firebase-btn"
                            >
                              {isExportingDoc ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  SAVING RECIPE TO DOCUMENTS...
                                </>
                              ) : (
                                <>
                                  <FileText className="w-4 h-4" />
                                  💾 SAVE RECEIPT TO GOOGLE DOCS
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-xs text-amber-700 bg-amber-50 rounded-xl p-3 border border-amber-100 font-semibold leading-normal">
                                🛡️ Google Authentication exists but lacking document write permissions. Please click button below to connect scopes completely.
                              </p>
                              <button
                                onClick={handleGoogleLogin}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                              >
                                Connect Google completely
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="space-y-3">
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              You are currently checked out as guest. Connect your Google account below to authenticate and export receipts.
                            </p>
                            <button
                              onClick={handleGoogleLogin}
                              className="w-full bg-white border border-slate-350 hover:bg-slate-50 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-3"
                              id="success-login-trigger"
                            >
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                              </svg>
                              <span>Sign in with Google to enable Exporter</span>
                            </button>
                          </div>
                        )}

                        {exportError && (
                          <p className="text-red-500 text-[10px] font-semibold mt-2 bg-red-50 border border-red-150 p-2 rounded-lg">
                            ❌ {exportError}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Summary receipt lists */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 text-left">
                    <h4 className="font-extrabold text-xs text-slate-800 border-b border-slate-200 pb-2 mb-3">
                      Receipt Summary
                    </h4>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {completedOrder.items.map((item) => (
                        <div key={item.id} className="text-xs text-slate-600 flex justify-between font-medium">
                          <span>{item.quantity}x {item.menuItem.name}</span>
                          <span className="font-mono text-slate-800">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between text-sm font-black text-slate-950">
                      <span>Grand Total Paid</span>
                      <span className="text-[#D62828] font-mono">${completedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Finish order and close button */}
                  <button
                    onClick={() => {
                      setCompletedOrder(null);
                      setExportedDocUrl(null);
                      setExportError(null);
                      onClose();
                    }}
                    className="w-full bg-slate-950 hover:bg-[#D62828] text-white py-4 rounded-2xl font-bold text-sm shadow-md transition-all uppercase tracking-wider"
                    id="finish-order-close"
                  >
                    Return to Menu
                  </button>
                </div>
              ) : (
                /* SHOPPING SYSTEM CHECKOUT ENGINE */
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    
                    {/* Switch Insulated Delivery options */}
                    {!isCheckoutExpanded && cartItems.length > 0 && (
                      <div className="bg-slate-50 p-1 rounded-2xl border border-slate-150 flex gap-1 select-none">
                        <button
                          onClick={() => setDeliveryMethod('delivery')}
                          className={`w-1/2 text-xs font-extrabold py-3 rounded-xl transition-all ${
                            deliveryMethod === 'delivery'
                              ? 'bg-slate-900 text-white shadow-md'
                              : 'bg-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          🛵 Insulated Delivery ($2.99)
                        </button>
                        <button
                          onClick={() => setDeliveryMethod('pickup')}
                          className={`w-1/2 text-xs font-extrabold py-3 rounded-xl transition-all ${
                            deliveryMethod === 'pickup'
                              ? 'bg-slate-900 text-white shadow-md'
                              : 'bg-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          🚗 Curbside Pick Up (Free)
                        </button>
                      </div>
                    )}

                    {isCheckoutExpanded ? (
                      /* Expanded Checkout Forms */
                      <form onSubmit={handlePlaceOrderSubmit} className="space-y-5 text-left animate-fade">
                        
                        <div className="flex justify-between items-center border-b border-slate-150 pb-3 mb-2">
                          <h3 className="font-extrabold font-display text-slate-900 text-base">
                            Insulated Order Details
                          </h3>
                          <button
                            type="button"
                            onClick={() => setIsCheckoutExpanded(false)}
                            className="text-xs text-[#D62828] hover:underline font-bold"
                          >
                            Return to Basket
                          </button>
                        </div>

                        {/* Customer Information */}
                        <div className="space-y-3">
                          <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block leading-none">
                            Contact info
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 text-slate-850 border border-slate-205 focus:ring-2 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-medium"
                          />
                          <div className="grid grid-cols-2 gap-3.5">
                            <input
                              type="tel"
                              required
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-slate-50 text-slate-850 border border-slate-205 focus:ring-2 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-medium"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 text-slate-850 border border-slate-205 focus:ring-2 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {/* Delivery address details (if delivery method is delivery) */}
                        {deliveryMethod === 'delivery' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block leading-none">
                              Delivery Location
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Insulated Street Address, Suite Number, Postcode"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full bg-slate-50 text-slate-850 border border-slate-205 focus:ring-2 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-medium"
                            />
                          </div>
                        )}

                        {/* Special request notes */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block leading-none">
                            Delivery notes (Gate code, elevator directions)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Optional: Ring bell, place on green mat..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-50 text-slate-850 border border-slate-205 focus:ring-2 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-medium"
                          />
                        </div>

                        {/* Checkout Payment Switcher */}
                        <div className="space-y-3">
                          <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block leading-none">
                            Secure payment mode
                          </label>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { k: 'card', name: 'Secure Card 💳' },
                              { k: 'cash', name: 'Cash On Delivery 💵' },
                              { k: 'apple-pay', name: 'Apple Pay ' },
                              { k: 'google-pay', name: 'Google Pay G' },
                            ].map(pay => (
                              <button
                                key={pay.k}
                                type="button"
                                onClick={() => setPaymentMethod(pay.k as any)}
                                className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                                  paymentMethod === pay.k
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                    : 'bg-white border-slate-150 text-slate-500 hover:bg-slate-50'
                                }`}
                              >
                                {pay.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Card input forms (active if 'card' is selected) */}
                        {paymentMethod === 'card' && (
                          <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3">
                            <div className="relative">
                              <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 w-4 h-4" />
                              <input
                                type="text"
                                required
                                placeholder="4111 0000 5555 4321"
                                value={cardNumber}
                                onChange={(e) => {
                                  // limit card characters mock
                                  setCardNumber(e.target.value.replace(/\D/g,'').substring(0, 16));
                                }}
                                className="w-full bg-white text-slate-850 border border-slate-205 focus:ring-1 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-mono font-bold"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3.5">
                              <input
                                type="text"
                                required
                                placeholder="MM / YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                                className="w-full bg-white text-slate-850 border border-slate-205 focus:ring-1 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 pl-4 pr-4 text-xs font-mono font-bold"
                              />
                              <input
                                type="password"
                                required
                                placeholder="CVC"
                                value={cardCvc}
                                onChange={(e) => setCardCVC(e.target.value.replace(/\D/g,'').substring(0, 3))}
                                className="w-full bg-white text-slate-850 border border-slate-205 focus:ring-1 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 pl-4 pr-4 text-xs font-mono font-bold"
                              />
                            </div>
                          </div>
                        )}

                        {/* Interactive Wallet CTA Pay buttons overlay */}
                        {paymentMethod === 'apple-pay' && (
                          <button
                            type="button"
                            onClick={handleApplePaySubmit}
                            className="w-full bg-black hover:bg-slate-900 border border-slate-800 text-white font-extrabold text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 font-sans"
                            id="apple-pay-checkout-btn"
                          >
                            <span>Pay with</span>
                            <span className="font-semibold select-none text-base"> Pay</span>
                          </button>
                        )}

                        {paymentMethod === 'google-pay' && (
                          <button
                            type="button"
                            onClick={handleGooglePaySubmit}
                            className="w-full bg-slate-950 hover:bg-slate-905 text-white border border-slate-850 font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 font-sans"
                            id="google-pay-checkout-btn"
                          >
                            <span>Pay with Secure</span>
                            <span className="font-extrabold select-none text-[#F77F00] text-sm tracking-wide">Google Pay</span>
                          </button>
                        )}

                        {/* Generic Form Button (applied on Card and Cash checkouts) */}
                        {(paymentMethod === 'card' || paymentMethod === 'cash') && (
                          <button
                            type="submit"
                            disabled={isPlacingOrder}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-black text-sm py-4.5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest leading-none mt-2 cursor-pointer"
                            id="card-cash-submit-btn"
                          >
                            {isPlacingOrder ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                AUTHORIZING BILLING SECTIONS...
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-4 h-4 stroke-[3px]" />
                                PLACE SECURE ORDER NOW
                              </>
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setIsCheckoutExpanded(false)}
                          className="w-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 py-3 rounded-xl text-xs font-bold transition-all text-center block mt-1"
                        >
                          Keep modifying order
                        </button>

                      </form>
                    ) : (
                      /* Cart Item list */
                      <>
                        {cartItems.length > 0 ? (
                          <div className="space-y-4" id="drawer-items-list-container">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="bg-slate-50 p-4 rounded-2xl border border-slate-150 relative flex items-start gap-4 transition-transform hover:-translate-y-0.5"
                                id={`basket-item-row-${item.id}`}
                              >
                                {/* Thumbnail */}
                                <img
                                  src={item.menuItem.image}
                                  alt={item.menuItem.name}
                                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0 pr-6 text-left">
                                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
                                    {item.menuItem.name}
                                  </h4>
                                  <span className="text-[10px] text-slate-400 font-mono italic block mt-0.5">
                                    {item.menuItem.calories} Cal each
                                  </span>

                                  {/* Custom details display */}
                                  {item.customization && (
                                    <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 rounded-md px-1.5 py-0.5 inline-block mt-1.5 truncate max-w-full">
                                      👉 {item.customization}
                                    </span>
                                  )}

                                  {/* Price calculation */}
                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="font-extrabold text-red-650 text-sm font-display">
                                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                                    </span>

                                    {/* Qty controller buttons list */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                        className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-650 border border-slate-200 flex items-center justify-center rounded-lg text-xs font-bold font-mono"
                                      >
                                        -
                                      </button>
                                      <span className="font-black text-slate-900 text-xs w-4 text-center font-mono">{item.quantity}</span>
                                      <button
                                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                        className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-650 border border-slate-200 flex items-center justify-center rounded-lg text-xs font-bold font-mono"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>

                                </div>

                                {/* Trash bin absolute */}
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                  aria-label="Remove item from basket"
                                  id={`remove-item-row-${item.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Empty Basket screen layout */
                          <div className="text-center py-20 p-6 space-y-4">
                            <span className="text-5xl block animate-pulse">🛒</span>
                            <h3 className="font-extrabold text-slate-905 text-lg">Your gourmet basket is empty</h3>
                            <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                              Browse our certified burgers and pizza offerings, select customizable modifiers, and checkout with insulated premium courier delivery.
                            </p>
                            <button
                              onClick={onClose}
                              className="bg-[#D62828] hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md uppercase tracking-wider"
                            >
                              Explore Menu Now
                            </button>
                          </div>
                        )}

                        {/* Live applied coupons indicator */}
                        {appliedCoupon && cartItems.length > 0 && (
                          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-150 text-left flex items-start gap-3">
                            <div className="p-2 bg-emerald-500 text-white rounded-xl">
                              <Percent className="w-5 h-5 stroke-[3px]" />
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                              <h5 className="font-extrabold text-emerald-800 text-xs flex items-center gap-1">
                                SAVED {appliedCoupon.discountPercentage}% FLAT!
                              </h5>
                              <p className="text-[11px] text-emerald-600 font-semibold truncate leading-tight mt-0.5">
                                Coupon <strong>{appliedCoupon.code}</strong> Applied successfully!
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Promo Coupon Form */}
                        {cartItems.length > 0 && (
                          <form onSubmit={handleApplyPromo} className="space-y-2 text-left">
                            <label className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block leading-none">
                              Apply Promotion Coupon
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="E.g., BITEFIRST15..."
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                                className="flex-1 bg-slate-50 text-slate-850 focus:ring-1 focus:ring-[#F77F00] focus:outline-none rounded-xl py-3 px-4 text-xs font-mono font-extrabold uppercase placeholder:text-slate-400 border border-slate-205"
                              />
                              <button
                                type="submit"
                                className="bg-slate-900 hover:bg-red-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all"
                                id="apply-coupon-drawer-btn"
                              >
                                Apply
                              </button>
                            </div>
                            {promoError && (
                              <p className="text-red-500 font-bold text-[10px] font-sans mt-1">
                                ⚠️ {promoError}
                              </p>
                            )}
                          </form>
                        )}
                      </>
                    )}

                  </div>

                  {/* BOTTOM ACCUMULATOR PANEL (if anything in basket & not success) */}
                  {cartItems.length > 0 && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50 text-left space-y-4">
                      
                      {/* Subtotal columns */}
                      <div className="space-y-1.5 text-xs text-slate-500 font-medium font-sans">
                        <div className="flex justify-between">
                          <span>Subtotal Items</span>
                          <span className="font-mono text-slate-800">${subtotal.toFixed(2)}</span>
                        </div>
                        {deliveryFee > 0 && (
                          <div className="flex justify-between">
                            <span>Insulated Delivery Courier</span>
                            <span className="font-mono text-slate-800">${deliveryFee.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Local estimated Tax (8%)</span>
                          <span className="font-mono text-slate-800">${tax.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-emerald-600 font-bold">
                            <span>Voucher Deduction</span>
                            <span className="font-mono">-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="border-t border-slate-200 pt-3.5 flex justify-between text-base font-black text-slate-950 font-display">
                          <span>Grand Total Slashed</span>
                          <span className="text-[#D62828] font-mono">${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Expand checkout CTA button */}
                      {!isCheckoutExpanded && (
                        <button
                          onClick={() => setIsCheckoutExpanded(true)}
                          className="w-full bg-[#D62828] hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-widest leading-none cursor-pointer"
                          id="proceed-checkout-cta"
                        >
                          Checkout Basket Case
                          <ArrowRight className="w-4 h-4 stroke-[3.2px]" />
                        </button>
                      )}

                      {/* Decal Secure indicators */}
                      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                        <span>Fully PCI Encrypted & Secured Checkout standard</span>
                      </div>

                    </div>
                  )}
                </>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
