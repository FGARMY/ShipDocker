import { ShieldCheck, CreditCard } from "lucide-react";

export function TrustBar() {
  return (
    <div className="w-full border-t border-border bg-card/30 py-4 flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <ShieldCheck size={16} />
        <span>100% Secure Checkout</span>
      </div>
      <div className="flex gap-3 text-muted-foreground">
        <span className="font-bold text-xs uppercase bg-accent px-2 py-1 rounded">UPI</span>
        <span className="font-bold text-xs uppercase bg-accent px-2 py-1 rounded italic">Visa</span>
        <span className="font-bold text-xs uppercase bg-accent px-2 py-1 rounded text-red-500">Mastercard</span>
        <span className="font-bold text-xs uppercase bg-accent px-2 py-1 rounded text-blue-500">Razorpay</span>
      </div>
    </div>
  );
}
