import type { Order } from './types';
import { products } from './mock-data';

export const mockOrders: Order[] = [
  {
    id: 'SRV73629',
    date: '2024-07-15',
    status: 'Delivered',
    total: 23998,
    items: [
      {
        product: products.find(p => p.id === '1')!,
        quantity: 1,
        size: 'L',
      },
      {
        product: products.find(p => p.id === '2')!,
        quantity: 1,
        size: 'M',
      },
    ],
  },
  {
    id: 'SRV64910',
    date: '2024-08-01',
    status: 'Shipped',
    total: 30000,
    items: [
      {
        product: products.find(p => p.id === '3')!,
        quantity: 2,
        size: 'M',
      },
       {
        product: products.find(p => p.id === '8')!,
        quantity: 1,
        size: '9',
      },
    ],
  },
    {
    id: 'SRV50219',
    date: '2024-08-10',
    status: 'Processing',
    total: 29999,
    items: [
      {
        product: products.find(p => p.id === '6')!,
        quantity: 1,
        size: '40R',
      },
    ],
  },
];
