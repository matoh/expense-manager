import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import React, { ReactElement } from 'react';
import { Link } from '@chakra-ui/next-js';

interface NavigationItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactElement | string;
}
export default function NavigationItem({ icon, link, children, ...rest }: NavigationItemProps): ReactElement {
  return (
    <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'gray.600',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
