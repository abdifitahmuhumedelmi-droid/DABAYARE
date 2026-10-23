import { Leaf, Award, Truck, DollarSign, Flame, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const REASONS = [
  {
    icon: Leaf,
    title: 'Freshly Sourced Saffron Greens',
    description: 'We collaborate daily with localized premium greenhouse growers, bringing crisp, non-GMO produce directly onto your gourmet burger stacks.',
    color: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10',
    iconColor: 'text-emerald-500'
  },
  {
    icon: Award,
    title: '5-Star Michelin Sauté Recipe',
    description: 'Our culinary masterminds and grill artists formulate our sauces, spice reductions, and sourdough dough formulas using rigorous test standards.',
    color: 'bg-red-500/5 hover:bg-red-500/10 border-red-500/10',
    iconColor: 'text-red-500'
  },
  {
    icon: Truck,
    title: 'Thermal Insulated Express Hubs',
    description: 'Our delivery dispatch relies on automated heater locks, so your sourdough and cheese crust stays gooey, crispy, and warm as it left our grill.',
    color: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10',
    iconColor: 'text-amber-500'
  },
  {
    icon: DollarSign,
    title: 'Genuinely Affordable Pricing',
    description: 'We eliminate middlemen and aggregate raw imports so we can deliver a top-tier restaurant meal at a slice of conventional luxury prices.',
    color: 'bg-[#ff9f1c]/5 hover:bg-[#ff9f1c]/10 border-[#ff9f1c]/10',
    iconColor: 'text-[#ff9f1c]'
  },
  {
    icon: Flame,
    title: 'Exceptional Spicy Infusions',
    description: 'From sweet Gochujang glazes to honey-charred jalapeño reduction bases, our distinct flavor ratios yield unforgettable culinary cravings.',
    color: 'bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/10',
    iconColor: 'text-indigo-500'
  },
  {
    icon: Heart,
    title: 'High-Standard Ethical Norms',
    description: 'Every chicken filet and beef portion is rigorously certified 100% Halal. We run a fully transparent environment respecting every diner preference.',
    color: 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10',
    iconColor: 'text-purple-500'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white" id="why-choose-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold text-red-600 bg-red-100/60 px-3 py-1 rounded-full">
            Our Brand Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Crafting Food Beyond Standard
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            We don’t make conventional fast food. We execute gourmet concepts at peak convenience, ensuring premium trust on every transactional delivery.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`bg-white hover:-translate-y-1.5 transition-all duration-300 p-8 rounded-3xl border ${item.color} shadow-sm overflow-hidden flex flex-col justify-start relative group`}
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl group-hover:bg-[#F77F00]/5 transition-colors"></div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-6 ${item.iconColor} bg-white border border-slate-100 shadow-inner flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-tight font-display">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
