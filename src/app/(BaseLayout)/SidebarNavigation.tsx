import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { FiHome, FiSettings, FiTrendingUp, FiList } from 'react-icons/fi';
import NavigationItem from './NavigationItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Expenses', icon: FiList },
  { name: 'Reports', icon: FiTrendingUp },
  { name: 'Settings', icon: FiSettings },
];

interface SidebarNavigationProps extends BoxProps {
  onClose: () => void;
}

export default function SidebarNavigation({ onClose, ...rest }: SidebarNavigationProps): ReactElement {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '64' }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='4' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Expense Manager
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavigationItem key={link.name} icon={link.icon}>
          {link.name}
        </NavigationItem>
      ))}
    </Box>
  );
}
