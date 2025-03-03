import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response
  const response = NextResponse.json({ success: true });
  
  // Delete the session cookie
  response.cookies.set({
    name: 'session',
    value: '',
    expires: new Date(0), // This will make the cookie expire immediately
    path: '/',
  });
  
  return response;
}