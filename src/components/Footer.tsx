import Link from 'next/link';
import { Button } from './ui/button';

// A simple SVG for social media icons as placeholders
const SocialIcon = ({ name }: { name: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {name === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>}
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>}
    {name === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>}
  </svg>
);


export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold">SRIVE</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Modern fashion for the discerning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">Collections</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4 mt-4">
               <Button variant="ghost" size="icon" asChild>
                 <a href="#" aria-label="Instagram"><SocialIcon name="instagram"/></a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                 <a href="#" aria-label="Facebook"><SocialIcon name="facebook"/></a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                 <a href="#" aria-label="Twitter"><SocialIcon name="twitter"/></a>
               </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Srive Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
