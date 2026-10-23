import { Facebook, Twitter, Instagram, ArrowUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800 pt-16 pb-8" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-12 border-b border-slate-850">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4 text-left">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-650 rounded-full flex items-center justify-center text-white font-extrabold text-lg border border-white/20">
                B
              </div>
              <div>
                <span className="font-display font-black text-white text-lg block leading-none">
                  Bite<span className="text-[#F77F00]">Craft</span>
                </span>
                <span className="text-[9px] uppercase font-mono text-[#FCBF49] block mt-0.5 tracking-wider font-extrabold">
                  Premium fast food
                </span>
              </div>
            </a>
            <p className="text-slate-400 text-xs leading-relaxed">
              We coordinate USDA prime cuts, organic greens, and sourdough hand-stretched pizzas, shipping warm heaters insulated packages directly in average 22 minutes. Crafting cravings daily.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="#facebook" className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-white rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-white rounded-lg transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-white rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-4 text-left">
            <h4 className="text-[#FCBF49] font-bold text-xs uppercase font-mono tracking-wider">
              Quick Directory
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#home" className="hover:text-white transition-colors">Home Landing</a></li>
              <li><a href="#menu-section" className="hover:text-white transition-colors">Browse Gourmet Menu</a></li>
              <li><a href="#offers-section" className="hover:text-white transition-colors">Active Sizzling Deals</a></li>
              <li><a href="#testimonials-section" className="hover:text-white transition-colors">Diners Feedback</a></li>
              <li><a href="#gallery-section" className="hover:text-white transition-colors">Craft Kitchen Gallery</a></li>
              <li><a href="#location-section" className="hover:text-white transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-4 text-left">
            <h4 className="text-[#FCBF49] font-bold text-xs uppercase font-mono tracking-wider">
              Dine-In Contacts
            </h4>
            <div className="space-y-3 text-xs leading-normal">
              <p>
                <strong>Diner Address:</strong> <br />
                742 Gourmet Plaza, Sector 4, <br />
                Silicon Valley, CA 94016
              </p>
              <p>
                <strong>Ring Hotline:</strong> <br />
                <span className="font-mono text-white">+1 (800) 555-BITE (2483)</span>
              </p>
              <p>
                <strong>Email Support:</strong> <br />
                <span className="text-white hover:underline">support@bitecraftfastfood.com</span>
              </p>
            </div>
          </div>

          {/* Column 4: Sourcing integrity and cards */}
          <div className="space-y-4 text-left">
            <h4 className="text-[#FCBF49] font-bold text-xs uppercase font-mono tracking-wider">
              Sourcing Integrity
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every chicken breast meat piece and prime beef patty we prepare is strictly certified 100% Halal. We partner with localized greenhouses ensuring premium taste safety.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 font-mono items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
              <span>Certified Sustainable Diner</span>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-slate-500 select-none">
          <div>
            <p>© {new Date().getFullYear()} BiteCraft Premium Diner. All Gourmet Rights Reserved.</p>
            <p className="text-[10px] mt-0.5">Designed with meticulous pixel-by-pixel CRO standards.</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <a href="#policies" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-350 transition-colors">Terms of Dining</a>
            <span>•</span>
            <button
              onClick={handleScrollTop}
              className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Scroll to top of screen"
            >
              <ArrowUp className="w-4 h-4" />
              TOP
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
