import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
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
  description?: string;
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (name: string) => boolean;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addOrder: (order: Order) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage("raytech_cart", []));
  const [wishlist, setWishlist] = useState<Product[]>(() => loadFromStorage("raytech_wishlist", []));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage("raytech_orders", []));
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try { localStorage.setItem("raytech_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem("raytech_wishlist", JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem("raytech_orders", JSON.stringify(orders)); } catch {}
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) return prev.map((i) => i.name === product.name ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });

    // Trigger gemini animation
    const event = new CustomEvent('gemini-animate');
    window.dispatchEvent(event);
  };

  const removeFromCart = (name: string) => setCart((prev) => prev.filter((i) => i.name !== name));

  const updateQuantity = (name: string, qty: number) => {
    if (qty <= 0) return removeFromCart(name);
    setCart((prev) => prev.map((i) => i.name === name ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.find((i) => i.name === product.name)
        ? prev.filter((i) => i.name !== product.name)
        : [...prev, product]
    );
  };

  const isInWishlist = (name: string) => wishlist.some((i) => i.name === name);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ cart, wishlist, orders, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, cartCount, searchQuery, setSearchQuery, addOrder }}>
      {children}
    </StoreContext.Provider>
  );
};
