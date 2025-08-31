export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  dataAiHint: string;
};

export type CartItem = {
  id: string; // Unique ID for cart item, e.g., `${product.id}-${size}`
  product: Product;
  size: string;
  quantity: number;
};
