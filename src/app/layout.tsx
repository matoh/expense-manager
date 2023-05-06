import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import BaseLayout from '../components/Layout/BaseLayout';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Expense Manager',
  description: 'Expense manager with monthly reports and different statistics'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
