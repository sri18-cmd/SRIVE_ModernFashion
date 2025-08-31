import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Srive - Modern Fashion for the Discerning.',
  description:
    'Discover curated collections and get AI-powered style recommendations. Srive is your destination for modern, high-quality fashion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23212121' d='M69.7,11.2c-15.6-7.8-38.4,2.2-38.4,21.8c0,12.3,13.8,20.6,28.8,19.3c16.3-1.4,29.9-13.6,29.9-28.9C90,12.7,82.3,17.5,69.7,11.2z M30.3,88.8c15.6,7.8,38.4-2.2,38.4-21.8c0-12.3-13.8-20.6-28.8-19.3C23.7,49.1,10,61.3,10,76.5C10,87.3,17.7,82.5,30.3,88.8z'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen')}>
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
