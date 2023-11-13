import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("token");

  if (!isLogin) {
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/wallet") ||
      request.nextUrl.pathname.startsWith("/giftCard") ||
      request.nextUrl.pathname.startsWith("/settings") ||
      request.nextUrl.pathname.startsWith("/crypto")
    ) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else {
    if (url.pathname === "/") {
      return NextResponse.redirect(url);
    }
  }
}
