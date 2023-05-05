import { NextResponse } from 'next/server';
import { migrateToLatest } from '../../../db/migrations/MigrationHelper';

/**
 * Migrate to the latest db state
 * @param request
 */
export async function GET(request: Request) {
  void migrateToLatest();

  return NextResponse.json({ status: 'OK' });
}
