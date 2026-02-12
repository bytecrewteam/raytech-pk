import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How do I know the products are genuine?",
    a: "Every product we sell comes with a hologram verification seal and original manufacturer packaging. We source directly from authorized distributors and importers. We've been in business since 2019 and have a 4.7+ star rating across review platforms."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept JazzCash, EasyPaisa, bank transfer (HBL, UBL, Meezan), Cash on Delivery (COD) for orders under PKR 100,000, and credit/debit cards (Visa, Mastercard, UnionPay). All online payments are secured with SSL encryption."
  },
  {
    q: "How does the student discount work?",
    a: "Students and educators get a 15% discount with valid ID verification. Simply sign up with your university email (.edu.pk) or submit your student ID for verification. Once approved, the discount is automatically applied to all eligible purchases."
  },
  {
    q: "Do you offer warranty on products?",
    a: "All products come with standard manufacturer warranty. Select premium components also include our extended 24-month RayTech warranty (double the manufacturer warranty). Warranty claims can be initiated through your account page or by contacting our support team."
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order is dispatched, you'll receive a tracking number via email and SMS. You can also track your order from your Account > Orders page. We use TCS and Leopards Courier for nationwide delivery."
  },
  {
    q: "Do you offer custom PC building services?",
    a: "Yes! We offer free PC assembly and cable management for component purchases over PKR 50,000. You can also book a free 30-minute video consultation with our tech experts to plan your custom build. We handle compatibility checks and optimization."
  },
];

const FAQPage = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Frequently Asked Questions</h1>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-heading font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
