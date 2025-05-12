import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Récupérer le token depuis les cookies
  const token = request.cookies.get('token')?.value;
  
  // Liste des chemins protégés
  const protectedPaths = ['/dashboard', '/sessions', '/characters'];
  // Chemins d'authentification
  const authPaths = ['/login', '/register'];
  
  const path = request.nextUrl.pathname;
  
  // Vérifier si le chemin actuel est protégé
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  const isAuthPath = authPaths.some(ap => path === ap);
  
  // Si le chemin est protégé et que l'utilisateur n'est pas connecté
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }
  
  // Si l'utilisateur est déjà connecté et essaie d'accéder aux pages d'auth
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sessions/:path*',
    '/characters/:path*',
    '/login',
    '/register',
  ],
};