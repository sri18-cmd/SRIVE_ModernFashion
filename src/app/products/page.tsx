"use client";

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products as allProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const allCategories = [...new Set(allProducts.map((p) => p.category))];
const sizes = [...new Set(allProducts.flatMap((p) => p.sizes))];
const colors = [...new Set(allProducts.flatMap((p) => p.colors))];
const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)));

const ProductSection = ({ title, products }: { title: string, products: Product[] }) => {
  if (products.length === 0) return null;
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  }
  
  const productsByCat = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">All Collections</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find your next favorite piece from our curated collections.
        </p>
      </header>
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">Filters</h2>
            <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${category}`} />
                      <Label htmlFor={`cat-${category}`}>{category}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size">
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent className="space-y-2">
                   {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`}>{size}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="color">
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent className="space-y-2">
                   {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox id={`color-${color}`} />
                      <Label htmlFor={`color-${color}`}>{color}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <Slider 
                    min={0}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button className="w-full mt-6">Apply Filters</Button>
          </div>
        </aside>

        <main className="lg:col-span-3 space-y-16">
           <ProductSection title="Outerwear" products={productsByCat['Outerwear'] || []} />
           <ProductSection title="Knitwear" products={productsByCat['Knitwear'] || []} />
           <ProductSection title="Shirts" products={productsByCat['Shirts'] || []} />
           <ProductSection title="T-Shirts" products={productsByCat['T-Shirts'] || []} />
           <ProductSection title="Trousers" products={productsByCat['Trousers'] || []} />
           <ProductSection title="Shoes" products={productsByCat['Shoes'] || []} />
           <ProductSection title="Accessories" products={productsByCat['Accessories'] || []} />
        </main>
      </div>
    </div>
  );
}
