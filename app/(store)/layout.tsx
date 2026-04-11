import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { TrustBar } from "@/components/storefront/TrustBar";
import { WhatsAppButton } from "@/components/storefront/WhatsAppButton";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <TrustBar />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
