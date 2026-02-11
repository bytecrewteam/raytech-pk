import { Monitor, Cpu, Gamepad2, HardDrive, Wifi, Fan, BatteryCharging, Cable, Laptop, Headphones } from "lucide-react";

const categories = [
  { name: "Gaming Laptops", icon: Laptop, range: "PKR 85K - 425K", count: "120+" },
  { name: "Desktop Components", icon: Cpu, range: "PKR 12K - 350K", count: "200+" },
  { name: "Gaming Peripherals", icon: Gamepad2, range: "PKR 2.5K - 45K", count: "150+" },
  { name: "Monitors & Displays", icon: Monitor, range: "PKR 18K - 195K", count: "80+" },
  { name: "Storage Solutions", icon: HardDrive, range: "PKR 3.8K - 65K", count: "60+" },
  { name: "Networking", icon: Wifi, range: "PKR 4.2K - 38K", count: "40+" },
  { name: "Cases & Cooling", icon: Fan, range: "PKR 5.5K - 55K", count: "70+" },
  { name: "Power & UPS", icon: BatteryCharging, range: "PKR 6K - 48K", count: "45+" },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            12 categories, 800+ products. Every item tested, every price transparent.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href="#"
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:glow-cyan-sm"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <cat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{cat.name}</h3>
              <p className="font-mono text-xs text-primary">{cat.range}</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">{cat.count} products</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
