import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAPIClient } from "./lib/supabase/server-client";
import { authRoutes, publicRoutes } from "./constants/middleware";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|css|js|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  const supabase = await createAPIClient();
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims ?? null;
  const hasClaims = !!claims;

  const isAuthPage = authRoutes.some((p) => pathname.startsWith(p));
  const isPublicPage = publicRoutes.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isPrivatePage = !isAuthPage && !isPublicPage;

  if (!hasClaims && isPrivatePage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (hasClaims && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}
