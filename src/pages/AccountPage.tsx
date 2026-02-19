import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { User, Package, MapPin, CreditCard, Bell, LogOut, ChevronRight, ChevronDown } from "lucide-react";

const tabs = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "orders", icon: Package, label: "Orders" },
  { id: "addresses", icon: MapPin, label: "Addresses" },
  { id: "payments", icon: CreditCard, label: "Payment Methods" },
  { id: "notifications", icon: Bell, label: "Notifications" },
];

const dummyOrders = [
  {
    id: "RT-20250115", item: "RTX 4070 Ti Super", status: "Delivered", date: "Jan 15, 2025", total: "PKR 248,000",
    items: [{ name: "NVIDIA GeForce RTX 4070 Ti Super", qty: 1, price: "PKR 248,000" }],
    address: "House 42, Street 7, DHA Phase 5, Lahore 54000",
    payment: "Visa •••• 4532",
    timeline: ["Order Placed", "Processing", "Shipped", "Delivered"],
  },
  {
    id: "RT-20250102", item: "Corsair K100 RGB", status: "Delivered", date: "Jan 2, 2025", total: "PKR 42,000",
    items: [{ name: "Corsair K100 RGB Mechanical Keyboard", qty: 1, price: "PKR 42,000" }],
    address: "Floor 3, Plaza 88, Main Boulevard Gulberg, Lahore 54660",
    payment: "JazzCash",
    timeline: ["Order Placed", "Processing", "Shipped", "Delivered"],
  },
  {
    id: "RT-20241220", item: "Samsung 990 PRO 2TB", status: "Delivered", date: "Dec 20, 2024", total: "PKR 48,000",
    items: [{ name: "Samsung 990 PRO 2TB NVMe SSD", qty: 1, price: "PKR 48,000" }],
    address: "House 42, Street 7, DHA Phase 5, Lahore 54000",
    payment: "Mastercard •••• 8910",
    timeline: ["Order Placed", "Processing", "Shipped", "Delivered"],
  },
  {
    id: "RT-20241205", item: "Logitech G Pro X Superlight 2", status: "Shipped", date: "Dec 5, 2024", total: "PKR 28,000",
    items: [{ name: "Logitech G Pro X Superlight 2", qty: 1, price: "PKR 28,000" }],
    address: "House 42, Street 7, DHA Phase 5, Lahore 54000",
    payment: "Cash on Delivery",
    timeline: ["Order Placed", "Processing", "Shipped", "Delivered"],
  },
];

const statusToStep: Record<string, number> = {
  "Order Placed": 0, "Processing": 1, "Shipped": 2, "Delivered": 3,
};

const dummyAddresses = [
  { id: 1, label: "Home", name: "Ahmed Khan", address: "House 42, Street 7, DHA Phase 5", city: "Lahore", postal: "54000", phone: "+92 321 555-0142" },
  { id: 2, label: "Office", name: "Ahmed Khan", address: "Floor 3, Plaza 88, Main Boulevard Gulberg", city: "Lahore", postal: "54660", phone: "+92 321 555-0143" },
];

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState({ orders: true, deals: true, newsletter: false, sms: false });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleOrder = (id: string) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">My Account</h1>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors mt-4">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary text-xl">{(user?.name || "U")[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="font-heading font-semibold text-foreground">{user?.name || "User"}</h2>
                      <p className="text-sm text-muted-foreground">{user?.email || "user@email.com"}</p>
                      <p className="text-xs text-muted-foreground">Member since Jan 2024</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary"><p className="text-xs text-muted-foreground mb-1">Total Orders</p><p className="font-mono font-bold text-foreground text-lg">12</p></div>
                    <div className="p-4 rounded-lg bg-secondary"><p className="text-xs text-muted-foreground mb-1">Reward Points</p><p className="font-mono font-bold text-primary text-lg">2,450</p></div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Edit Profile</h3>
                  <div className="space-y-3">
                    <input type="text" defaultValue={user?.name || ""} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm" readOnly />
                    <input type="email" defaultValue={user?.email || ""} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm" readOnly />
                    <input type="tel" defaultValue="+92 321 555-0142" placeholder="Phone" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm" readOnly />
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm opacity-50 cursor-not-allowed">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">Order History</h3>
                <div className="space-y-0">
                  {dummyOrders.map((order) => {
                    const isOpen = expandedOrder === order.id;
                    const activeStep = statusToStep[order.status] ?? 0;
                    return (
                      <div key={order.id} className="border-b border-border last:border-0">
                        <button
                          onClick={() => toggleOrder(order.id)}
                          className="w-full flex items-center justify-between py-4 hover:bg-secondary/30 transition-colors px-2 rounded-lg"
                        >
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">{order.item}</p>
                            <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-mono text-sm text-foreground">{order.total}</p>
                              <p className={`text-xs ${order.status === "Delivered" ? "text-success" : "text-primary"}`}>{order.status}</p>
                            </div>
                            {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-2 pb-4 animate-fade-in">
                            <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
                              {/* Items */}
                              <div>
                                <p className="text-xs text-muted-foreground font-medium mb-2">Items</p>
                                {order.items.map((it, i) => (
                                  <div key={i} className="flex justify-between text-sm">
                                    <span className="text-foreground">{it.name} <span className="text-muted-foreground">×{it.qty}</span></span>
                                    <span className="font-mono text-foreground">{it.price}</span>
                                  </div>
                                ))}
                              </div>
                              {/* Address & Payment */}
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-xs text-muted-foreground font-medium mb-1">Shipping Address</p>
                                  <p className="text-foreground text-xs">{order.address}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground font-medium mb-1">Payment</p>
                                  <p className="text-foreground text-xs">{order.payment}</p>
                                </div>
                              </div>
                              {/* Timeline */}
                              <div>
                                <p className="text-xs text-muted-foreground font-medium mb-2">Status Timeline</p>
                                <div className="flex items-center gap-1">
                                  {order.timeline.map((step, i) => (
                                    <div key={i} className="flex items-center gap-1 flex-1">
                                      <div className={`flex flex-col items-center flex-1`}>
                                        <div className={`w-3 h-3 rounded-full ${i <= activeStep ? "bg-primary" : "bg-muted"}`} />
                                        <span className={`text-[9px] mt-1 text-center ${i <= activeStep ? "text-primary font-medium" : "text-muted-foreground"}`}>{step}</span>
                                      </div>
                                      {i < order.timeline.length - 1 && (
                                        <div className={`h-0.5 flex-1 -mt-3 ${i < activeStep ? "bg-primary" : "bg-muted"}`} />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-4">
                {dummyAddresses.map((addr) => (
                  <div key={addr.id} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">{addr.label}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{addr.name}</p>
                    <p className="text-sm text-muted-foreground">{addr.address}</p>
                    <p className="text-sm text-muted-foreground">{addr.city}, {addr.postal}</p>
                    <p className="text-sm text-muted-foreground">{addr.phone}</p>
                  </div>
                ))}
                <button className="w-full py-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">+ Add New Address</button>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">•••• •••• •••• 4532</p>
                        <p className="text-xs text-muted-foreground">Visa • Expires 08/26</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary">Default</span>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">•••• •••• •••• 8910</p>
                      <p className="text-xs text-muted-foreground">Mastercard • Expires 12/25</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">+ Add New Card</button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: "orders" as const, label: "Order Updates", desc: "Get notified about order status changes" },
                    { key: "deals" as const, label: "Deals & Promotions", desc: "Receive alerts about sales and special offers" },
                    { key: "newsletter" as const, label: "Newsletter", desc: "Weekly tech tips and product recommendations" },
                    { key: "sms" as const, label: "SMS Notifications", desc: "Receive order updates via SMS" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <button onClick={() => setNotifs((p) => ({ ...p, [item.key]: !p[item.key] }))} className={`w-11 h-6 rounded-full transition-colors relative ${notifs[item.key] ? "bg-primary" : "bg-secondary"}`}>
                        <div className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-transform ${notifs[item.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
