import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShipDocker — Premium Dropshipping Store",
    template: "%s | ShipDocker",
  },
  description:
    "Discover premium products at unbeatable prices. Free shipping on orders over ₹999. Fast delivery, easy returns.",
  keywords: ["dropshipping", "online store", "premium products", "free shipping"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ShipDocker",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('shipdocker-theme');
                if (theme) {
                  try { theme = JSON.parse(theme).state.theme; } catch(e) {}
                }
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
