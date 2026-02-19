import { useState, useMemo } from "react";
import { Star, ShoppingCart, Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { allProducts } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const AllProductsPage = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product);
    setAnimatingButton(product.id);
    setTimeout(() => setAnimatingButton(null), 2000);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProducts.map((p) => p.category)));
    return ["All", ...cats.sort()];
  }, []);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });

    switch (sort) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "newest": result = [...result].reverse(); break;
      default: break;
    }
    return result;
  }, [search, selectedCategory, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">All Products</h1>
        </div>
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">{filtered.length} products found</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((product) => (
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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AllProductsPage;
