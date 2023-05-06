import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import React, { ReactElement } from 'react';

interface HeaderNavigationProps extends FlexProps {
  onOpen: () => void;
}

export default function HeaderNavigation({ onOpen, ...rest }: HeaderNavigationProps): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: '0', md: '64' }}
      px={{ base: '4', md: '4' }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant='outline' aria-label='open menu' icon={<FiMenu />} />
      <Text display={{ base: 'flex', md: 'none' }} fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
        Expense Manager
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} />
        <Flex alignItems='center'>
          <Menu>
            <MenuButton py='2' transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
              <HStack>
                <VStack display={{ base: 'none', md: 'flex' }} alignItems='flex-start' spacing='1px' ml='2'>
                  <Text fontSize='sm'>John Doe</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Role
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={() => toggleColorMode()}>{colorMode === 'light' ? 'Dark mode (Beta)' : 'Light mode'}</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
