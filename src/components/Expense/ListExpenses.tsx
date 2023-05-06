'use client';

import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Selectable } from 'kysely';
import { Expense } from 'kysely-codegen/dist/db';

interface ListExpensesProps {
  expenses: Selectable<Expense>[];
}

export default function ListExpenses({ expenses }: ListExpensesProps) {
  return (
    <>
      <Box mb='2' textAlign='right'>
        <Button colorScheme='teal'>Create</Button>
      </Box>
      <TableContainer bgColor='white' borderRadius='lg'>
        <Table>
          <Thead>
            <Tr>
              <Th>Merchant</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount (SEK)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.merchant}</Td>
                <Td>{expense.category}</Td>
                <Td>{dayjs(expense.created_at).format('YYYY/MM/DD')}</Td>
                <Td isNumeric>{expense.cost_sek}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
