"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useAppContext } from '@/context/AppContext';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isItemInWishlist, addToCart } = useAppContext();
  const inWishlist = isItemInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0]);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <Link href={`/products/${product.id}`} aria-label={product.name}>
        <CardContent className="p-0">
          <div className="relative aspect-[3/4]">
            <Image
              src={product.images[0]}
              alt={product.name}
              data-ai-hint={product.dataAiHint}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-9 w-9 bg-background/70 hover:bg-background"
                onClick={handleToggleWishlist}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={cn("h-5 w-5", inWishlist ? "fill-red-500 text-red-500" : "text-foreground")} />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-md truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              <Button
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
