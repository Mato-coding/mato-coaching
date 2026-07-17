import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
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

  const { pathname } = request.nextUrl;
  const isProgrammeRoute = pathname.startsWith("/programme");
  const isLoginRoute = pathname === "/programme/login";

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
