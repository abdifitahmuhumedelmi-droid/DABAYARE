import { motion } from 'motion/react';
import { Search, Flame, ChefHat, Truck } from 'lucide-react';

const STEPS = [
  {
    step: 'Step 01',
    icon: Search,
    title: 'Browse Our Menu',
    description: 'Explore our master-crafted hamburgers, hot-honey sourdough pizzas, wings, and low-calorie drinks.',
    badge: '100+ Customizers'
  },
  {
    step: 'Step 02',
    icon: Flame,
    title: 'Instant Secure Order',
    description: 'Verify your order with our seamless PCI-compliant checkout. Apply promo codes for immediate reductions.',
    badge: 'Google Auth Safe'
  },
  {
    step: 'Step 03',
    icon: ChefHat,
    title: 'Craft Kitchen Prep',
    description: 'Our certified 5-star cooks sear your USDA patties and stretch sourdough fresh on notice.',
    badge: 'Hygiene Certified'
  },
  {
    step: 'Step 04',
    icon: Truck,
    title: 'Insulated Fast Shipping',
    description: 'Our logistics fleet whisks insulated locks directly to your doorstep in 22 minutes average.',
    badge: 'Heater Lock Active'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100" id="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Process Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            How BiteCraft Magic Operates
          </h2>
          <p className="text-slate-500 text-sm">
            We spent years optimizing our logistics and food prep so you can experience gourmet fast food with clockwork perfection. Four rapid steps, zero hassle.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Centered Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 bg-dashed bg-slate-200 -z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
                  id={`step-card-${step.step}`}
                >
                  
                  {/* Step Code */}
                  <span className="text-[10px] font-black font-mono text-[#F77F00] bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-full mb-4">
                    {step.step}
                  </span>

                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 bg-[#D62828] text-white rounded-2xl flex items-center justify-center shadow-lg mb-5 group-hover:rotate-6 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-base mb-2 font-display">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] sm:max-w-none flex-1 mb-4">
                    {step.description}
                  </p>

                  {/* Trust Badge badge */}
                  <span className="text-[9px] font-bold font-mono tracking-wide text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    {step.badge}
                  </span>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
