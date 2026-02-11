import { Shield, Truck, RotateCcw, Star, Award, Headphones } from "lucide-react";

const signals = [
  {
    icon: Shield,
    title: "100% Genuine Products",
    desc: "Hologram verification on all hardware. Zero fakes.",
  },
  {
    icon: Truck,
    title: "Free Shipping 15K+",
    desc: "Same-day in Lahore. 2-4 days nationwide.",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
    desc: "Hassle-free returns. Full refund guarantee.",
  },
  {
    icon: Award,
    title: "Extended Warranty",
    desc: "24-month warranty on premium components.",
  },
  {
    icon: Star,
    title: "4.7★ Rating",
    desc: "Trusted by thousands of tech enthusiasts.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "Real tech experts, not scripted answers.",
  },
];

const TrustSignals = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Why RayTechPK?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            6 years of building trust in Pakistan's tech market.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {signals.map((s) => (
            <div key={s.title} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
