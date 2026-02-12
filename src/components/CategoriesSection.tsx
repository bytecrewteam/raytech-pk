import { Link } from "react-router-dom";
import { Monitor, Cpu, Gamepad2, HardDrive, Wifi, Fan, BatteryCharging, Laptop } from "lucide-react";

const categories = [
  { name: "Gaming Laptops", icon: Laptop, range: "PKR 85K - 425K", count: "120+", slug: "gaming-laptops" },
  { name: "Desktop Components", icon: Cpu, range: "PKR 12K - 350K", count: "200+", slug: "desktop-components" },
  { name: "Gaming Peripherals", icon: Gamepad2, range: "PKR 2.5K - 45K", count: "150+", slug: "peripherals" },
  { name: "Monitors & Displays", icon: Monitor, range: "PKR 18K - 195K", count: "80+", slug: "monitors" },
  { name: "Storage Solutions", icon: HardDrive, range: "PKR 3.8K - 65K", count: "60+", slug: "storage" },
  { name: "Networking", icon: Wifi, range: "PKR 4.2K - 38K", count: "40+", slug: "networking" },
  { name: "Cases & Cooling", icon: Fan, range: "PKR 5.5K - 55K", count: "70+", slug: "cases-cooling" },
  { name: "Power & UPS", icon: BatteryCharging, range: "PKR 6K - 48K", count: "45+", slug: "power-ups" },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-md mx-auto">12 categories, 800+ products. Every item tested, every price transparent.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.name} to={`/shop/${cat.slug}`} className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300" style={{ animationDelay: `${i * 0.05}s` }}>
              <cat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{cat.name}</h3>
              <p className="font-mono text-xs text-primary">{cat.range}</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">{cat.count} products</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
