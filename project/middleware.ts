import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const teamSession = request.cookies.get('team-session')
  const adminSession = request.cookies.get('admin-session')
  const { pathname } = request.nextUrl

  // Admin routes
  if (pathname.startsWith('/admin')) {
    // Admin login page is public
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check admin authentication
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Add admin ID to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-admin-id', adminSession.value)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Admin API routes
  if (pathname.startsWith('/api/admin')) {
    // Admin login API is public
    if (pathname === '/api/auth/admin-login') {
      return NextResponse.next()
    }

    // Check admin authentication for API routes
    if (!adminSession) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      )
    }

    // Add admin ID to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-admin-id', adminSession.value)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Team routes (existing logic)
  // Public routes that don't require authentication
  const publicRoutes = ['/team-login', '/api/auth/team-login', '/api/auth/admin-login', '/api/auth/admin-logout']
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For team protected routes, check if team is logged in
  if (!teamSession) {
    // Redirect to login page for web routes
    if (!pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/team-login', request.url))
    }
    
    // Return 401 for API routes
    return NextResponse.json(
      { error: 'Team authentication required' },
      { status: 401 }
    )
  }

  // Add team ID to request headers for easy access in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-team-id', teamSession.value)
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}