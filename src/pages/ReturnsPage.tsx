import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";

const ReturnsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Returns & Refunds</h1>
      <div className="space-y-8">
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><RotateCcw className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">Return Policy</h2></div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong className="text-foreground">14-day return window</strong> on unopened items in original packaging</li>
            <li>• <strong className="text-foreground">7-day testing period</strong> on opened electronics — if it doesn't perform as advertised, return it</li>
            <li>• Items must be in original condition with all accessories, manuals, and packaging included</li>
            <li>• Return shipping is covered by RayTechPK for defective items</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><CheckCircle className="w-5 h-5 text-success" /><h2 className="font-heading font-semibold text-foreground">Eligible for Return</h2></div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Products with manufacturing defects</li>
            <li>• Wrong item received</li>
            <li>• Damaged during shipping</li>
            <li>• Product not matching description</li>
            <li>• Unopened items within 14 days</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><XCircle className="w-5 h-5 text-destructive" /><h2 className="font-heading font-semibold text-foreground">Not Eligible</h2></div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Physical damage caused by customer</li>
            <li>• Software-related issues on laptops/PCs</li>
            <li>• Items returned after 14 days without prior approval</li>
            <li>• Missing original packaging or accessories</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-primary" /><h2 className="font-heading font-semibold text-foreground">Refund Process</h2></div>
          <p className="text-sm text-muted-foreground leading-relaxed">Once we receive and inspect your returned item, refunds are processed within 3-5 business days to your original payment method. For COD orders, refunds are made via bank transfer or JazzCash/EasyPaisa. You'll receive email confirmation at each step.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnsPage;
