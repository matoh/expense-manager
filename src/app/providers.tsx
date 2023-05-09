'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

/**
 * Necessary to ensure that computed styles are included in the initial server payload (during streaming)
 * @param children
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'top', status: 'success', isClosable: true } }}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
