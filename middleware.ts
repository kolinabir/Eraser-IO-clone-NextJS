import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    const loginUrl = new URL("/api/auth/login", request.nextUrl.origin);
    loginUrl.searchParams.set("post_login_redirect_url", request.nextUrl.href);

    return NextResponse.redirect(loginUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard"],
};
