import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Package, MapPin, CreditCard, Bell, LogOut } from "lucide-react";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-1">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Package, label: "Orders" },
              { icon: MapPin, label: "Addresses" },
              { icon: CreditCard, label: "Payment Methods" },
              { icon: Bell, label: "Notifications" },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors mt-4">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-primary text-xl">AK</span>
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-foreground">Ahmed Khan</h2>
                  <p className="text-sm text-muted-foreground">ahmed.khan@email.com</p>
                  <p className="text-xs text-muted-foreground">Member since Jan 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
                  <p className="font-mono font-bold text-foreground text-lg">12</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground mb-1">Reward Points</p>
                  <p className="font-mono font-bold text-primary text-lg">2,450</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">Recent Orders</h3>
              {[
                { id: "RT-20240215", item: "RTX 4070 Ti Super", status: "Delivered", date: "Feb 15, 2024", total: "PKR 248,000" },
                { id: "RT-20240128", item: "Corsair K100 RGB", status: "Delivered", date: "Jan 28, 2024", total: "PKR 42,000" },
                { id: "RT-20240110", item: "Samsung 990 PRO 2TB", status: "Delivered", date: "Jan 10, 2024", total: "PKR 48,000" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.item}</p>
                    <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-foreground">{order.total}</p>
                    <p className="text-xs text-success">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
