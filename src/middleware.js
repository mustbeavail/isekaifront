import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const lower = pathname.toLowerCase();

  if (pathname !== lower) {
    url.pathname = lower;
    return NextResponse.redirect(url, 301);
  }
}