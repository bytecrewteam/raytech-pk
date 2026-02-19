import { useState } from "react";
import { useStore } from "@/contexts/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const handleAddToCart = (product: typeof wishlist[0]) => {
    addToCart(product);
    setAnimatingButton(product.id);
    setTimeout(() => setAnimatingButton(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No saved items yet</p>
            <Link to="/products" className="inline-flex px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((product) => (
              <div key={product.name} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden relative">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  </Link>
                  <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm text-destructive">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading font-semibold text-foreground text-xs mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="font-mono font-bold text-foreground text-sm mb-3">{formatPKR(product.price)}</p>
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
