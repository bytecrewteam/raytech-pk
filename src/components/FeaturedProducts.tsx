import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { allProducts } from "@/data/products";
import { useEffect, useRef, useState } from "react";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const stockConfig = {
  "in-stock": { label: "In Stock", className: "text-success" },
  "low-stock": { label: "Only 3 Left!", className: "text-destructive" },
  "pre-order": { label: "Pre-Order", className: "text-primary" },
};

const badgeColors = {
  deal: "bg-destructive text-destructive-foreground",
  new: "bg-primary text-primary-foreground",
  hot: "bg-destructive text-destructive-foreground",
};

const FeaturedProducts = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  useEffect(() => {
    const handleGemini = () => {
      // Animation is handled per-button on click
    };
    window.addEventListener('gemini-animate', handleGemini);
    return () => window.removeEventListener('gemini-animate', handleGemini);
  }, []);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product);
    setAnimatingButton(product.id);
    setTimeout(() => setAnimatingButton(null), 2000);
  };

  return (
    <section id="featured" className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-sm text-muted-foreground">Hand-picked, performance-tested hardware at honest prices.</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-1 text-primary text-sm font-medium hover:underline">View All Products →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.slice(0, 16).map((product) => (
            <div key={product.id} className="group relative bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
              {product.badge && (
                <span className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${badgeColors[product.badgeType || "deal"]}`}>{product.badge}</span>
              )}
              <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors">
                <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.name) ? "fill-current text-destructive" : ""}`} />
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                </div>
              </Link>

              <div className="p-3">
                <p className="text-[9px] uppercase tracking-wider text-primary font-medium mb-0.5">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-heading font-semibold text-foreground text-xs mb-1.5 line-clamp-2 leading-snug hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-2.5 h-2.5 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-mono font-bold text-sm text-foreground">{formatPKR(product.price)}</span>
                  {product.originalPrice && <span className="font-mono text-[10px] text-muted-foreground line-through">{formatPKR(product.originalPrice)}</span>}
                </div>
                <p className={`text-[10px] font-medium mb-2.5 ${stockConfig[product.stock].className}`}>● {stockConfig[product.stock].label}</p>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-xs hover:brightness-110 transition-all active:scale-[0.98] gemini-border-animate ${animatingButton === product.id ? 'active' : ''}`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:hidden">
          <Link to="/products" className="text-primary text-sm font-medium hover:underline">View All Products →</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
