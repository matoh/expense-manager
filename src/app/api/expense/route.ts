import { NextResponse } from 'next/server';
import { kyselyConnection } from '../../db/Database';

/**
 * Create expense record
 * @param request
 */
export async function POST(request: Request) {
  const formData = await request.json();

  const db = kyselyConnection();
  const createdExpense = await db.insertInto('expense').values(formData).returningAll().execute();

  return NextResponse.json({ status: 'success', data: createdExpense });
}

/**
 * Delete expense record
 * @param request
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const db = kyselyConnection();
  const removedExpenseId = await db.deleteFrom('expense').where('id', '=', Number(id)).execute();

  return NextResponse.json({ status: 'success', removedId: removedExpenseId });
}
