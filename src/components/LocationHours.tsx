import { MapPin, Phone, Mail, Clock, ShieldCheck, Car } from 'lucide-react';
import { motion } from 'motion/react';

export default function LocationHours() {
  return (
    <section className="py-20 bg-white scroll-mt-16" id="location-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold text-red-650 bg-red-50 border border-red-100 px-3 py-1 rounded-full">
            In-Person Dining
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Stop By & Dine In Style
          </h2>
          <p className="text-slate-500 text-sm">
            Whether you want standard drive-thru pickup, insulated home delivery, or cozy corner family dining, here is how you track us down.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info Panels column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Hour Card */}
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-red-650">
                <Clock className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-slate-950 font-display">Opening Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5 font-semibold">
                  <span>Monday - Friday</span>
                  <span className="text-slate-900 font-mono">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5 font-semibold">
                  <span>Saturday</span>
                  <span className="text-slate-900 font-mono">10:00 AM - Midnight</span>
                </div>
                <div className="flex justify-between pb-0.5 font-semibold text-red-600">
                  <span>Sunday</span>
                  <span className="font-mono">11:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Address & Contact Details */}
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-650">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-950 font-display">Store Location</h3>
              </div>
              <div className="space-y-3.5 text-sm">
                
                <div className="flex gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0 h-9 w-9 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Flagship Diner</h4>
                    <p className="text-slate-500 font-medium text-xs mt-0.5">742 Gourmet Plaza, Sector 4, Silicon Valley</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0 h-9 w-9 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs text-left">Ring Direct Hotline</h4>
                    <p className="text-slate-500 font-semibold font-mono text-xs mt-0.5">+1 (800) 555-BITE (2483)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0 h-9 w-9 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs text-left">Electronic Enquiries</h4>
                    <p className="text-[#D62828] font-bold text-xs mt-0.5">support@bitecraftfastfood.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Parking and Delivery zones details */}
            <div className="bg-[#FCBF49]/10 border border-[#FCBF49]/30 rounded-3xl p-5 flex items-start gap-4">
              <div className="p-2.5 bg-yellow-400 text-slate-950 rounded-xl flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-950 text-xs uppercase font-mono tracking-wide leading-none">Free parking & Drive-thru available</h4>
                <p className="text-slate-650 text-xs mt-1.5 leading-relaxed">
                  We offer a dedicated 2-lane drive-thru for VIP pick ups, plus up to <strong>2 hours of free parking</strong> in the Gourmet Plaza garage with validator validation receipt.
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Stylized custom Map Representation Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 relative shadow-sm min-h-[300px] flex items-center justify-center bg-slate-950 text-white">
            
            {/* Simulated premium Vector map styled backdrop */}
            <div className="absolute inset-0 bg-[#0F172A] opacity-80" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff11 2px, transparent 0)", backgroundSize: '16px 16px' }}></div>
            
            {/* Visual Custom Map Road Grid elements */}
            <div className="absolute inset-0 select-none opacity-20 border-t border-slate-400 rotate-12 -translate-y-12"></div>
            <div className="absolute inset-0 select-none opacity-10 border-r border-slate-350 -rotate-45 translate-x-32"></div>
            <div className="absolute inset-x-0 top-1/2 h-14 bg-slate-800/40 select-none rotate-3"></div>

            {/* Glowing Flagship Pin Center */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* Pulsing ring animation */}
              <div className="relative flex h-14 w-14 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60"></span>
                <div className="relative h-10 w-10 bg-[#D62828] rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-white text-lg">
                  🍔
                </div>
              </div>

              {/* Tag indicator details overlay */}
              <div className="bg-slate-900 border border-[#FCBF49] p-3 rounded-2xl shadow-2xl max-w-[240px] text-center mt-3">
                <h4 className="font-extrabold text-xs text-white">BiteCraft Flagship Diner</h4>
                <p className="text-[10px] text-[#FCBF49] font-mono mt-0.5">742 Gourmet Plaza, Silicon Valley</p>
                <span className="text-[9px] text-emerald-400 bg-emerald-950 font-bold px-2 py-0.5 rounded-full inline-block mt-2">
                  Drive-thru Active
                </span>
              </div>

            </div>

            {/* Upper Right Directions Card */}
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-left hidden sm:block max-w-[170px]">
              <span className="text-[8px] font-mono font-bold text-slate-500 uppercase">Delivery Limits</span>
              <p className="text-[10px] text-slate-300 font-bold leading-tight mt-0.5">Free delivery inside a <strong>5 miles radius</strong> of Plaza</p>
            </div>

            {/* Bottom Credit line */}
            <span className="absolute bottom-3 left-4 font-mono text-[9px] text-slate-500">
              COORDINATES: 37.7749° N, 122.4194° W
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}
