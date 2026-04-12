export interface Product {
  id: string;
  title: string;
  slug: string;
  image: string;
  images?: string[];
  price: number;
  comparePrice?: number;
  stock: number;
  reviewCount: number;
  rating: number;
  variantId: string;
  sku: string;
  badge?: 'bestseller' | 'new' | 'limited';
  description?: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  { 
    id: "1", 
    title: "Minimalist Leather Wallet", 
    slug: "minimalist-leather-wallet", 
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
      "https://images.unsplash.com/photo-1612902456551-404b9a18b646?w=800",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800",
    ],
    price: 599, 
    comparePrice: 899, 
    stock: 200, 
    reviewCount: 124, 
    rating: 4.5, 
    variantId: "v1", 
    sku: "WL-001", 
    badge: 'bestseller',
    description: "Premium genuine leather bifold wallet with RFID protection. Crafted from full-grain Italian leather."
  },
  { 
    id: "2", 
    title: "Smart Watch Ultra Fitness", 
    slug: "smart-watch-ultra-fitness", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    price: 1799, 
    comparePrice: 2499, 
    stock: 150, 
    reviewCount: 89, 
    rating: 4.7, 
    variantId: "v2", 
    sku: "WH-002" 
  },
  { 
    id: "3", 
    title: "Wireless NC Headphones", 
    slug: "wireless-nc-headphones", 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", 
    price: 2499, 
    comparePrice: 3499, 
    stock: 80, 
    reviewCount: 203, 
    rating: 4.8, 
    variantId: "v3", 
    sku: "HP-003", 
    badge: 'bestseller' 
  },
  { 
    id: "4", 
    title: "Urban Travel Backpack", 
    slug: "urban-travel-backpack", 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", 
    price: 1299, 
    comparePrice: 1699, 
    stock: 250, 
    reviewCount: 67, 
    rating: 4.3, 
    variantId: "v4", 
    sku: "BG-004" 
  },
  { 
    id: "5", 
    title: "Polarized Aviator Sunglasses", 
    slug: "polarized-aviator-sunglasses", 
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", 
    price: 699, 
    comparePrice: 999, 
    stock: 300, 
    reviewCount: 156, 
    rating: 4.6, 
    variantId: "v5", 
    sku: "SG-005", 
    badge: 'new' 
  },
  { 
    id: "6", 
    title: "Portable Bluetooth Speaker", 
    slug: "portable-bluetooth-speaker", 
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800", 
    price: 1199, 
    comparePrice: 1599, 
    stock: 120, 
    reviewCount: 92, 
    rating: 4.4, 
    variantId: "v6", 
    sku: "SP-006", 
    badge: 'new' 
  },
  { 
    id: "7", 
    title: "Magnetic Phone Mount", 
    slug: "magnetic-phone-mount", 
    image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=800", 
    price: 399, 
    comparePrice: 599, 
    stock: 500, 
    reviewCount: 45, 
    rating: 4.2, 
    variantId: "v7", 
    sku: "PH-007", 
    badge: 'limited' 
  },
  { 
    id: "8", 
    title: "LED Desk Lamp + Charger", 
    slug: "led-desk-lamp-charger", 
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800", 
    price: 1599, 
    comparePrice: 2199, 
    stock: 100, 
    reviewCount: 78, 
    rating: 4.5, 
    variantId: "v8", 
    sku: "LT-008" 
  },
];

export const COLLECTIONS = [
  { title: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600", count: 24 },
  { title: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600", count: 18 },
  { title: "Home & Living", slug: "home-living", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600", count: 15 },
  { title: "Sports & Fitness", slug: "sports-fitness", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600", count: 12 },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    product: "Wireless NC Headphones",
    rating: 5,
    review: "The active noise cancellation is a lifesaver for my daily commute on the local train. Super comfortable and the battery easily lasts a week.",
  },
  {
    name: "Rahul Verma",
    city: "Bengaluru",
    product: "Smart Watch Ultra Fitness",
    rating: 5,
    review: "Extremely accurate step and heart rate tracking. Syncs beautifully with my phone and the display is super bright even in direct sunlight.",
  },
  {
    name: "Ananya Iyer",
    city: "Chennai",
    product: "Polarized Aviator Sunglasses",
    rating: 5,
    review: "These sunglasses look so premium! They completely block out the harsh afternoon sun and are surprisingly lightweight.",
  },
  {
    name: "Vikram Nair",
    city: "Hyderabad",
    product: "Magnetic Phone Mount",
    rating: 4,
    review: "Sticks to my car dashboard like glue. The magnet is incredibly strong; my phone has never fallen even on bad city roads.",
  },
  {
    name: "Sneha Patel",
    city: "Ahmedabad",
    product: "Portable Bluetooth Speaker",
    rating: 5,
    review: "Unbelievable bass for such a compact speaker. Took it to a family picnic and everyone was amazed by how loud and clear it gets.",
  },
  {
    name: "Arjun Mehta",
    city: "Delhi",
    product: "Minimalist Leather Wallet",
    rating: 5,
    review: "The leather quality is top-notch and it genuinely feels like a luxury product. Holds all my cards without adding bulk to my pocket.",
  },
];
