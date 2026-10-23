import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Ticket, Copy, Check } from 'lucide-react';

interface NewsletterProps {
  onApplyCoupon: (code: string) => void;
}

export default function Newsletter({ onApplyCoupon }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    // Simulate API registering
    setSubmitted(true);
  };

  const handleCopyNewCoupon = () => {
    navigator.clipboard.writeText('NEWSBITE15');
    setCopied(true);
    onApplyCoupon('NEWSBITE15');
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section className="py-20 bg-gradient-to-tr from-[#D62828] to-[#F77F00] text-white relative overflow-hidden" id="newsletter-section">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-12 -right-12 text-black/10 font-black text-9xl select-none leading-none">
        BITE
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20 p-8 sm:p-12 text-center shadow-2xl relative">
          
          <div className="w-14 h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-md shadow-red-905/30">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
            Join the BiteCraft VIP Sabor Club
          </h2>
          <p className="text-red-50 text-xs sm:text-sm max-w-xl mx-auto mt-3 mb-8">
            Subscribe to our newsletter list! We will send you early announcements for secret off-menu releases, seasonal combos, and an **instant 15% off voucher** right now.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="newsletter-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                id="newsletter-form"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-[#FCBF49] outline-none font-semibold text-xs py-4 pl-11 pr-4 rounded-2xl placeholder:text-slate-400"
                    id="newsletter-email-input"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FCBF49] hover:bg-[#e0a631] text-slate-900 font-extrabold text-xs px-6 py-4 rounded-2xl transition-all shadow-md flex-shrink-0 cursor-pointer"
                  id="newsletter-submit-btn"
                >
                  Unlock 15% off
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="newsletter-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-md mx-auto bg-white rounded-2xl p-6 text-slate-800 shadow-xl border border-red-100"
                id="newsletter-success-container"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-extrabold text-[#D62828] text-base font-display">Welcome to the Club!</h3>
                <p className="text-slate-500 text-xs leading-relaxed mt-1 mb-4">
                  We have successfully registered your interest! We unlocked a special, one-time discount code for you:
                </p>

                {/* Unlocked coupon */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="text-left font-mono">
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">Coupon Code</span>
                    <p className="text-sm font-black text-red-650" id="newsletter-code-display">NEWSBITE15</p>
                  </div>
                  <button
                    onClick={handleCopyNewCoupon}
                    className="flex items-center gap-1 bg-[#F77F00] text-white px-3 py-2 rounded-lg font-bold text-xs"
                    id="copy-newsletter-coupon-btn"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        SAVED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        CLAIM
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
