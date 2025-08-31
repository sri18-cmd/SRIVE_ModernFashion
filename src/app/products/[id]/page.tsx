"use client";

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { addToCart, toggleWishlist, isItemInWishlist } = useAppContext();
  const params = use(paramsPromise);
  const product = products.find((p) => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors[0]);

  if (!product) {
    notFound();
  }

  const inWishlist = isItemInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    } else {
      // In a real app, show a toast or error message
      alert("Please select a size.");
    }
  };
  
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={product.images[selectedImage]}
              alt={`${product.name} image ${selectedImage + 1}`}
              data-ai-hint={product.dataAiHint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square w-full rounded-md overflow-hidden ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  selectedImage === index && "ring-2 ring-ring"
                )}
              >
                <Image src={img} alt={`Thumbnail ${index + 1}`} data-ai-hint={product.dataAiHint} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold">₹{product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
            <div className="flex items-center space-x-2 mt-2">
              {product.colors.map((color) => (
                <button 
                    key={color} 
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                        "w-8 h-8 rounded-full border-2",
                        selectedColor === color ? 'border-primary' : 'border-transparent'
                    )}
                    style={{backgroundColor: color.split(' ')[1] || color}} // Simple color parsing
                    aria-label={`Select color ${color}`}
                >
                    <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground">Size</h3>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2 mt-2">
               {product.sizes.map((size) => (
                 <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only"/>
                    <Label 
                        htmlFor={`size-${size}`}
                        className={cn(
                            "flex items-center justify-center rounded-md border text-sm p-2 h-10 w-14 cursor-pointer",
                            "hover:bg-accent",
                            selectedSize === size ? "bg-secondary text-secondary-foreground border-secondary-foreground" : "bg-transparent"
                        )}
                    >
                        {size}
                    </Label>
                 </div>
               ))}
            </RadioGroup>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!selectedSize}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleToggleWishlist} aria-label="Toggle Wishlist">
              <Heart className={cn("h-6 w-6", inWishlist ? "fill-red-500 text-red-500" : "")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
