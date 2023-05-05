import { NextResponse } from 'next/server';
import { migrateToLatest } from '../../../db/migrations/MigrationHelper';

/**
 * Migrate to the latest db state
 * @param request
 */
export async function GET(request: Request) {
  const results = await migrateToLatest();

  return NextResponse.json({ status: results });
}
