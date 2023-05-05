import { NextResponse } from 'next/server';
import { migrateOneUp } from '../../../../db/migrations/MigrationHelper';

/**
 * Execute one up migration at the time
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrateOneUp();

  return NextResponse.json({ status: results });
}
