import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const EXTENDED_FAQS = [
  {
    q: 'How fast is your signature delivery?',
    a: 'Our average delivery time is 22 minutes! We route orders dynamically to our nearest kitchen hub and dispatch local delivery drivers immediately to secure peak serving freshness.'
  },
  {
    q: 'Are all of your ingredients fresh and high quality?',
    a: 'Absolutely. We partner daily with organic agricultural suppliers. Our beef is 100% premium USDA Angus, never frozen, and cut fresh daily. Our vegetables are washed and sliced fresh every single morning.'
  },
  {
    q: 'What is the "Export Receipt to Google Docs" feature?',
    a: 'This is a premium features build for our customers, families, and busy corporate offices. Once you connect your Google account, you can convert any finalized order receipt into a fully formatted Google Doc automatically saved to your Drive for expenses, logs, or corporate tracking.'
  },
  {
    q: 'Do you offer 100% Halal or Gluten-Free options?',
    a: 'Yes! All of our premium chicken menus and certified beef cuts are 100% Halal. We also offer low-carb alternatives, gluten-safe wraps, and vegetarian pizzas like our Margherita sourdough.'
  },
  {
    q: 'How can I redeem a discount coupon?',
    a: 'Simple! Copy any available coupon code (such as "BITEFIRST15") and enter it into the promo box in your Checkout Cart. The discount is calculated dynamically and applied to your total immediately!'
  },
  {
    q: 'Do you have a physical location for dining or pickup?',
    a: 'Yes! We are located at 742 Gourmet Plaza, Sector 4, Silicon Valley. You can dine-in, drive-thru, or order on our digital portal for lightning fast curbside pickup.'
  },
  {
    q: 'Is my online checkout and payment details secure?',
    a: 'We utilize 256-bit encrypted, fully PCI-compliant stripe and secure payment APIs. Your card details are never saved on our servers, ensuring absolute data safety.'
  },
  {
    q: 'Can I place a massive group or corporate order?',
    a: 'Certainly! We excel at catering big company meals, birthday programs, or family reunions. Order as many items as you like, and connect your Google account to simplify logging expenses!'
  },
  {
    q: 'What oil do you fry your waffle baskets fries in?',
    a: 'We use high-grade 100% refined peanut oil and canola oil for fries. This guarantees our signature crunchy surface while maintaining safe allergen standards. Check product tags!'
  },
  {
    q: 'Do you offer contactless delivery option?',
    a: 'Yes! During checkout, simply select "Contactless Delivery". Our driver will place your insulated meal bag at your doorstep, ring the bell, and stand at a safe distance while you retrieve it.'
  },
  {
    q: 'Can I cancel my fast-food order after placing it?',
    a: 'Because our kitchen sears beef patties fresh within seconds of order notices, cancelations can only be processed within 2 minutes of placement. Drop us a quick hotline ring!'
  },
  {
    q: 'How do you keep items like shakes cold alongside warm burgers?',
    a: 'Our delivery fleet utilizes specialized multi-compartment thermal backpacks. Shakes are placed in deep freeze cells, while burgers and pizzas are sealed in insulated heating locks.'
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 scroll-mt-16" id="faq-section-segment">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            Support desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-slate-500 text-sm">
            Got queries? We compiled extensive responses detailing our premium ingredients, fast-food logistics, workspace integrations, and secure payment pathways.
          </p>
        </div>

        {/* FAQ Accordion Line */}
        <div className="space-y-4" id="faq-list-container">
          {EXTENDED_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:border-[#F77F00]/30 transition-all"
                id={`faq-item-${idx}`}
              >
                {/* Header question clicker */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-50/40 transition-colors"
                >
                  <span className="font-display pr-2">{faq.q}</span>
                  <div className="p-1 rounded-full bg-slate-100 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer body (Smooth Collapse) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 text-slate-500 text-xs sm:text-sm leading-relaxed text-left bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
