import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Gaming PC setup" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 animate-fade-in-up">
            <Zap className="w-3 h-3" />
            800+ Genuine Products • Trusted Since 2019
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-[1.1] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Performance Meets{" "}
            <span className="text-primary">Innovation</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Pakistan's most trusted source for genuine, performance-tested computer hardware. 
            Every product verified. Every price transparent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#featured"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all glow-orange hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary border border-border text-foreground font-heading font-semibold text-sm hover:bg-secondary/80 transition-all"
            >
              Browse Categories
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Genuine</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free Shipping 15K+</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Same-Day Lahore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
