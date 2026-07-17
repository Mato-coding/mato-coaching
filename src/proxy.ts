import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// @supabase/ssr cookie names follow sb-<project-ref>-auth-token and may be
// split into chunks (sb-<ref>-auth-token.0, .1, ...). Check generically, no
// project ref hardcoded, so we can skip the Supabase roundtrip entirely when
// a visitor has no session cookie at all.
function hasAuthCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some(
      (cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("-auth-token")
    );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProgrammeRoute = pathname.startsWith("/programme");
  const isLoginRoute = pathname === "/programme/login";

  if (!hasAuthCookie(request)) {
    // No session cookie at all: there is nothing for getUser() to refresh
    // or validate, so skip the Supabase client entirely.
    if (isProgrammeRoute && !isLoginRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/programme/login";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session on every request (site-wide, not just /programme) so
  // logged-in clients stay signed in across the whole site over weeks instead
  // of only within the members area. getUser() is the secure way — it
  // validates the token server-side.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from protected /programme routes.
  if (isProgrammeRoute && !isLoginRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/programme/login";
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from the login page.
  if (isLoginRoute && user) {
    const hubUrl = request.nextUrl.clone();
    hubUrl.pathname = "/programme";
    return NextResponse.redirect(hubUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|m4a)$).*)",
  ],
};
