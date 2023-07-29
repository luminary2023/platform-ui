import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("logged");

  if (!isLogin) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/wallet")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/giftCard")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/emailVerification")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (url.pathname === "/") {
      return NextResponse.redirect(url);
    }
  }
}
