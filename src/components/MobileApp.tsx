import { motion } from 'motion/react';
import { Smartphone, Check, SmartphoneCharging } from 'lucide-react';

export default function MobileApp() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white overflow-hidden" id="mobile-app-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and QR Code description */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F77F00]/25 text-[#FCBF49] border border-[#F77F00]/30 rounded-full text-xs font-black uppercase tracking-wider">
              <SmartphoneCharging className="w-3.5 h-3.5" />
              BiteCraft VIP Perks
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Unlock the BiteCraft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300">
                Super App Experience
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Order in 1-tap, stack loyalty candy points, and get exclusive access to surprise seasonal recipes. Designed for families and fast food experts.
            </p>

            {/* List features with checkboxes */}
            <ul className="space-y-3 max-w-lg">
              {[
                'Exclusive 20% flat discount on your first in-app purchase',
                'Real-time GPS delivery tracking from our grill to your door',
                'Pre-order up to 7 days ahead for birthday parties or boardrooms',
                'Advanced receipt export directly to your customized Google Drive files'
              ].map((feat) => (
                <li key={feat} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300">
                  <div className="p-0.5 bg-[#F77F00] text-white rounded-full mt-0.5 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Download Buttons + QR Code */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              
              {/* App badges */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* App Store */}
                <a
                  href="#download-app"
                  className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-5 py-3 rounded-2xl font-bold text-xs select-none shadow-md"
                >
                  <Smartphone className="w-5 h-5 text-[#FCBF49]" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] block text-slate-400 font-light leading-none">Download on</span>
                    <span className="text-xs font-extrabold block">App Store</span>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#download-app"
                  className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-5 py-3 rounded-2xl font-bold text-xs select-none shadow-md"
                >
                  <Smartphone className="w-5 h-5 text-[#FCBF49]" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] block text-slate-400 font-light leading-none">GET IT ON</span>
                    <span className="text-xs font-extrabold block">Google Play</span>
                  </div>
                </a>
              </div>

              {/* QR Code container */}
              <div className="hidden sm:flex items-center gap-4 border-l border-slate-700/60 pl-6">
                
                {/* QR graphic drawer */}
                <div className="w-20 h-20 bg-white p-1 rounded-xl shadow-lg flex items-center justify-center relative">
                  {/* Fake QR drawing using modern grid */}
                  <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-slate-50 border border-slate-200">
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />

                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />

                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />

                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />

                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-transparent" />
                    <div className="bg-slate-900 rounded-[2px]" />
                    <div className="bg-slate-900 rounded-[2px]" />
                  </div>
                  {/* Center branding dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-[7px]">
                    B
                  </div>
                </div>

                <div className="text-left font-mono">
                  <span className="text-xs text-slate-400 font-bold block leading-none">SCAN ORTAP</span>
                  <span className="text-[10px] text-[#FCBF49] block mt-1">Instant App Loader</span>
                </div>

              </div>
            </div>

          </div>

          {/* Graphic mockup column */}
          <div className="lg:col-span-5 flex justify-center items-center relative pl-4">
            <div className="relative w-64 h-[440px] sm:w-72 sm:h-[480px] bg-slate-900 rounded-[40px] border-[5px] border-slate-700/80 shadow-2xl overflow-hidden shadow-orange-500/10">
              
              {/* Dynamic Camera Notch detail */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black h-4.5 w-24 rounded-full z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              </div>

              {/* Phone app ui inside */}
              <div className="absolute inset-0 bg-slate-950 p-4 pt-10 flex flex-col justify-between text-left relative">
                
                {/* Header App inside */}
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold mb-4 font-mono">
                    <span>Carrier LTE</span>
                    <span>12:44 PM</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[9px] text-[#FCBF49] block font-mono font-bold uppercase tracking-wider leading-none">ORDER FRESH</span>
                      <h4 className="text-sm font-black text-white leading-none mt-1">BiteCraft VIP App</h4>
                    </div>
                    <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-black">
                      B
                    </div>
                  </div>

                  {/* Promotion banner inside phone */}
                  <div className="bg-gradient-to-r from-red-650 to-orange-550 rounded-2xl p-3.5 text-white mb-4">
                    <span className="text-[8px] font-mono uppercase bg-yellow-400/20 text-yellow-300 font-black px-1.5 py-0.5 rounded-full border border-yellow-300/30">VIP CLUB</span>
                    <h5 className="font-extrabold text-xs mt-1.5 leading-tight">Instant 20% Cash Back</h5>
                    <p className="text-[9px] text-slate-200 mt-0.5">Stacked on every single order!</p>
                  </div>

                  {/* Mock catalog item inside phone */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=150"
                      alt="Mini Burger Mock"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h6 className="text-[11px] font-bold text-white leading-tight">Truffle Umami Bacon</h6>
                      <span className="text-[10px] text-red-500 font-black">$14.99</span>
                    </div>
                    <button className="bg-[#F77F00] text-white p-1 rounded-lg">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </button>
                  </div>
                </div>

                {/* Simulated Order Button */}
                <div className="bg-slate-900/80 border-t border-slate-800 p-2.5 rounded-xl text-center">
                  <div className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl text-[10px] font-black text-center text-white tracking-widest uppercase">
                    Checkout (Insulated Express)
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
