import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function verifyJWT(token: string, secretStr: string): Promise<boolean> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    if (!headerB64 || !payloadB64 || !signatureB64) return false;

    // Convert secret to key
    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode(secretStr);
    const key = await crypto.subtle.importKey(
      'raw',
      secretKeyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Verify signature
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      data
    );

    if (!isValid) return false;

    // Check expiration and role
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return false;
    }
    if (payload.role !== 'admin') {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';
    const isValid = await verifyJWT(token, secret);
    if (!isValid) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
