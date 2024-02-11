import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isLogin = pathname.startsWith("/login");

  // Allow access to all image files (adjust file extensions as needed)
  const isImageFile = /\.(jpg|jpeg|png|gif)$/i.test(pathname);
  if (isImageFile) {
    return NextResponse.next();
  }

  const allowedPaths = ["/", "/login", "/aboutme", "/register"];

  if (!isCookiesExist && !allowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isCookiesExist && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  // Matcher should include all paths that don't need authentication
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
