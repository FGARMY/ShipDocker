import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { TrustBar } from "@/components/TrustBar";
import { WhatsAppButton } from "@/components/storefront/WhatsAppButton";
import { WishlistProvider } from "@/context/WishlistContext";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <TrustBar />
        <Footer />
        <WhatsAppButton />
      </div>
    </WishlistProvider>
  );
}
