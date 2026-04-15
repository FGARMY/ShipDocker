import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SMDrop — Premium Dropshipping Store",
    template: "%s | SMDrop",
  },
  description:
    "Discover premium products at unbeatable prices. Free shipping on orders over ₹999. Fast delivery, easy returns.",
  keywords: ["dropshipping", "online store", "premium products", "free shipping"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SMDrop",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('smdrop-theme');
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
        <Providers>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </Providers>
        <WhatsAppButton />
      </body>
    </html>
  );
}
