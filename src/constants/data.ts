export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: {
    jakarta: number;
    papua: number;
  };
  origin: 'Jakarta' | 'Papua' | 'Both';
}

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Terra Cotta Vase',
    price: 1250000,
    category: 'Home Decor',
    description: 'Hand-crafted terra cotta vase with a natural matte finish. Perfect for dried floral arrangements.',
    images: ['https://picsum.photos/seed/vase1/800/1000', 'https://picsum.photos/seed/vase2/800/1000'],
    stock: { jakarta: 12, papua: 5 },
    origin: 'Both'
  },
  {
    id: '2',
    name: 'Linen Summer Dress',
    price: 2450000,
    category: 'Apparel',
    description: 'Breathable organic linen dress in a soft sand hue. Features a relaxed fit and adjustable straps.',
    images: ['https://picsum.photos/seed/dress1/800/1000'],
    stock: { jakarta: 0, papua: 8 },
    origin: 'Papua'
  },
  {
    id: '3',
    name: 'Woven Rattan Chair',
    price: 4800000,
    category: 'Furniture',
    description: 'Classic woven rattan chair with ergonomic support. A timeless piece for any modern living space.',
    images: ['https://picsum.photos/seed/chair1/800/1000'],
    stock: { jakarta: 3, papua: 0 },
    origin: 'Jakarta'
  },
  {
    id: '4',
    name: 'Ceramic Coffee Set',
    price: 850000,
    category: 'Kitchen',
    description: 'Minimalist ceramic coffee set including two mugs and a matching pour-over dripper.',
    images: ['https://picsum.photos/seed/coffee1/800/1000'],
    stock: { jakarta: 20, papua: 15 },
    origin: 'Both'
  },
  {
    id: '5',
    name: 'Sandalwood Incense',
    price: 350000,
    category: 'Lifestyle',
    description: 'Premium sandalwood incense sticks for a calming atmosphere. Sustainably sourced.',
    images: ['https://picsum.photos/seed/incense1/800/1000'],
    stock: { jakarta: 50, papua: 20 },
    origin: 'Both'
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: '1',
    title: 'The Art of Slow Living',
    excerpt: 'Discover how embracing a slower pace can transform your daily rituals and home environment.',
    content: 'Full article content about slow living...',
    date: 'March 10, 2024',
    author: 'Elena Stone',
    image: 'https://picsum.photos/seed/journal1/1200/800',
    category: 'Lifestyle'
  },
  {
    id: '2',
    title: 'Sourcing from Papua: A Journey',
    excerpt: 'A behind-the-scenes look at our latest collection sourced directly from traditional artisans in Papua.',
    content: 'Full article content about Papua sourcing...',
    date: 'February 25, 2024',
    author: 'Marcus Earth',
    image: 'https://picsum.photos/seed/journal2/1200/800',
    category: 'Behind the Scenes'
  }
];
