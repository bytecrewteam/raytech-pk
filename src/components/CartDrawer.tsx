import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");
const MAX_QTY = 49;

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const hasMaxQty = cart.some((i) => i.quantity >= MAX_QTY);

  const handleCheckout = () => {
    onOpenChange(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[85vw] sm:w-[400px] sm:max-w-[400px] p-0 flex flex-col bg-background border-l border-border backdrop-blur-none"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading font-bold text-foreground text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Cart ({cart.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-5">
            <ShoppingCart className="w-14 h-14 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm mb-4">Your cart is empty</p>
            <SheetClose asChild>
              <Link to="/products" className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm">
                Browse Products
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.map((item) => (
                <div key={item.name} className="flex gap-3 p-3 rounded-xl bg-card border border-border">
                  <SheetClose asChild>
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                    </Link>
                  </SheetClose>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-primary font-medium">{item.category}</p>
                    <SheetClose asChild>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-heading font-semibold text-foreground text-xs truncate hover:text-primary transition-colors">{item.name}</h3>
                      </Link>
                    </SheetClose>
                    <p className="font-mono font-bold text-foreground text-xs mt-1">{formatPKR(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-secondary rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1))}
                          className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-foreground w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, Math.min(MAX_QTY, item.quantity + 1))}
                          className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          disabled={item.quantity >= MAX_QTY}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-border px-5 py-4 space-y-3">
              {hasMaxQty && (
                <p className="text-[10px] text-primary text-center">For orders of 50+, please contact support.</p>
              )}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-mono">Free</span>
                </div>
                <div className="border-t border-border pt-1.5 flex justify-between text-foreground font-semibold">
                  <span>Total</span>
                  <span className="font-mono">{formatPKR(total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
