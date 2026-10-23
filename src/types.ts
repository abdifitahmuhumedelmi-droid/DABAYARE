export interface MenuItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  calories: number;
  category: 'burgers' | 'pizza' | 'chicken' | 'fries' | 'wraps' | 'sandwiches' | 'rice' | 'desserts' | 'drinks';
  description: string;
  image: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountPercentage: number;
  expiryText: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'food' | 'kitchen' | 'restaurant' | 'customers';
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: 'placed' | 'cooking' | 'delivering' | 'completed';
  timestamp: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    email: string;
    notes?: string;
  };
  paymentMethod: 'cash' | 'card' | 'apple-pay' | 'google-pay';
  googleDocUrl?: string;
  estimatedDeliveryTime: string;
}
