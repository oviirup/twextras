import { Route } from "next";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { UserStatus } from "@/prisma/generated/enums";
import { isActiveUser } from "../auth/utils";

const OPEN_PATHS: Route[] = ["/dashboard/signin", "/dashboard/signup"];
const PROFILE_PATH: Route = "/dashboard/profile";

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

  if (!user || !isActiveUser(user)) {
    return NextResponse.redirect(signinURL);
  }

  if (user.status === UserStatus.pending && pathname !== PROFILE_PATH) {
    return NextResponse.redirect(new URL(PROFILE_PATH, request.url));
  }

  return NextResponse.next();
}
