import { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prevIdx) => (prevIdx + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prevIdx) => (prevIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const review = TESTIMONIALS[currentIdx];

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 scroll-mt-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold text-[#F77F00] bg-orange-100/60 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            Social validation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Loved By 18,000+ Foodies
          </h2>
          <p className="text-slate-500 text-sm">
            Read real feedback from verified customers, families, and high-energy corporate fast-food partners. Real reviews for real meals.
          </p>
        </div>

        {/* Carousel Frame */}
        <div className="relative bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-md relative z-10">
          
          {/* Big Quote Symbol */}
          <span className="absolute top-2 left-6 text-9xl text-slate-100 select-none font-serif leading-none font-bold">
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex flex-col justify-between"
              id={`review-slide-${review.id}`}
            >
              
              {/* Rating Star list */}
              <div className="flex gap-1 mb-6 justify-center sm:justify-start">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFB30F] fill-current" />
                ))}
              </div>

              {/* Review Text content */}
              <blockquote className="text-slate-700 text-base sm:text-lg italic leading-relaxed text-center sm:text-left mb-8 min-h-[100px]">
                "{review.text}"
              </blockquote>

              {/* Author Info block */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-6">
                
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      {review.author}
                      {review.verified && (
                        <span className="inline-flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-sans font-bold">
                          <CheckCircle2 className="w-3 h-3 fill-current" />
                          Verified Purchase
                        </span>
                      )}
                    </h4>
                    <p className="text-slate-400 text-xs font-mono">{review.date}</p>
                  </div>
                </div>

                {/* Rating source trust badge */}
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block"></span>
                  Gourmet Guestbook
                </span>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Control buttons overlay */}
        <div className="flex justify-center items-center gap-4 mt-8 relative z-20">
          <button
            onClick={handlePrev}
            className="w-11 h-11 bg-white hover:bg-red-50 text-slate-800 hover:text-red-650 transition-colors rounded-xl border border-slate-200 flex items-center justify-center shadow-sm cursor-pointer"
            aria-label="Previous Review"
            id="testimonial-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Progress Dots */}
          <div className="flex gap-2.5">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  currentIdx === idx ? 'bg-red-600 w-6' : 'bg-slate-350'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 bg-white hover:bg-red-50 text-slate-800 hover:text-red-650 transition-colors rounded-xl border border-slate-200 flex items-center justify-center shadow-sm cursor-pointer"
            aria-label="Next Review"
            id="testimonial-next-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
