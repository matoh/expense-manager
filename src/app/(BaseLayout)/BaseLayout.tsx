'use client';

import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import HeaderNavigation from './HeaderNavigation';
import SidebarNavigation from './SidebarNavigation';

export default function BaseLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarNavigation onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='md'
      >
        <DrawerContent>{<SidebarNavigation onClose={onClose} />}</DrawerContent>
      </Drawer>
      <HeaderNavigation onOpen={onOpen} />
      <Box ml={{ base: 0, md: 64 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}
