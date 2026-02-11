import { useStore } from "@/contexts/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 15000 ? 0 : 200;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/" className="inline-flex px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.name} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-primary font-medium">{item.category}</p>
                    <h3 className="font-heading font-semibold text-foreground text-sm truncate">{item.name}</h3>
                    <p className="font-mono font-bold text-foreground text-sm mt-1">{formatPKR(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeFromCart(item.name)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-secondary rounded-lg">
                      <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="font-mono text-sm text-foreground w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-card border border-border h-fit space-y-4">
              <h3 className="font-heading font-semibold text-foreground">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-mono">{formatPKR(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="font-mono">{shipping === 0 ? "Free" : formatPKR(shipping)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between text-foreground font-semibold"><span>Total</span><span className="font-mono">{formatPKR(subtotal + shipping)}</span></div>
              </div>
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all">
                Proceed to Checkout
              </button>
              {subtotal < 15000 && (
                <p className="text-xs text-muted-foreground text-center">Add {formatPKR(15000 - subtotal)} more for free shipping!</p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
