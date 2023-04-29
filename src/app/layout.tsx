import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Expense Manager',
  description: 'Expense manager with monthly reports and different statistics'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
