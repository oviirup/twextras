import { Metadata } from "next";
import { SITE } from "@/config/app";
import { fontsClassNames } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "#globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: SITE.TITLE,
    template: `%s | ${SITE.TITLE}`,
  },
  description: SITE.DESCRIPTION,
  openGraph: {
    type: "website",
    title: {
      default: SITE.TITLE,
      template: `%s | ${SITE.TITLE}`,
    },
    description: SITE.DESCRIPTION,
    locale: "en",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BaseLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("antialiased", fontsClassNames)}>
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
