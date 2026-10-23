import { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Star, Check, Sparkles, Filter, ChevronDown, ListFilter, Plus, Heart } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity: number, customizations?: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function MenuSection({ onAddToCart, favorites, onToggleFavorite }: MenuSectionProps) {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default'); // 'default', 'price-low', 'price-high', 'rating'
  const [selectedTag, setSelectedTag] = useState<string>('all'); // 'all', 'Spicy', 'Vegetarian', 'Best Seller'
  
  // Customization modal states
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customQty, setCustomQty] = useState(1);
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');

  // Categories list
  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'burgers', label: 'Burgers 🍔' },
    { key: 'pizza', label: 'Pizzas 🍕' },
    { key: 'chicken', label: 'Chicken 🍗' },
    { key: 'fries', label: 'Fries 🍟' },
    { key: 'wraps', label: 'Wraps 🌯' },
    { key: 'desserts', label: 'Desserts 🍰' },
    { key: 'drinks', label: 'Drinks 🥤' },
  ];

  // Available tags to filter
  const tagsList = ['all', 'Best Seller', 'Spicy', 'Vegetarian', 'Premium'];

  // 1. Filtering logic
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Search query match
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Category match
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Tag match
    if (selectedTag !== 'all') {
      result = result.filter((item) => item.tags?.includes(selectedTag));
    }

    // Sorting match
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // Open Customization Helper
  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomQty(1);
    setCustomOptions([]);
    setCustomNotes('');
  };

  const toggleCustomOption = (opt: string) => {
    if (customOptions.includes(opt)) {
      setCustomOptions(customOptions.filter((o) => o !== opt));
    } else {
      setCustomOptions([...customOptions, opt]);
    }
  };

  // Confirm Customize add
  const handleConfirmCustomize = () => {
    if (!customizingItem) return;
    
    // Combine custom checkboxes & notes
    let finalCustomStrings: string[] = [...customOptions];
    if (customNotes.trim() !== '') {
      finalCustomStrings.push(`Instructions: ${customNotes.trim()}`);
    }
    
    const customizationText = finalCustomStrings.join(', ');
    
    // Call main app cart action
    onAddToCart(customizingItem, customQty, customizationText);
    
    // Reset and close
    setCustomizingItem(null);
  };

  return (
    <section id="menu-section" className="py-20 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-extrabold uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
            Craving satisfied
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Explore the BiteCraft Menu
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Sift through our selection of organic premium burgers, hot sourdough pizzas, sweet ginger wings, and loaded waffle baskets fries. Pure crunch, no compromises.
          </p>
        </div>

        {/* Search, Tag filter, Sort inputs line */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:space-y-0 lg:flex items-center justify-between gap-6 mb-10">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search burgers, pizzas, wings, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 border-0 focus:ring-2 focus:ring-[#F77F00] outline-none font-medium text-sm py-3.5 pl-12 pr-4 rounded-2xl placeholder:text-slate-400"
              id="menu-search-input"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Tag Filter */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-transparent text-slate-700 text-xs font-bold outline-none border-none cursor-pointer"
                id="menu-tag-filter"
              >
                <option value="all">Filter tags</option>
                {tagsList.filter(t => t !== 'all').map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <ListFilter className="w-4 h-4 text-indigo-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-700 text-xs font-bold outline-none border-none cursor-pointer"
                id="menu-sort-selector"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest First</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Tabs Scroll */}
        <div className="flex overflow-x-auto gap-3 pb-6 select-none scrollbar-thin no-scrollbar" id="menu-tabs-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-150 hover:bg-slate-50'
              }`}
              id={`category-tab-${cat.key}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count indicator */}
        <div className="mb-6 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>SHOWING {filteredItems.length} UNIQUE RECIPES</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#D62828] hover:underline font-bold"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Grid of Product Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="menu-grid-items">
            {filteredItems.map((item, idx) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-slate-100 flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all h-full"
                  id={`product-card-${item.id}`}
                >
                  
                  {/* Photo Area */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Popular / Combo Badge */}
                    {item.isPopular && (
                      <span className="absolute top-4 left-4 bg-[#F77F00] text-white font-black text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 fill-current" />
                        POPULAR BITE
                      </span>
                    )}

                    {/* Heart Favorite Trigger */}
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 text-slate-400 hover:text-red-500 shadow-md transition-colors backdrop-blur-sm cursor-pointer"
                      aria-label="Add to Favorites"
                      id={`favorite-badge-${item.id}`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating + Calories Row */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                        <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                          {item.rating} <Star className="w-3 h-3 fill-current" />
                        </span>
                        <span>{item.calories} Calories</span>
                      </div>

                      {/* Name of food item */}
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight mb-2 hover:text-[#D62828] transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>

                      {/* Tags Sparkle line */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-1.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div>
                        <span className="text-[10px] block text-slate-400 font-mono leading-none mb-1">PRICE USD</span>
                        <span className="text-xl font-extrabold text-[#D62828] font-display">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenCustomize(item)}
                        className="bg-slate-900 hover:bg-[#D62828] text-white p-2.5 rounded-full transition-colors font-bold shadow-md cursor-pointer group flex items-center justify-center"
                        id={`btn-add-cart-${item.id}`}
                        aria-label="Add product to order"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <span className="text-4xl">🤷‍♂️</span>
            <h3 className="font-bold text-slate-800 text-lg mt-4">No matching recipes found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
              We couldn’t find any fast food matching your criteria. Try resetting keywords, clear tags, or search another delicious category!
            </p>
          </div>
        )}

      </div>

      {/* Premium Food Customization Overlay Modal */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100"
              id="customize-dialog-modal"
            >
              {/* Product Header */}
              <div className="p-6 bg-slate-900 text-white relative">
                <span className="text-xs uppercase tracking-wider font-mono text-yellow-400 font-black">
                  Customize & Upgrade Bite
                </span>
                <h3 className="font-extrabold text-xl font-display mt-1">
                  {customizingItem.name}
                </h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Tailor your cooking preferences. Our premium chefs will coordinate everything perfectly.
                </p>
              </div>

              {/* Customization Options list */}
              <div className="p-6 space-y-5 max-h-[350px] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-black font-mono text-slate-400 uppercase tracking-wide mb-3">
                    Upgrade options
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      'Add Extra Melty Cheddar Cheese (+$1.00)',
                      'Include Glazed Applewood Bacon (+$1.50)',
                      'Upgrade to Organic Sourdough Bun (+$1.00)',
                      'Double-size the Burger portion! (+$3.50)',
                      'No Pickles',
                      'No Onions',
                      'Extra Truffle Mustard Sauce Spread',
                    ].map((opt) => {
                      const isChecked = customOptions.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleCustomOption(opt)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            isChecked
                              ? 'bg-slate-50 border-slate-900 text-slate-900'
                              : 'bg-white border-slate-150 text-slate-600 hover:bg-slate-50/50'
                          }`}
                        >
                          <span>{opt}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300'}`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chef Special Notes */}
                <div>
                  <h4 className="text-xs font-black font-mono text-slate-400 uppercase tracking-wide mb-2">
                    Chef instructions (allergies, prep requests)
                  </h4>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="E.g., Please well done, cut wrapper in half, serve dipping sauces on side..."
                    className="w-full bg-slate-50 font-medium text-slate-800 border-0 focus:ring-2 focus:ring-[#F77F00] outline-none text-xs rounded-xl p-3 placeholder:text-slate-400"
                    id="chef-notes-textarea"
                  />
                </div>

                {/* Quantity adjustments */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-black font-mono text-slate-400 uppercase">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCustomQty(q => Math.max(1, q - 1))}
                      className="w-9 h-9 border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center rounded-xl font-bold"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-slate-900 text-base w-6 text-center">{customQty}</span>
                    <button
                      onClick={() => setCustomQty(q => q + 1)}
                      className="w-9 h-9 border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center rounded-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="w-1/2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold transition-all"
                  id="cancel-customize-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmCustomize}
                  className="w-1/2 bg-slate-900 hover:bg-[#D62828] text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-md"
                  id="add-customized-item-btn"
                >
                  Add to Basket Case
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
