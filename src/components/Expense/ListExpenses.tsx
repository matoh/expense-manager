'use client';

import {
  Box,
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Selectable } from 'kysely';
import { Expense } from 'kysely-codegen/dist/db';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import CreateExpenseModal from './CreateExpenseModal';

interface ListExpensesProps {
  expenses: Selectable<Expense>[];
}

export default function ListExpenses({ expenses }: ListExpensesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeletePopoverOpen, onOpen: onDeletePopoverOpen, onClose: onDeletePopoverClose } = useDisclosure();

  return (
    <>
      <Box mb='2' textAlign='right'>
        <Button colorScheme='teal' onClick={onOpen}>
          Create
        </Button>
        <CreateExpenseModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <TableContainer bgColor='white' borderRadius='lg'>
        <Table>
          <Thead>
            <Tr>
              <Th>Merchant</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount (SEK)</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.merchant}</Td>
                <Td>{expense.category}</Td>
                <Td>{dayjs(expense.created_at).format('YYYY/MM/DD')}</Td>
                <Td isNumeric>{expense.cost_sek}</Td>
                <Td>
                  <HStack>
                    <IconButton icon={<AiFillEdit />} aria-label='Edit expense' />
                    <Popover isLazy>
                      {({ onClose }) => (
                        <>
                          <PopoverTrigger>
                            <IconButton icon={<AiFillDelete />} aria-label='Delete expense' />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Delete expense!</PopoverHeader>
                            <PopoverBody>
                              <Text whiteSpace='normal'>Are you sure you want to delete an expense?</Text>
                            </PopoverBody>
                            <PopoverFooter>
                              <HStack width='full'>
                                <Button width='full' variant='ghost' onClick={onClose}>
                                  Close
                                </Button>
                                <Button width='full' colorScheme='teal'>
                                  Delete
                                </Button>
                              </HStack>
                            </PopoverFooter>
                          </PopoverContent>
                        </>
                      )}
                    </Popover>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
