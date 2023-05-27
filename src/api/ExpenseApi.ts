import { FieldValues } from 'react-hook-form';

interface BaseApiProps {
  onSuccess?: () => void;
  onError?: (errorText: string) => void;
}

interface useCreateExpenseProps extends BaseApiProps {
  values: FieldValues;
}

interface useUpdateExpenseProps extends BaseApiProps {
  values: FieldValues;
  expenseId: number;
}

export async function createExpense({ values, onSuccess = () => {}, onError = () => {} }: useCreateExpenseProps) {
  try {
    const response = await fetch('/api/expense', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });

    response.status == 200 ? onSuccess() : onError(`Error: ${response.statusText}`);
  } catch (error) {
    onError('Something went wrong');
  }
}

export async function updateExpense({ expenseId, values, onSuccess = () => {}, onError = () => {} }: useUpdateExpenseProps) {
  try {
    const response = await fetch(`/api/expense/${expenseId}`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });

    response.status == 200 ? onSuccess() : onError(`Error: ${response.statusText}`);
  } catch (error) {
    onError('Something went wrong');
  }
}

interface useDeleteExpenseProps extends BaseApiProps {
  expenseId: number;
}

export async function deleteExpense({ expenseId, onSuccess = () => {}, onError = () => {} }: useDeleteExpenseProps) {
  try {
    const response = await fetch(`/api/expense?id=${expenseId}`, {
      method: 'DELETE'
    });

    response.status == 200 ? onSuccess() : onError(`Error: ${response.statusText}`);
  } catch (error) {
    onError('Something went wrong');
  }
}
