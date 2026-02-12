import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { allProducts } from "@/data/products";
import { Star, ShoppingCart, Heart } from "lucide-react";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const DealsPage = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const deals = allProducts.filter((p) => p.badgeType === "deal" || p.originalPrice);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Deals & Offers 🔥</h1>
          <p className="text-muted-foreground text-sm">Grab the best prices on performance-tested hardware.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((product) => (
            <div key={product.id} className="group bg-card rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden">
              <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                {product.badge && (
                  <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-destructive text-destructive-foreground">{product.badge}</span>
                )}
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
                <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-xs hover:brightness-110 transition-all">
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

export default DealsPage;
