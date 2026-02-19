import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { hasMinLength } from "@/lib/sanitize";
import { CreditCard, Banknote, Smartphone } from "lucide-react";

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

type PaymentMethod = "jazzcash" | "easypaisa" | "cod" | "card";

const paymentOptions: { id: PaymentMethod; label: string; icon: typeof CreditCard; desc: string }[] = [
  { id: "jazzcash", label: "JazzCash", icon: Smartphone, desc: "Pay via JazzCash mobile wallet" },
  { id: "easypaisa", label: "EasyPaisa", icon: Smartphone, desc: "Pay via EasyPaisa account" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when your order arrives" },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, UnionPay" },
];

const CheckoutPage = () => {
  const { cart, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 15000 ? 0 : 200;
  const total = subtotal + shipping;

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postal: "", cardNumber: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    const limits: Record<string, number> = { name: 100, email: 255, address: 200, city: 50, postal: 10, cardNumber: 19, expiry: 5, cvc: 4 };
    if (value.length > (limits[field] || 200)) return;
    setForm((p) => ({ ...p, [field]: value })); setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!hasMinLength(form.name, 3)) errs.name = "Name is required";
    if (!hasMinLength(form.email, 3)) errs.email = "Email is required";
    if (!hasMinLength(form.address, 3)) errs.address = "Address is required";
    if (!hasMinLength(form.city, 2)) errs.city = "City is required";
    if (!hasMinLength(form.postal, 4)) errs.postal = "Postal code is required";
    if (payment === "card") {
      if (!hasMinLength(form.cardNumber, 13)) errs.cardNumber = "Card number is required";
      if (!hasMinLength(form.expiry, 4)) errs.expiry = "Expiry is required";
      if (!hasMinLength(form.cvc, 3)) errs.cvc = "CVC is required";
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    // Generate order ID
    const orderId = `RT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Date.now()).slice(-4)}`;
    
    // Create order object
    const order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      status: "Order Placed",
      shippingAddress: `${form.address}, ${form.city}, ${form.postal}`,
      paymentMethod: payment === "card" 
        ? `Card •••• ${form.cardNumber.slice(-4)}`
        : payment === "jazzcash"
        ? "JazzCash"
        : payment === "easypaisa"
        ? "EasyPaisa"
        : "Cash on Delivery",
    };
    
    // Save order
    addOrder(order);
    
    const confirmed = window.confirm("Order placed successfully! (Demo)\n\nClick OK to continue.");
    if (confirmed) {
      clearCart();
      navigate("/account");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm">Continue Shopping</button>
        </main>
        <Footer />
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Order Summary */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.name} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-sm text-foreground">{formatPKR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-mono">{formatPKR(subtotal)}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="font-mono">{shipping === 0 ? "Free" : formatPKR(shipping)}</span></div>
                  <div className="flex justify-between text-foreground font-semibold text-base border-t border-border pt-2"><span>Total</span><span className="font-mono">{formatPKR(total)}</span></div>
                </div>
              </div>
            </div>

            {/* Right - Shipping & Payment */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-4">Shipping Information</h2>
                <div className="space-y-3">
                  <div>
                    <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name" className={inputCls} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email Address" className={inputCls} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street Address" className={inputCls} />
                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className={inputCls} />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input type="text" value={form.postal} onChange={(e) => update("postal", e.target.value)} placeholder="Postal Code" className={inputCls} />
                      {errors.postal && <p className="text-xs text-destructive mt-1">{errors.postal}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="space-y-2">
                  {paymentOptions.map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${payment === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                      <input type="radio" name="payment" checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="sr-only" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === opt.id ? 'border-primary' : 'border-muted-foreground'}`}>
                        {payment === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <opt.icon className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-border">
                    <div>
                      <input type="text" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value.replace(/[^\d\s]/g, ''))} placeholder="Card Number" className={inputCls} />
                      {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input type="text" value={form.expiry} onChange={(e) => update("expiry", e.target.value.replace(/[^\d/]/g, ''))} placeholder="MM/YY" className={inputCls} />
                        {errors.expiry && <p className="text-xs text-destructive mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <input type="text" value={form.cvc} onChange={(e) => update("cvc", e.target.value.replace(/\D/g, ''))} placeholder="CVC" className={inputCls} />
                        {errors.cvc && <p className="text-xs text-destructive mt-1">{errors.cvc}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm hover:brightness-110 transition-all">
                Place Order — {formatPKR(total)}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
