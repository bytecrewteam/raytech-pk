import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { getProductById, allProducts } from "@/data/products";
import { Star, ShoppingCart, Heart, ChevronRight, Shield, Truck, RotateCcw } from "lucide-react";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const dummyReviews = [
  { name: "Hassan Ali", rating: 5, date: "Jan 15, 2025", text: "Excellent product, works perfectly. Genuine packaging and fast delivery to Islamabad." },
  { name: "Sara Khan", rating: 5, date: "Jan 10, 2025", text: "Amazing performance upgrade for my setup. RayTech's customer support helped me choose the right one." },
  { name: "Ahmed Malik", rating: 4, date: "Dec 28, 2024", text: "Great value for the price. Shipping was quick and the product was well-packed." },
  { name: "Fatima Noor", rating: 5, date: "Dec 20, 2024", text: "Bought this for my brother's birthday. He absolutely loves it. Will buy again from RayTech." },
  { name: "Usman Tariq", rating: 4, date: "Dec 15, 2024", text: "Good product overall. Took 2 days to deliver to Karachi which is impressive." },
  { name: "Ayesha Siddiqui", rating: 5, date: "Dec 10, 2024", text: "This is my 4th purchase from RayTech. Never disappointed. 100% genuine products." },
  { name: "Bilal Hussain", rating: 5, date: "Nov 30, 2024", text: "Compared prices everywhere - RayTech was the cheapest for genuine products. Highly recommend." },
  { name: "Zainab Ahmed", rating: 4, date: "Nov 22, 2024", text: "Product arrived in perfect condition. The eco-friendly packaging is a nice touch." },
  { name: "Kamran Shah", rating: 5, date: "Nov 15, 2024", text: "Outstanding quality and performance. Exactly as described on the website." },
  { name: "Nadia Iqbal", rating: 4, date: "Nov 8, 2024", text: "Very satisfied with my purchase. The student discount saved me a lot." },
  { name: "Farhan Raza", rating: 5, date: "Oct 28, 2024", text: "Best tech store in Pakistan. Period. Fast delivery, genuine products, great prices." },
  { name: "Hina Parveen", rating: 5, date: "Oct 20, 2024", text: "My gaming setup is now complete thanks to RayTech. Every component was top-notch." },
  { name: "Imran Qureshi", rating: 4, date: "Oct 12, 2024", text: "Smooth buying experience. Live chat support answered all my compatibility questions." },
  { name: "Rabia Aslam", rating: 5, date: "Oct 5, 2024", text: "Third time ordering from here. The 24-month extended warranty gives real peace of mind." },
  { name: "Danish Mehmood", rating: 4, date: "Sep 28, 2024", text: "Product quality is exactly what you'd expect from a genuine source. Very happy." },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/search" className="hover:text-foreground">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-3">
            <div className="aspect-square rounded-xl bg-secondary/50 overflow-hidden border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`rounded-lg bg-secondary/50 overflow-hidden border ${i === 0 ? 'border-primary' : 'border-border'} cursor-pointer`} style={{ width: "100%", minHeight: "72px" }}>
                  <img src={product.image} alt="" className="w-full h-[72px] object-cover opacity-80 hover:opacity-100 transition-opacity" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">{product.category}</p>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono font-bold text-2xl text-foreground">{formatPKR(product.price)}</span>
              {product.originalPrice && <span className="font-mono text-sm text-muted-foreground line-through">{formatPKR(product.originalPrice)}</span>}
              {product.originalPrice && <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded">Save {formatPKR(product.originalPrice - product.price)}</span>}
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {product.specs && (
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Specifications</h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div key={key} className={`flex text-sm ${i % 2 === 0 ? 'bg-secondary/30' : 'bg-card'}`}>
                      <span className="w-1/3 px-3 py-2 text-muted-foreground font-medium">{key}</span>
                      <span className="w-2/3 px-3 py-2 text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleAddToCart} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all gemini-border-animate ${isAnimating ? 'active' : ''}`}
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} className={`p-3 rounded-lg border ${isInWishlist(product.name) ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive'} transition-colors`}>
                <Heart className={`w-5 h-5 ${isInWishlist(product.name) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "100% Genuine" },
                { icon: Truck, label: "Free Shipping 15K+" },
                { icon: RotateCcw, label: "14-Day Returns" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary/50 text-center">
                  <t.icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Customer Reviews ({dummyReviews.length})</h2>
          <div className="space-y-4">
            {dummyReviews.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{r.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <span className="font-medium text-sm text-foreground">{r.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-3 h-3 ${j < r.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group bg-card rounded-lg border border-border hover:border-primary/30 transition-all overflow-hidden">
                  <div className="aspect-square bg-secondary/50 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  </div>
                  <div className="p-3">
                    <h3 className="font-heading font-semibold text-foreground text-xs line-clamp-2">{p.name}</h3>
                    <p className="font-mono font-bold text-sm text-foreground mt-1">{formatPKR(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
