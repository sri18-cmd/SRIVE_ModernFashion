import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/mock-data';
import { ShopTheLook } from '@/components/ShopTheLook';
import { auth } from '@/lib/firebase';
import { LogOut, User } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="relative h-[60vh] md:h-[80vh] w-full text-center flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="https://picsum.photos/seed/hero-fashion/1800/1200"
          alt="Model wearing Srive collection"
          data-ai-hint="fashion model"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-2xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Effortless Style, Redefined
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground">
            Curated collections for the modern individual. Discover pieces that
            tell your story.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Collections</Link>
          </Button>
        </div>
      </section>

      <ShopTheLook />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured This Week
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button asChild variant="secondary" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
