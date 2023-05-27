import { NextResponse } from 'next/server';
import { kyselyConnection } from '../../../db/Database';

/**
 * Create expense record
 * @param request
 */
export async function POST(
  request: Request,
  {
    params
  }: {
    params: { expenseId: number };
  }
) {
  const formData = await request.json();
  const db = kyselyConnection();
  const createdExpense = await db
    .updateTable('expense')
    .set({
      merchant: formData.merchant,
      category: formData.category,
      cost_eur: formData.cost_eur,
      cost_sek: formData.cost_sek,
      date: formData.date
    })
    .where('expense.id', '=', params.expenseId)
    .returningAll()
    .executeTakeFirst();

  return NextResponse.json({ status: 'success', data: createdExpense });
}
