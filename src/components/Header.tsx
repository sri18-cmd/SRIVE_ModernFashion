"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAppContext } from '@/context/AppContext';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import { Badge } from './ui/badge';

const navLinks = [
  { href: '/products', label: 'Collections' },
  { href: '/style-quiz', label: 'Style AI' },
  { href: '#', label: 'About' },
];

export function Header() {
  const { cartCount, wishlist } = useAppContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">SRIVE</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavContent />
          </nav>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                 <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">SRIVE</span>
                 </Link>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" aria-label="Close menu">
                     <X className="h-5 w-5" />
                   </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col space-y-4 mt-6">
                <NavContent />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
             <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-lg">SRIVE</span>
             </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="User Profile">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative" aria-label="Wishlist">
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                   <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">{wishlist.length}</Badge>
                )}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">{cartCount}</Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
