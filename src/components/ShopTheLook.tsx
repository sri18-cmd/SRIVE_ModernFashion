"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { shopTheLookItems } from "@/lib/mock-data";
import { useAppContext } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";

export function ShopTheLook() {
  const { addToCart } = useAppContext();

  const handleAddAllToCart = () => {
    shopTheLookItems.items.forEach((item) => {
      // Add the first available size by default
      addToCart(item, item.sizes[0], 1);
    });
  };

  return (
    <section className="container mx-auto px-4">
      <div className="bg-secondary rounded-lg p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/4] rounded-md overflow-hidden">
            <Image
              src={shopTheLookItems.main.image}
              alt="Shop the look"
              data-ai-hint={shopTheLookItems.main.dataAiHint}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Shop The Look</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Get the complete curated outfit with one click.
            </p>
            <div className="mt-6 space-y-4">
              {shopTheLookItems.items.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} passHref>
                  <Card className="hover:bg-accent transition-colors">
                    <CardContent className="p-3 flex items-center space-x-4">
                      <div className="relative w-16 h-20 rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          data-ai-hint={item.dataAiHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Button size="lg" className="mt-8 w-full md:w-auto" onClick={handleAddAllToCart}>
              Add Full Look to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
