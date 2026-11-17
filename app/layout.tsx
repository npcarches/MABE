import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { I18nProvider, LANG_STORAGE_KEY } from "@/i18n/i18n-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LogoMark } from "@/components/logo-mark";
import { vi } from "@/i18n/vi";
import "./globals.css";

const beVietnam = localFont({
  src: [
    { path: "../src/fonts/BeVietnamPro-Regular.ttf", weight: "400" },
    { path: "../src/fonts/BeVietnamPro-Medium.ttf", weight: "500" },
    { path: "../src/fonts/BeVietnamPro-SemiBold.ttf", weight: "600" },
    { path: "../src/fonts/BeVietnamPro-Bold.ttf", weight: "700" },
    { path: "../src/fonts/BeVietnamPro-ExtraBold.ttf", weight: "800" },
  ],
  display: "swap",
  variable: "--font-be-vietnam",
});

// No `title` here: each page renders its own translated <title> (see PageHead and app/page.tsx).
// Search engines read the static HTML, which is Vietnamese.
export const metadata: Metadata = {
  description: vi.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before first paint: hides the page while a stored English choice is applied (see .i18n-pending).
const prePaint = `try{if(localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)})==="en"){document.documentElement.classList.add("i18n-pending");document.documentElement.lang="en"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        <I18nProvider>
          <SiteHeader logo={<LogoMark />} />
          <main>{children}</main>
          <SiteFooter logo={<LogoMark className="f-logo" />} />
        </I18nProvider>
      </body>
    </html>
  );
}
