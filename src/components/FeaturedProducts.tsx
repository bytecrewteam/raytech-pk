import { Star, ShoppingCart, Heart, Eye } from "lucide-react";

interface Product {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  badgeType?: "deal" | "new" | "hot";
  stock: "in-stock" | "low-stock" | "pre-order";
  image: string;
}

const products: Product[] = [
  {
    name: "NVIDIA GeForce RTX 4070 Ti Super",
    category: "Graphics Cards",
    price: 248000,
    originalPrice: 275000,
    rating: 4.9,
    reviews: 142,
    badge: "Best Seller",
    badgeType: "hot",
    stock: "low-stock",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
  },
  {
    name: "ASUS ROG Strix G16 Gaming Laptop",
    category: "Gaming Laptops",
    price: 345000,
    rating: 4.8,
    reviews: 89,
    badge: "New Arrival",
    badgeType: "new",
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
  },
  {
    name: 'Samsung Odyssey G7 32" Curved',
    category: "Monitors",
    price: 125000,
    originalPrice: 145000,
    rating: 4.7,
    reviews: 67,
    badge: "14% OFF",
    badgeType: "deal",
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
  },
  {
    name: "Corsair K100 RGB Mechanical",
    category: "Peripherals",
    price: 42000,
    rating: 4.8,
    reviews: 203,
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
  },
  {
    name: "AMD Ryzen 9 7950X Processor",
    category: "CPUs",
    price: 165000,
    originalPrice: 185000,
    rating: 4.9,
    reviews: 115,
    badge: "Deal",
    badgeType: "deal",
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
  },
  {
    name: "Samsung 990 PRO 2TB NVMe SSD",
    category: "Storage",
    price: 48000,
    rating: 4.8,
    reviews: 78,
    badge: "Hot",
    badgeType: "hot",
    stock: "low-stock",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
  },
];

const formatPKR = (n: number) =>
  "PKR " + n.toLocaleString("en-PK");

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
  return (
    <section id="featured" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Hand-picked, performance-tested hardware at honest prices.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            View All Products →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.name}
              className="group relative bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-3 left-3 z-10 px-2 py-1 rounded text-[10px] font-bold uppercase ${badgeColors[product.badgeType || "deal"]}`}>
                  {product.badge}
                </span>
              )}

              {/* Wishlist */}
              <button className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors">
                <Heart className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="aspect-square bg-secondary/50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1">
                  {product.category}
                </p>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-2 line-clamp-2 leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono font-bold text-lg text-foreground">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <p className={`text-xs font-medium mb-4 ${stockConfig[product.stock].className}`}>
                  ● {stockConfig[product.stock].label}
                </p>

                {/* CTA */}
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.98]">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <a href="#" className="text-primary text-sm font-medium hover:underline">
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
