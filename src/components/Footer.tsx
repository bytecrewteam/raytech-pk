import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">
              Get PKR 1,000 Off Your First Order
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Subscribe for exclusive deals, tech tips, and new product drops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Shop</h4>
            <ul className="space-y-2">
              {["Gaming Laptops", "Desktop Components", "Peripherals", "Monitors"].map((item) => (
                <li key={item}>
                  <a href="/search" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              {["Shipping Info", "Returns & Refunds", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                support@raytechpk.com
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                +92 321 555-0142
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                Lahore, Punjab, Pakistan
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                Mon-Sat: 10AM-8PM PKT
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="font-heading font-bold text-primary-foreground text-[10px]">R</span>
            </div>
            <span className="text-xs text-muted-foreground">
              © 2025 RayTechPK. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground">We accept:</span>
            <div className="flex gap-2 text-[10px] text-muted-foreground">
              <span className="px-2 py-1 rounded bg-secondary">JazzCash</span>
              <span className="px-2 py-1 rounded bg-secondary">EasyPaisa</span>
              <span className="px-2 py-1 rounded bg-secondary">COD</span>
              <span className="px-2 py-1 rounded bg-secondary">Bank</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
