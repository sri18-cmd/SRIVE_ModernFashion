"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isItemInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prevCart => {
      const cartItemId = `${product.id}-${size}`;
      const existingItem = prevCart.find(item => item.id === cartItemId);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { id: cartItemId, product, size, quantity }];
      }
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} (${size}) has been added to your cart.`,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        toast({
          description: `${product.name} removed from wishlist.`,
        });
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        toast({
          description: `${product.name} added to wishlist.`,
        });
        return [...prevWishlist, product];
      }
    });
  };

  const isItemInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateCartQuantity, toggleWishlist, isItemInWishlist, clearCart, cartTotal, cartCount }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
