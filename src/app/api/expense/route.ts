import { NextResponse } from 'next/server';

/**
 * Store expense into database
 * @param request
 */
export async function POST(request: Request) {
  const formData = await request.json();

  // TODO: Store data

  return NextResponse.json({ status: formData });
}
