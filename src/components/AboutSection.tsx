import { Users, Target, Wrench } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Started in 2019 by three computer engineering graduates frustrated with overpriced, low-quality tech 
              flooding the Pakistani market. We personally test every product before it enters our catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">Our Mission</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Eliminate fake tech products from the Pakistani market. Genuine hardware at honest prices.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <Wrench className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">We Test Everything</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every product line goes through our testing lab before hitting the catalog. No exceptions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">Community First</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                15% student discounts, free PC assembly, and a team that genuinely cares about your setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
