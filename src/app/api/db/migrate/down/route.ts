import { NextResponse } from 'next/server';
import { migrate } from '../../../../db/migrations/Migrations';

/**
 * Execute one down migration at the time
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrate('down');

  return NextResponse.json({ status: results });
}
