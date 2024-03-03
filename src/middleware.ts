import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { GetSession } from "./utils/sessionManager";

const authenticatedRoutes = ["/core"];

export async function middleware(request: NextRequest) {
  const session = await GetSession();

  if (session != null && session.isLoggedIn) {
    return NextResponse.next();
  } else {
    if (authenticatedRoutes.filter((route) => request.url.includes(route)).length > 0)
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
