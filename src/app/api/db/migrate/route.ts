import { NextResponse } from 'next/server';
import { migrate } from '../../../db/migrations/Migrations';

/**
 * Migrate to the latest db state
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrate('latest');

  return NextResponse.json({ status: results });
}
