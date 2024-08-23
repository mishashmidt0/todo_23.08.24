import { type NextRequest, NextResponse } from 'next/server';

export default function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  if (pathname.startsWith('/auth')) {
    if (token) {
      // Если токен существует, перенаправить на главную страницу
      const redirectUrl = request.nextUrl.clone();

      redirectUrl.pathname = '/';

      return NextResponse.redirect(redirectUrl);
    }

    // Если токен не существует, продолжить на страницу /auth
    return NextResponse.next();
  }

  if (!token) {
    // Если токен не существует и пользователь пытается перейти на другую страницу, перенаправить на /auth
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = '/auth';

    return NextResponse.redirect(redirectUrl);
  }

  // Если токен существует и пользователь пытается перейти на другую страницу, продолжить
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
