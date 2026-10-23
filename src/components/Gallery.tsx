import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'food', label: 'Dish Styling' },
    { key: 'kitchen', label: 'Craft Kitchen' },
    { key: 'restaurant', label: 'Dine-In Area' },
    { key: 'customers', label: 'Happy Customers' },
  ];

  // Filtering
  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(it => it.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    // Find absolute index of item in global GALLERY_ITEMS
    const item = filteredItems[index];
    const globalIndex = GALLERY_ITEMS.findIndex(g => g.id === item.id);
    if (globalIndex !== -1) {
      setLightboxIndex(globalIndex);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section id="gallery-section" className="py-20 bg-white border-y border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold text-red-650 bg-red-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-red-600" />
            Kitchen portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Our Inside Craft Gallery
          </h2>
          <p className="text-slate-500 text-sm">
            Behind the curtains: Tour our pristine clinical-grade kitchens, local organic ingredients, cozy dine-in corners, and the smiling crowd of our returning patrons.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto select-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              id={`gallery-tab-${cat.key}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="gallery-image-grid">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative cursor-pointer aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl border border-slate-100"
              id={`gallery-item-${item.id}`}
            >
              {/* Photo */}
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="absolute top-4 right-4 bg-white/20 p-2.5 rounded-full backdrop-blur-sm self-end">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold mb-1">
                  {item.category.toUpperCase()}
                </span>
                <p className="font-bold text-xs sm:text-sm leading-tight text-white line-clamp-2">
                  {item.caption}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
            
            {/* Upper controls line */}
            <div className="absolute top-4 w-full flex justify-between items-center px-6">
              <span className="text-slate-400 font-mono text-xs">
                IMAGE {lightboxIndex + 1} OF {GALLERY_ITEMS.length}
              </span>
              <button
                onClick={handleCloseLightbox}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Lightbox"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Back Button */}
            <button
               onClick={handleLightboxPrev}
               className="absolute left-4 p-4 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all cursor-pointer"
               aria-label="Previous image"
               id="lightbox-prev-btn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Container Image */}
            <div className="max-w-4xl max-h-[75vh] w-full flex flex-col justify-center items-center">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_ITEMS[lightboxIndex].url}
                alt={GALLERY_ITEMS[lightboxIndex].caption}
                className="max-h-[62vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              />
              <p className="text-white text-center text-sm font-semibold max-w-xl leading-relaxed mt-6">
                {GALLERY_ITEMS[lightboxIndex].caption}
              </p>
              <span className="text-orange-400 font-mono text-xs uppercase tracking-widest mt-1">
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
            </div>

            {/* Next Button */}
            <button
               onClick={handleLightboxNext}
               className="absolute right-4 p-4 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all cursor-pointer"
               aria-label="Next image"
               id="lightbox-next-btn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
