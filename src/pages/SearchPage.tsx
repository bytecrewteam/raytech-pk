import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { allProducts } from "@/data/products";
import { sanitizeUrlParam } from "@/lib/sanitize";
import { formatPKR, ANIMATION_DURATION_MS, MAX_SEARCH_LENGTH } from "@/lib/format";
import { Search, ShoppingCart, Heart } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQ = sanitizeUrlParam(searchParams.get("q"));
  const [query, setQuery] = useState(initialQ);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product);
    setAnimatingButton(product.id);
    setTimeout(() => setAnimatingButton(null), ANIMATION_DURATION_MS);
  };

  const results = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, MAX_SEARCH_LENGTH))}
              placeholder="Search 200+ products..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              autoFocus
              maxLength={MAX_SEARCH_LENGTH}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{results.length} product{results.length !== 1 ? "s" : ""} found</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <div key={product.id} className="group bg-card rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden">
              <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.name) ? "fill-current text-destructive" : ""}`} />
                </button>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </Link>
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-heading font-semibold text-foreground text-xs mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono font-bold text-sm text-foreground">{formatPKR(product.price)}</span>
                  {product.originalPrice && <span className="font-mono text-[10px] text-muted-foreground line-through">{formatPKR(product.originalPrice)}</span>}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-xs hover:brightness-110 transition-all gemini-border-animate ${animatingButton === product.id ? 'active' : ''}`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
