import { mwDashboard } from "@/modules/middleware/dashboard";

export default mwDashboard;

export const config = {
  matcher: "/dashboard/:path*",
};
