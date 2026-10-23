import { MenuItem, Review, FAQItem, GalleryItem, Coupon } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'b1',
    name: 'Truffle Umami Bacon Burger',
    price: 14.99,
    rating: 4.9,
    calories: 840,
    category: 'burgers',
    description: 'Dry-aged premium angus beef, glazed applewood-smoked bacon, double melted Swiss gruyère, charred caramelized onions, and our signature white truffle oil spread on an artisanal buttered brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Best Seller', 'Premium', 'Chef’s Special']
  },
  {
    id: 'b2',
    name: 'Spicy Firehouse Smash Burger',
    price: 11.99,
    rating: 4.8,
    calories: 780,
    category: 'burgers',
    description: 'Double crispy-edge smash patties, charred jalapeño caps, melted ghost pepper jack cheese, crispy fried onion haystacks, and fiery habanero mayo.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
    tags: ['Spicy', 'Smash Patty']
  },
  {
    id: 'b3',
    name: 'Double Stack Glazed BBQ Bacon',
    price: 13.49,
    rating: 4.7,
    calories: 920,
    category: 'burgers',
    description: 'Two thick angus patties, sweet honey bourbon BBQ glaze, hickory bacon, extra cheddar, and farm-fresh crispy lettuce with heirloom tomatoes.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    tags: ['Crispy Bacon', 'BBQ']
  },

  // PIZZA
  {
    id: 'p1',
    name: 'Loaded Hot Pepperoni & Honey drizzled',
    price: 16.99,
    rating: 4.9,
    calories: 1120,
    category: 'pizza',
    description: 'Cup-and-char pepperoni ribbons overflowing on freshly-stretched sourdough, layered with imported whole-milk mozzarella, hot honey infusion drizzle, and freshly grated dynamic parmesan.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Trending', 'Hot Honey']
  },
  {
    id: 'p2',
    name: 'Margherita Supreme Sourdough',
    price: 14.49,
    rating: 4.6,
    calories: 890,
    category: 'pizza',
    description: 'Sun-ripened San Marzano tomato salsa, thick buffalo mozzarella slabs, basil oil swirl, fresh garden sweet basil leaves, and flaky French sea salt crystals.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian', 'Sourdough']
  },

  // CHICKEN
  {
    id: 'c1',
    name: 'Korean Glazed Sweet Ginger Wings',
    price: 12.99,
    rating: 4.8,
    calories: 680,
    category: 'chicken',
    description: 'Extra double-fried premium crispy chicken wings glazed in our sticky-sweet garlic soy & Gochujang red pepper reduction, sprinkled heavily with toasted sesame seeds and chopped scallions.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600',
    tags: ['Spicy Sweet', 'Extra Crispy']
  },
  {
    id: 'c2',
    name: 'Signature Crispy Secret Tender Bucket',
    price: 15.99,
    rating: 4.7,
    calories: 890,
    category: 'chicken',
    description: 'Six hand-breaded premium white meat chicken breast tenders infused with 11 signature brand herbs, served with smoky honey mustard and buttermilk ranch dips.',
    image: 'https://images.unsplash.com/photo-1627508560639-959e782a52ef?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Best Seller', 'Family Favorite']
  },

  // FRIES
  {
    id: 'f1',
    name: 'Dynamite Waffle Fries',
    price: 7.99,
    rating: 4.9,
    calories: 550,
    category: 'fries',
    description: 'Crispy waffle basket cutters topped with warm cheddar fondue, minced hickory bacon sparkles, pickled sliced jalapeños, and white truffle garlic aioli drizzle.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Overloaded', 'Cheese']
  },
  {
    id: 'f2',
    name: 'Smoky Cajun Rustic Sea Salt Fries',
    price: 5.49,
    rating: 4.5,
    calories: 380,
    category: 'fries',
    description: 'Hand-cut skin-on Idaho russet potatoes, shook vigorously in our robust secret Cajun spice recipe, dynamic garlic-onion salt, and fragrant garden dried parsley.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Classic']
  },

  // WRAPS
  {
    id: 'w1',
    name: 'Glazed Chicken Ranch Avocado Wrap',
    price: 10.99,
    rating: 4.7,
    calories: 610,
    category: 'wraps',
    description: 'Juicy charcoal-grilled chicken pieces, Hass avocado wedges, shredded sharp Colby Jack cheese, sweet corn salsa, and herby ranch tucked into a toasted spinach tortilla.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
    tags: ['Healthy Choice', 'Fresh']
  },
  {
    id: 'w2',
    name: 'Spicy Chipotle Beef Crispy Wrap',
    price: 11.49,
    rating: 4.6,
    calories: 720,
    category: 'wraps',
    description: 'Tender seasoned shredded top-sirloin, fire-roasted peppers, seasoned pinto frijoles, pepper jack melt, and hot smoky chipotle cream folded neatly into a crisp-pressed flour wrap.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600',
    tags: ['Spicy', 'Super Filling']
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Warm Lava Fudge Obsidian Brownie',
    price: 6.99,
    rating: 4.9,
    calories: 490,
    category: 'desserts',
    description: 'Indulgent, moist black cocoa brownie with a molten core that flows with premium liquid Belgian fudge, served warm with a dusting of fine vanilla powdered sugar.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Best Seller', 'Warm']
  },
  {
    id: 'd2',
    name: 'Dulce de Leche Caramel Churros',
    price: 5.99,
    rating: 4.8,
    calories: 410,
    category: 'desserts',
    description: 'Crispy warm Mexican churros coated in cinnamon crystals, served in a bucket alongside a luxurious warm dipping cup of authentic Colombian dulce de leche sauce.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    tags: ['Crispy', 'Caramel']
  },

  // DRINKS
  {
    id: 'dr1',
    name: 'Salted Caramel Pecan Cream Shake',
    price: 6.49,
    rating: 4.9,
    calories: 590,
    category: 'drinks',
    description: 'House-churned organic vanilla bean custard churned with rich buttery dark salted caramel sauce, sea salt sparkles, real whipped foam, and chopped roasted butter pecans.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
    isPopular: true,
    tags: ['Indulgent Shake']
  },
  {
    id: 'dr2',
    name: 'Organic Lemon Ginger Fizz',
    price: 4.49,
    rating: 4.6,
    calories: 120,
    category: 'drinks',
    description: 'Sparkling cold water infused with cold-pressed Meyer lemon nectar, intense ginger root juice, and fresh hand-slapped sweet local mint sprigs.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    tags: ['Freshly Mocktail', 'Low Cal']
  }
];

export const SPECIAL_COUPONS: Coupon[] = [
  {
    id: 'cop1',
    code: 'BITEFIRST15',
    description: 'Get an instant 15% discount on your very first order with us! Applied on checkout.',
    discountPercentage: 15,
    expiryText: 'Active Today Only'
  },
  {
    id: 'cop2',
    code: 'BURGERBLAST20',
    description: 'Exclusive 20% off on all burgers when buying 2 or more. Perfect for family nights!',
    discountPercentage: 20,
    expiryText: 'Expires in 4 hours'
  },
  {
    id: 'cop3',
    code: 'WEEKENDCRUNCH',
    description: 'Enjoy a free high-tier upgrade and 10% off of any dynamic chicken tender combos.',
    discountPercentage: 10,
    expiryText: 'Valid on Weekends'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Oh my goodness, the Truffle Umami burger is truly the best burger I have tasted in my entire life. It arrived in literally 18 minutes, piping hot and premium. Standard McDonald’s doesn’t even compare! Highly recommend standard delivery!',
    date: 'Yesterday',
    verified: true
  },
  {
    id: 'r2',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Absolutely blown away by the service. Our office ordered 15 burgers and 5 boxes of wings - everything was labeled perfectly, hot, and delicious. Setting up our receipt storage in Google Docs was an amazing professional helper tool!',
    date: '3 days ago',
    verified: true
  },
  {
    id: 'r3',
    author: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'The Margherita Supreme pizza is better than top artisan pizzerias. Super fast delivery, amazing crust quality, and the sweet honey peppered drizzle is an absolute game-changer. They really deserve all 5 stars!',
    date: '1 week ago',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    caption: 'Our clean, industrial-grade modern kitchen sanitizing environment.',
    category: 'kitchen'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    caption: 'Freshly seasoned, charcoal-infused premium dynamic food styling.',
    category: 'food'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    caption: 'The welcoming warmth of our premium dining room layout.',
    category: 'restaurant'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600',
    caption: 'Laughter, chatter, and dynamic energy of our daily fast-food crowd.',
    category: 'customers'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    question: 'How fast is your signature delivery?',
    answer: 'Our average delivery time is 22 minutes! We route orders dynamically to our nearest kitchen hub and dispatch local delivery drivers immediately to secure peak serving freshness.'
  },
  {
    id: 'f2',
    question: 'Are all of your ingredients fresh and high quality?',
    answer: 'Absolutely. We partner daily with organic agricultural suppliers. Our beef is 100% premium USDA Angus, never frozen, and cut fresh daily. Our vegetables are washed and sliced fresh every single morning.'
  },
  {
    id: 'f3',
    question: 'What is the "Export Receipt to Google Docs" feature?',
    answer: 'This is a premium features build for our customers, families, and busy corporate offices. Once you connect your Google account, you can convert any finalized order receipt into a fully formatted Google Doc automatically saved to your Drive for expenses, logs, or corporate tracking.'
  },
  {
    id: 'f4',
    question: 'Do you offer 100% Halal or Gluten-Free options?',
    answer: 'Yes! All of our premium chicken menus and certified beef cuts are 100% Halal. We also offer low-carb alternatives, gluten-safe wraps, and vegetarian pizzas like our Margherita sourdough.'
  },
  {
    id: 'f5',
    question: 'How can I redeem a discount coupon?',
    answer: 'Simple! Copy any available coupon code (such as "BITEFIRST15") and enter it into the promo box in your Checkout Cart. The discount is calculated dynamically and applied to your total immediately!'
  },
  {
    id: 'f6',
    question: 'Do you have a physical location for dining or pickup?',
    answer: 'Yes! We are located at 742 Gourmet Plaza, Sector 4, Silicon Valley. You can dine-in, drive-thru, or order on our digital portal for lightning fast curbside pickup.'
  },
  {
    id: 'f7',
    question: 'Is my online checkout and payment details secure?',
    answer: 'We utilize 256-bit encrypted, fully PCI-compliant stripe and secure payment APIs. Your card details are never saved on our servers, ensuring absolute data safety.'
  }
];
