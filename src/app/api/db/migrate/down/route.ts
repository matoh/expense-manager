import { NextResponse } from 'next/server';
import { migrateOneDown } from '../../../../db/migrations/MigrationHelper';

/**
 * Execute one down migration at the time
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrateOneDown();

  return NextResponse.json({ status: results });
}
