"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartCount } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Shopping Cart</h1>
      </header>
      
      {cart.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.id} className="flex items-center p-4">
                <div className="relative w-24 h-32 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} data-ai-hint={item.product.dataAiHint} fill className="object-cover" />
                </div>
                <div className="ml-4 flex-grow">
                  <Link href={`/products/${item.product.id}`} className="font-semibold hover:underline">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm text-muted-foreground">Price: ${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4 mx-4">
                  <Input 
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                    className="h-9 w-16 text-center"
                    aria-label={`Quantity for ${item.product.name}`}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.product.name} from cart`}>
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Add some items to get started.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
