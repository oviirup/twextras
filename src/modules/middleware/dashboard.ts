import { Route } from "next";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { isUserTerminated } from "@/modules/auth/utils";

const OPEN_PATHS: Route[] = ["/dashboard/signin", "/dashboard/signup"];

export async function mwDashboard(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (OPEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  const signinURL = new URL("/dashboard/signin", request.url);
  signinURL.searchParams.set("next", pathname);

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return NextResponse.redirect(signinURL);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { status: true },
  });

  if (!user || isUserTerminated(user)) {
    return NextResponse.redirect(signinURL);
  }

  return NextResponse.next();
}
