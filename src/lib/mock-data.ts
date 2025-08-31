import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Explorer Jacket',
    description:
      'A versatile and stylish jacket designed for the modern urban explorer. Water-resistant fabric with a comfortable inner lining.',
    price: 149.99,
    images: [
      'https://picsum.photos/seed/jacket1/800/1000',
      'https://picsum.photos/seed/jacket2/800/1000',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Obsidian Black', 'Forest Green'],
    category: 'Outerwear',
    dataAiHint: 'mens jacket',
  },
  {
    id: '2',
    name: 'Flowy Linen Trousers',
    description:
      'Lightweight and breathable linen trousers, perfect for warm weather. Features a relaxed fit and an elasticated waistband for ultimate comfort.',
    price: 89.99,
    images: [
      'https://picsum.photos/seed/trousers1/800/1000',
      'https://picsum.photos/seed/trousers2/800/1000',
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'White', 'Navy'],
    category: 'Trousers',
    dataAiHint: 'womens trousers',
  },
  {
    id: '3',
    name: 'Classic Oxford Shirt',
    description:
      'A timeless wardrobe staple. This Oxford shirt is made from 100% premium cotton for a soft feel and a sharp look.',
    price: 75.0,
    images: [
      'https://picsum.photos/seed/shirt1/800/1000',
      'https://picsum.photos/seed/shirt2/800/1000',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sky Blue', 'White'],
    category: 'Shirts',
    dataAiHint: 'mens shirt',
  },
  {
    id: '4',
    name: 'Minimalist Leather Tote',
    description:
      'Crafted from genuine Italian leather, this tote bag combines functionality with minimalist elegance. Spacious enough for your daily essentials.',
    price: 220.0,
    images: [
      'https://picsum.photos/seed/tote1/800/1000',
      'https://picsum.photos/seed/tote2/800/1000',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Cognac'],
    category: 'Accessories',
    dataAiHint: 'leather tote',
  },
  {
    id: '5',
    name: 'Cashmere Blend Scarf',
    description:
      'Stay warm and stylish with this incredibly soft cashmere blend scarf. The perfect accessory for chilly days.',
    price: 95.5,
    images: [
      'https://picsum.photos/seed/scarf1/800/1000',
      'https://picsum.photos/seed/scarf2/800/1000',
    ],
    sizes: ['One Size'],
    colors: ['Heather Grey', 'Charcoal'],
    category: 'Accessories',
    dataAiHint: 'cashmere scarf',
  },
  {
    id: '6',
    name: 'Tailored Wool Blazer',
    description:
      'A beautifully tailored single-breasted blazer made from fine Italian wool. Fully lined with a structured shoulder for a sharp silhouette.',
    price: 299.99,
    images: [
      'https://picsum.photos/seed/blazer1/800/1000',
      'https://picsum.photos/seed/blazer2/800/1000',
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Charcoal Grey', 'Navy Blue'],
    category: 'Outerwear',
    dataAiHint: 'womens blazer',
  },
  {
    id: '7',
    name: 'Ribbed Knit Sweater',
    description:
      'A cozy and chic ribbed knit sweater with a mock neck design. Made from a soft merino wool blend.',
    price: 110.0,
    images: [
      'https://picsum.photos/seed/sweater1/800/1000',
      'https://picsum.photos/seed/sweater2/800/1000',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Black'],
    category: 'Knitwear',
    dataAiHint: 'womens sweater',
  },
  {
    id: '8',
    name: 'Leather Ankle Boots',
    description:
      'Versatile and comfortable, these ankle boots are crafted from smooth leather and feature a sturdy block heel and side zip closure.',
    price: 180.0,
    images: [
      'https://picsum.photos/seed/boots1/800/1000',
      'https://picsum.photos/seed/boots2/800/1000',
    ],
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Black', 'Brown'],
    category: 'Shoes',
    dataAiHint: 'leather boots',
  },
];

export const shopTheLookItems = {
  main: {
    image: 'https://picsum.photos/seed/lookmain/800/1200',
    dataAiHint: 'fashion outfit',
  },
  items: [products[5], products[1], products[7]],
};
