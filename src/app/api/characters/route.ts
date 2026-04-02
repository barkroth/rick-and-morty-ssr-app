import { type NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params = new URLSearchParams();
  const page = searchParams.get('page');
  const status = searchParams.get('status');
  const gender = searchParams.get('gender');

  if (page) params.set('page', page);
  if (status) params.set('status', status);
  if (gender) params.set('gender', gender);

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`);

  if (!res.ok) {
    if (res.status === 404) {
      return NextResponse.json(
        { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: 'API error' }, { status: res.status });
  }

  const data: unknown = await res.json();
  return NextResponse.json(data);
}
