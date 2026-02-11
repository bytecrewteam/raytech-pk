import { Star, Quote } from "lucide-react";

const reviews = [
  {
    text: "Ordered a GPU on Monday evening, received it Tuesday morning in perfect condition. Genuine product with all seals intact. RayTech earned a lifetime customer.",
    stars: 5,
  },
  {
    text: "Built my first gaming PC with their component bundle. The free assembly service saved me hours and the cable management is pristine. Absolutely worth it.",
    stars: 5,
  },
  {
    text: "Best prices in Pakistan for genuine tech. I compared with 8 other stores — RayTech was PKR 12,000 cheaper for the same laptop and it's 100% authentic.",
    stars: 5,
  },
  {
    text: "Their customer support actually knows tech. Spent 20 minutes on chat helping me choose compatible RAM. No pressure to upsell, just honest advice.",
    stars: 5,
  },
  {
    text: "Returned a monitor after 5 days because I wanted a bigger size. Zero hassle, full refund within 48 hours. This is how business should be done.",
    stars: 5,
  },
  {
    text: "The student discount is legit — saved PKR 9,000 on my laptop purchase. Verification was quick through my university email.",
    stars: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-mono font-bold text-foreground text-lg">4.7</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">Verified reviews from real buyers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <div className="flex mb-3">
                {[...Array(review.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] text-success font-medium">✓ Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
