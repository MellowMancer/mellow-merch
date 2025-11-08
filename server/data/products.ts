export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inventory: number;
}

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Aurora Hoodie',
    description: 'Cozy fleece hoodie with gradient print.',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    inventory: 12,
  },
  {
    id: 'prod-2',
    name: 'Retro Sunglasses',
    description: 'UV400 protection with a throwback silhouette.',
    price: 29.5,
    image: 'https://images.unsplash.com/photo-1520971345873-6c5b5f4cf7b3?auto=format&fit=crop&w=600&q=80',
    inventory: 30,
  },
  {
    id: 'prod-3',
    name: 'Canvas Tote',
    description: 'Durable tote for daily errands and weekend getaways.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80',
    inventory: 50,
  },
  {
    id: 'prod-4',
    name: 'Minimal Watch',
    description: 'Stainless steel case with leather strap.',
    price: 118,
    image: 'https://images.unsplash.com/photo-1524594154908-edd0c1ea76a3?auto=format&fit=crop&w=600&q=80',
    inventory: 8,
  },
  {
    id: 'prod-5',
    name: 'Commuter Backpack',
    description: 'Water-resistant with padded laptop sleeve.',
    price: 92,
    image: 'https://images.unsplash.com/photo-1535905496755-26ae35cb07b0?auto=format&fit=crop&w=600&q=80',
    inventory: 18,
  },
];

