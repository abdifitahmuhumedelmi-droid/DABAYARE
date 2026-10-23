import { useState, useEffect } from 'react';
import { SPECIAL_COUPONS } from '../data';
import { motion } from 'motion/react';
import { Gift, Copy, Check, Timer, Sparkles, Percent } from 'lucide-react';

interface SpecialOffersProps {
  onApplyCoupon: (code: string) => void;
}

export default function SpecialOffers({ onApplyCoupon }: SpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown clock state
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 15
  });

  // Tick the countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart to keep the urgency rolling
          return { hours: 4, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="offers-section" className="py-20 bg-slate-900 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1 bg-[#F77F00]/10 text-[#F77F00] border border-[#F77F00]/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest">
            <Gift className="w-4 h-4 text-[#F77F00]" />
            Exclusive Food Passes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Limited-Time Sizzling Deals
          </h2>
          <p className="text-slate-400 text-sm">
            Grab our active promo vouchers before they melt away. Tap any voucher to apply it directly to your shopping basket details.
          </p>

          {/* Real-time Countdown Timer Frame */}
          <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-500/20 px-4 py-2.5 rounded-2xl mt-4" id="flash-deal-countdown">
            <Timer className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-red-400 font-bold text-xs uppercase font-mono tracking-wider">Flash Deals Expire in:</span>
            <div className="flex gap-1.5 font-mono text-sm font-extrabold text-white">
              <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded-lg border border-red-500/10">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded-lg border border-red-500/10">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded-lg border border-red-500/10">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Coupons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_COUPONS.map((coupon, idx) => {
            const isCurrentCopied = copiedCode === coupon.code;
            return (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/60 p-6 relative overflow-hidden group hover:border-[#F77F00]/50 transition-all shadow-lg"
                id={`coupon-card-${coupon.code}`}
              >
                
                {/* Visual Background Accent Details */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-600/20 to-orange-500/10 rounded-full blur-2xl group-hover:scale-130 transition-transform"></div>
                <div className="absolute -left-4 -bottom-4 text-slate-700/10 font-bold text-9xl select-none leading-none font-mono">
                  %
                </div>

                {/* Card Header Info */}
                <div className="flex items-start justify-between relative z-10 mb-5">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#D62828] to-[#F77F00] text-white">
                    <Percent className="w-5 h-5 font-bold" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#FCBF49] bg-[#FCBF49]/10 border border-[#FCBF49]/20 px-2.5 py-1 rounded-full">
                    {coupon.expiryText}
                  </span>
                </div>

                {/* Details */}
                <h3 className="font-extrabold font-display text-white text-lg mb-1 leading-tight">
                  Save {coupon.discountPercentage}% Flat Slashed
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 h-12">
                  {coupon.description}
                </p>

                {/* Action field copy voucher box */}
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 flex items-center justify-between gap-3 relative z-10">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">VOUCHER CODE</span>
                    <p className="text-sm font-extrabold text-[#F77F00] font-mono tracking-wider truncate">{coupon.code}</p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopyCode(coupon.code)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[11px] transition-colors ${
                      isCurrentCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#FCBF49] hover:bg-[#e0a631] text-slate-900 hover:text-slate-950'
                    }`}
                    id={`copy-btn-${coupon.code}`}
                  >
                    {isCurrentCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        APPLIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        COPY & APPLY
                      </>
                    )}
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
