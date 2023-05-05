import { NextResponse } from 'next/server';
import { migrateOneDown } from '../../../../db/migrations/MigrationHelper';

/**
 * Execute one down migration at the time
 * @param request
 */
export async function GET(request: Request) {
  void migrateOneDown();

  return NextResponse.json({ status: 'OK' });
}
