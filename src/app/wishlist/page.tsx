"use client";

import { useAppContext } from "@/context/AppContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Your Wishlist</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your curated collection of favorite items.
        </p>
      </header>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Exploring</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
