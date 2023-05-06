import { NextResponse } from 'next/server';
import { migrate } from '../../../../db/migrations/Migrations';

/**
 * Execute one up migration at the time
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrate('up');

  return NextResponse.json({ status: results });
}
