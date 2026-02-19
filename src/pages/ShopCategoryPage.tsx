import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { getProductsByCategory } from "@/data/products";
import { ShoppingCart, Heart } from "lucide-react";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const categoryMap: Record<string, string> = {
  "gaming-laptops": "Gaming Laptops",
  "desktop-components": "Desktop Components",
  "peripherals": "Peripherals",
  "monitors": "Monitors",
  "storage": "Storage",
  "cases-cooling": "Cases & Cooling",
  "power-ups": "Power & UPS",
  "networking": "Networking",
  "cpus": "CPUs",
  "graphics-cards": "Graphics Cards",
  "motherboards": "Motherboards",
};

const ShopCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const categoryName = categoryMap[category || ""] || category || "Products";
  const products = getProductsByCategory(categoryName);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAnimatingButton(product.id);
    setTimeout(() => setAnimatingButton(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <div className="mb-8">
          <nav className="text-xs text-muted-foreground mb-2">
            <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">{categoryName}</span>
          </nav>
          <h1 className="text-2xl font-heading font-bold text-foreground">{categoryName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products found</p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products in this category yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="group bg-card rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors">
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.name) ? "fill-current text-destructive" : ""}`} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  </div>
                </Link>
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShopCategoryPage;
