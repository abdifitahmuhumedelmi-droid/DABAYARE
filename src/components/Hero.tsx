import { motion } from 'motion/react';
import { ChefHat, Flame, ShieldCheck, ShoppingCart, Star, Timer, Users } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export default function Hero({ onScrollToMenu }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#111827] text-white flex items-center overflow-hidden pt-24 md:pt-28 pb-16"
    >
      {/* Absolute ambient lights & mesh grid background */}
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200')" }}></div>
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-red-600 rounded-full blur-[100px] opacity-35 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-orange-500 rounded-full blur-[80px] opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text and CTAs column */}
          <div className="text-left space-y-6">
            
            {/* Top row status badges */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 text-white font-bold text-xs rounded-full uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                We are open now
              </span>
              <span className="inline-flex items-center gap-1 bg-[#F77F00]/20 text-[#FF9F1C] border border-[#F77F00]/40 px-3 py-1 rounded-full text-xs font-bold font-mono">
                ⚡ 15% OFF Code: BITEFIRST15
              </span>
            </div>

            {/* Premium Header */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
              Fresh. <span className="text-[#F77F00]">Fast.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
                Deliciously Craft.
              </span>
            </h1>

            {/* Deep description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Freshly seared 100% prime angus beef patties patties, artisanal hot-honey pepperoni pizzas, and loaded cheese waffle basket fries cooked to order and dispatched in under 22 minutes.
            </p>

            {/* Big Premium CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onScrollToMenu}
                className="w-full sm:w-auto bg-[#D62828] hover:bg-[#b52020] text-white px-8 py-4 rounded-2xl font-extrabold text-base transition-colors shadow-xl flex items-center justify-center gap-3 border border-red-500 cursor-pointer"
                id="hero-order-primary-cta"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Gourmet Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, bg: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onScrollToMenu}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-menu-secondary-cta"
              >
                Explore Menu
              </motion.button>
            </div>

            {/* trust features grid stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              
              <div className="text-left">
                <span className="text-[#FFB30F] font-bold text-lg sm:text-2xl flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 text-[#FFB30F] fill-current inline" />
                </span>
                <span className="text-slate-400 text-xs block font-medium mt-0.5">Google Rating</span>
                <span className="text-[10px] text-[#FCBF49] font-mono block">18,400+ reviews</span>
              </div>

              <div className="text-left border-l border-white/10 pl-4">
                <span className="text-white font-bold text-lg sm:text-2xl flex items-center gap-1.5 font-mono">
                  22 <Timer className="w-4 h-4 text-[#F77F00] inline" />
                </span>
                <span className="text-slate-400 text-xs block font-medium mt-0.5">Average Mins</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide block">Lightning Fast</span>
              </div>

              <div className="text-left border-l border-white/10 pl-4">
                <span className="text-white font-bold text-lg sm:text-2xl flex items-center gap-1.5 font-mono">
                  12k+ <Users className="w-4 h-4 text-[#FCBF49] inline" />
                </span>
                <span className="text-slate-400 text-xs block font-medium mt-0.5">Satisfied Diners</span>
                <span className="text-[10px] text-slate-400 block font-light">Served monthly</span>
              </div>

            </div>

          </div>

          {/* Graphical/Image column with floating illustrations mockup */}
          <div className="relative flex justify-center items-center lg:pl-6">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px]">
              
              {/* Outer decorative ring glowing */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-500/30 animate-spin" style={{ animationDuration: '40s' }}></div>
              <div className="absolute inset-6 rounded-full border border-orange-500/20"></div>

              {/* Central Premium Food Image (Truffle Burger styling) */}
              <motion.div 
                initial={{ transform: 'scale(0.9)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-12 rounded-full overflow-hidden shadow-2xl border-4 border-[#FCBF49] animate-float relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600"
                  alt="Truffle Umami Bacon Burger Supreme"
                  className="w-full h-full object-cover select-none scale-102 group-hover:scale-108 transition-all duration-700"
                />
                
                {/* Floating caption detail overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-[#FCBF49] py-1.5 px-3 rounded-full text-[11px] font-bold tracking-wider text-white shadow-xl flex items-center gap-1 whitespace-nowrap">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  OUR TRUFFLE UMAMI BACON BURGER
                </div>
              </motion.div>

              {/* Floating feature cards */}
              {/* Card 1: Chef Special */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-8 -left-4 bg-white text-slate-800 p-3 rounded-2xl shadow-2xl max-w-[170px] border border-slate-100 hidden sm:flex items-center gap-2.5"
              >
                <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">Fresh Sourced</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Never frozen beef</p>
                </div>
              </motion.div>

              {/* Card 2: Safe delivery */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-16 -right-6 bg-white text-slate-800 p-3 rounded-2xl shadow-2xl max-w-[180px] border border-slate-100 hidden sm:flex items-center gap-2.5 animate-bounce"
                style={{ animationDuration: '6s' }}
              >
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 leading-tight">100% Secure</h4>
                  <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Money-back Guarantee</p>
                </div>
              </motion.div>

              {/* Little Floating Food items in background */}
              <span className="absolute -top-4 right-12 text-3xl animate-bounce select-none pointer-events-none" style={{ animationDuration: '4s' }}>🍕</span>
              <span className="absolute bottom-8 left-0 text-3xl animate-bounce select-none pointer-events-none" style={{ animationDuration: '5s' }}>🍟</span>
              <span className="absolute top-1/2 -right-4 text-3xl animate-bounce select-none pointer-events-none" style={{ animationDuration: '4.5s' }}>🥤</span>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
