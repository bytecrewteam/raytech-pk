import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Package, Globe } from "lucide-react";

const ShippingPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Shipping Information</h1>
      <div className="space-y-8">
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><Truck className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">Delivery Options</h2></div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex justify-between"><span>Standard Delivery (Nationwide)</span><span className="font-mono text-foreground">PKR 200</span></li>
            <li className="flex justify-between"><span>Express Delivery (Major Cities)</span><span className="font-mono text-foreground">PKR 450</span></li>
            <li className="flex justify-between"><span>Same-Day Delivery (Lahore, Karachi, Islamabad)</span><span className="font-mono text-foreground">PKR 600</span></li>
            <li className="flex justify-between text-success font-medium"><span>Free Shipping on orders over PKR 15,000</span><span>FREE</span></li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">Delivery Timeframes</h2></div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong className="text-foreground">Lahore:</strong> Same-day for orders before 3PM, next-day otherwise</li>
            <li>• <strong className="text-foreground">Karachi & Islamabad:</strong> 1-2 business days</li>
            <li>• <strong className="text-foreground">Other Major Cities:</strong> 2-3 business days</li>
            <li>• <strong className="text-foreground">Remote Areas:</strong> 3-5 business days</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><Package className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">Packaging Standards</h2></div>
          <p className="text-sm text-muted-foreground leading-relaxed">All products are shipped in triple-layered protection with anti-static packaging for electronics. We use eco-friendly recycled materials and minimal plastic. Fragile components like GPUs and monitors receive extra foam cushioning.</p>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">International Shipping</h2></div>
          <p className="text-sm text-muted-foreground leading-relaxed">We ship internationally to UAE, Saudi Arabia, UK, USA, and Canada. International shipping rates are calculated at checkout based on weight and destination. Delivery typically takes 7-14 business days. Import duties and taxes are the responsibility of the buyer.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPage;
