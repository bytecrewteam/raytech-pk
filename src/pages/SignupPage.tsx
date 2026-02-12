import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { hasMinLength } from "@/lib/sanitize";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => { setForm((p) => ({ ...p, [field]: value })); setErrors({}); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!hasMinLength(form.firstName, 3)) errs.firstName = "First name must be at least 3 characters";
    if (!hasMinLength(form.email, 3)) errs.email = "Email must be at least 3 characters";
    if (!hasMinLength(form.password, 3)) errs.password = "Password must be at least 3 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!hasMinLength(form.confirmPassword, 3)) errs.confirmPassword = "Confirm password is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const delay = 200 + Math.random() * 1800;
    setTimeout(() => {
      login({ name: `${form.firstName} ${form.lastName}`.trim(), email: form.email });
      setLoading(false);
      navigate("/");
    }, delay);
  };

  const inputCls = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-heading font-bold text-primary-foreground text-lg">R</span>
            </div>
            <span className="font-heading font-bold text-2xl text-foreground">RayTech<span className="text-primary">PK</span></span>
          </Link>
          <h1 className="text-xl font-heading font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join RayTechPK for exclusive deals</p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="First Name *" className={inputCls} maxLength={50} />
                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Last Name" className={inputCls} maxLength={50} />
              </div>
            </div>
            <div>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email address *" className={inputCls} maxLength={255} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Password *" className={inputCls} maxLength={128} />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <div>
              <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Confirm Password *" className={inputCls} maxLength={128} />
              {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />} Sign Up
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
