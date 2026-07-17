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

  // Refresh session so the token stays current between requests.
  // getUser() is the secure way — it validates the token server-side.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users away from protected /programme routes.
  // /programme/login and the auth callback are public.
  const isPublic =
    pathname === "/programme/login" ||
    pathname.startsWith("/auth/callback");

  if (!isPublic && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/programme/login";
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from the login page.
  if (pathname === "/programme/login" && user) {
    const hubUrl = request.nextUrl.clone();
    hubUrl.pathname = "/programme";
    return NextResponse.redirect(hubUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/programme/:path*", "/auth/callback"],
};
