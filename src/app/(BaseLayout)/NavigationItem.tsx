import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import React, { ReactElement } from 'react';

interface NavigationItemProps extends FlexProps {
  icon: IconType;
  children: ReactElement | string;
}
export default function NavigationItem({ icon, children, ...rest }: NavigationItemProps): ReactElement {
  return (
    <Link href='#' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
