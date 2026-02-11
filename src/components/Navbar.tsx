import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart, User, ChevronDown } from "lucide-react";

const categories = [
  "Gaming Laptops",
  "Desktop Components",
  "Gaming Peripherals",
  "Monitors & Displays",
  "Storage Solutions",
  "Networking",
  "PC Cases & Cooling",
  "Power Supplies & UPS",
  "Cables & Adapters",
  "Tech Accessories",
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Free shipping on orders over PKR 15,000 🚚</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>📞 +92 321 555-0142</span>
            <span>Mon-Sat: 10AM-8PM PKT</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-sm">R</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                RayTech<span className="text-primary">PK</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </a>
              <a href="#featured" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Featured
              </a>
              <a href="#deals" className="text-sm text-primary font-medium">
                Deals 🔥
              </a>
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Reviews
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:flex p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Heart className="w-5 h-5" />
              </button>
              <button className="hidden sm:flex p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <User className="w-5 h-5" />
              </button>
              <button className="relative p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors text-foreground">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in-up">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search 800+ products... (e.g., RTX 4070, mechanical keyboard)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in-up">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a href="#categories" className="block py-2 text-sm text-muted-foreground hover:text-foreground">Categories</a>
              <a href="#featured" className="block py-2 text-sm text-muted-foreground hover:text-foreground">Featured</a>
              <a href="#deals" className="block py-2 text-sm text-primary font-medium">Deals 🔥</a>
              <a href="#reviews" className="block py-2 text-sm text-muted-foreground hover:text-foreground">Reviews</a>
              <a href="#about" className="block py-2 text-sm text-muted-foreground hover:text-foreground">About</a>
              <div className="flex gap-2 pt-2 border-t border-border">
                <button className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                  <Heart className="w-4 h-4" /> Wishlist
                </button>
                <button className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground ml-4">
                  <User className="w-4 h-4" /> Account
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
