import { Sparkles, Truck, Award, Percent, Flame } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Freshest Ingredients',
    description: '100% grass-fed prime local beef cuts & hand-sliced produce sourced daily.',
    color: 'bg-red-50 text-red-600 border-red-100',
    iconColor: 'text-[#D62828]'
  },
  {
    icon: Truck,
    title: 'Insulated Fast Delivery',
    description: 'Hot thermal lockers keep your gourmet fast food fresh and piping crisp on transit.',
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    iconColor: 'text-[#F77F00]'
  },
  {
    icon: Award,
    title: '100% Certified Halal',
    description: 'Strict ethical standards applied on our premium meats, poultry, and kitchen prep.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Percent,
    title: 'Best Prices Guaranteed',
    description: 'Matchless value offerings, office share buckets, and weekly discount packages.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    iconColor: 'text-amber-500'
  },
  {
    icon: Flame,
    title: 'Dynamic Daily Specials',
    description: 'Off-menu gourmet specials curated and updated by award-winning chefs.',
    color: 'bg-[#ff9f1c]/10 text-orange-700 border-[#ff9f1c]/20',
    iconColor: 'text-[#ff9f1c]'
  }
];

export default function FeatureBar() {
  return (
    <section className="bg-white border-y border-slate-100 py-12" id="features-segment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 rounded-2xl hover:bg-slate-50/50 transition-colors"
                id={`feature-card-${idx}`}
              >
                {/* Iconic Circle Wrapper */}
                <div className={`w-14 h-14 rounded-2xl ${feat.color} border flex items-center justify-center shadow-sm mb-4`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[210px] sm:max-w-none">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
