import { NextResponse, NextRequest } from "next/server";
import { SupabaseServer } from "@/lib/supabase/connection/supabase-server";
import { UserTable } from "./lib/repository";

export async function middleware(request: NextRequest) {
  const supabase = await SupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userRol = await UserTable.getUserById(user?.id ?? "");
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" && !user?.id && userRol.data?.rol !== 1) {
    return NextResponse.redirect(new URL("/", request.nextUrl)); // "/"
  }

  if ((pathname === "/login" || pathname === "/register") && user?.id) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
