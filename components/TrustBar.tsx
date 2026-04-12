import { ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";

export function TrustBar() {
  return (
    <div className="w-full border-t border-border bg-card/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Main Trust Signal */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">100% Secure Checkout</p>
              <p className="text-xs text-muted-foreground">Certified SSL security and encrypted data</p>
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl italic tracking-tighter text-[#1a1f71]">VISA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl italic tracking-tighter text-[#eb001b]">Mastercard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 bg-[#707070] rounded-sm opacity-20 relative">
                 <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">UPI</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="font-bold text-lg text-[#001d3d] flex items-center gap-1">
                 <Lock size={14} className="text-green-500" />
                 RAZORPAY
               </span>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium">Fast Pan-India Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium">Easy 7-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
