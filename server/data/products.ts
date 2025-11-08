import { ProductModel } from '../models/product';

export interface SeedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  inventory: number;
  sizes: string[];
  colors: string[];
}

export const seedProducts: SeedProduct[] = [
  {
    id: 'prod-hoodie',
    name: 'Aurora Knit Hoodie',
    description: 'Brushed cotton hoodie with oversized fit and ribbed cuffs.',
    price: 6800,
    image: '',
    inventory: 24,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Midnight Blue', 'Cloud Gray', 'Sage'],
  },
  {
    id: 'prod-tee',
    name: 'Ripple Relaxed Tee',
    description: 'Pigment-dyed cotton tee with a boxy silhouette.',
    price: 380,
    image: '',
    inventory: 60,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Stone', 'Charcoal', 'Sunset Rose'],
  },
  {
    id: 'prod-trouser',
    name: 'Ripple Knit Trouser',
    description: 'Sweater-knit trouser with elastic waist and tapered leg.',
    price: 740,
    image: '',
    inventory: 32,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Coal', 'Moss', 'Ivory'],
  },
  {
    id: 'prod-jacket',
    name: 'Harbor Quilted Jacket',
    description: 'Recycled nylon shell with lightweight quilting and snap closure.',
    price: 1280,
    image: '',
    inventory: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Deep Navy'],
  },
  {
    id: 'prod-dress',
    name: 'Cascade Midi Dress',
    description: 'Modal-blend knit dress with side slit and mock neck.',
    price: 960,
    image: '',
    inventory: 26,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blackberry', 'Driftwood'],
  },
];

export async function seedProductsIfEmpty(): Promise<void> {
  const count = await ProductModel.estimatedDocumentCount();
  if (count > 0) {
    return;
  }

  await ProductModel.insertMany(
    seedProducts.map((product) => ({
      ...product,
      sku: product.id,
    })),
  );
}

