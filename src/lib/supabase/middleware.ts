import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
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

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const pathname = request.nextUrl.pathname;

  const authPaths = ["/signin", "/signup", "/signout"];
  const publicPaths = ["/unauthorized"];
  const adminRoots = ["/projects", "/blog", "/skills", "/contacts", "/social", "/"];

  const isAuthRoute = authPaths.includes(pathname);
  const isPublicRoute = publicPaths.includes(pathname);
  const isAdminRoute = adminRoots.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Not logged in: redirect to signin for admin pages
  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Logged in: prevent access to auth pages
  if (user && isAuthRoute && pathname !== "/signout") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Admin check for admin routes
  if (user && isAdminRoute && !isPublicRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.sub)
      .single();

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
