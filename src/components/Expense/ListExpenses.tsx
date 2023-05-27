'use client';

import {
  Button,
  Flex,
  Heading,
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Selectable } from 'kysely';
import { Expense } from 'kysely-codegen/dist/db';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { deleteExpense } from '../../api/ExpenseApi';
import CreateExpenseModal from './CreateExpenseModal';
import EditExpenseModal from './EditExpenseModal';

interface ListExpensesProps {
  expenses: Selectable<Expense>[];
}

export default function ListExpenses({ expenses }: ListExpensesProps) {
  const [selectedExpense, setSelectedExpense] = useState<Selectable<Expense>>();
  const { isOpen: isOpenCreateExpense, onOpen: onOpenCreateExpense, onClose: onCloseCreateExpense } = useDisclosure();
  const { isOpen: isOpenEditExpense, onOpen: onOpenEditExpense, onClose: onCloseEditExpense } = useDisclosure();
  const router = useRouter();
  const notification = useToast();

  const handleDeleteExpense = (expenseId: number) =>
    deleteExpense({
      expenseId,
      onSuccess: () => {
        notification({ title: 'Successfully removed expense' });
        router.refresh();
      }
    });

  return (
    <>
      <Flex justifyContent='space-between' mb='4'>
        <Heading size='lg'>Expenses</Heading>
        <Button colorScheme='teal' onClick={onOpenCreateExpense}>
          Create
        </Button>
        <CreateExpenseModal isOpen={isOpenCreateExpense} onClose={onCloseCreateExpense} />
      </Flex>
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
                <Td>{dayjs(expense.date).format('YYYY/MM/DD')}</Td>
                <Td isNumeric>{expense.cost_sek}</Td>
                <Td>
                  <IconButton
                    onClick={() => {
                      onOpenEditExpense();
                      setSelectedExpense(expense);
                    }}
                    icon={<AiFillEdit />}
                    aria-label='Edit expense'
                    mr='2'
                  />
                  <Popover isLazy placement='left'>
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
                              <Button width='full' colorScheme='teal' onClick={() => handleDeleteExpense(expense.id)}>
                                Delete
                              </Button>
                            </HStack>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          isOpen={isOpenEditExpense}
          onClose={() => {
            onCloseEditExpense();
            setSelectedExpense(undefined);
          }}
        />
      )}
    </>
  );
}
