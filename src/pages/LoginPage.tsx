import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { hasMinLength, isValidEmail } from "@/lib/sanitize";
import { Loader2, ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<"login" | "forgot-email" | "forgot-code" | "forgot-reset">("login");

  // Forgot password state
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resent, setResent] = useState(false);

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    const delay = 200 + Math.random() * 1800;
    setTimeout(() => {
      login({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
      setLoading(false);
      navigate("/");
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!hasMinLength(email, 3)) errs.email = "Email must be at least 3 characters";
    if (!hasMinLength(password, 3)) errs.password = "Password must be at least 3 characters";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const delay = 200 + Math.random() * 1800;
    setTimeout(() => {
      login({ name: email.split("@")[0] || "User", email });
      setLoading(false);
      navigate("/");
    }, delay);
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes("@") || resetEmail.length < 5) {
      setErrors({ resetEmail: "Enter a valid email address" });
      return;
    }
    setErrors({});
    setView("forgot-code");
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCode.length !== 6 || !/^\d{6}$/.test(resetCode)) {
      setErrors({ resetCode: "Enter a valid 6-digit code" });
      return;
    }
    setErrors({});
    setView("forgot-reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (newPass.length < 8) errs.newPass = "Password must be at least 8 characters";
    if (newPass !== confirmPass) errs.confirmPass = "Passwords do not match";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setResetMsg("Password reset! Redirecting…");
    setTimeout(() => {
      login({ name: resetEmail.split("@")[0] || "User", email: resetEmail });
      navigate("/");
    }, 1500);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const inputCls = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  const Logo = () => (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="font-heading font-bold text-primary-foreground text-lg">R</span>
        </div>
        <span className="font-heading font-bold text-2xl text-foreground">RayTech<span className="text-primary">PK</span></span>
      </Link>
    </div>
  );

  // Forgot Password - Step 1: Email
  if (view === "forgot-email") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="text-xl font-heading font-bold text-foreground text-center">Forgot Password</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center mb-6">Enter your email to receive a reset code</p>
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <form onSubmit={handleSendCode} className="space-y-3">
              <div>
                <input type="email" value={resetEmail} onChange={(e) => { setResetEmail(e.target.value); setErrors({}); }} placeholder="Email address" className={inputCls} maxLength={255} />
                {errors.resetEmail && <p className="text-xs text-destructive mt-1">{errors.resetEmail}</p>}
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all">
                Send Code
              </button>
            </form>
            <button onClick={() => { setView("login"); setErrors({}); }} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Forgot Password - Step 2: Code
  if (view === "forgot-code") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="text-xl font-heading font-bold text-foreground text-center">Verify Code</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center mb-6">A 6-digit code was sent to {resetEmail}</p>
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <form onSubmit={handleVerifyCode} className="space-y-3">
              <div>
                <input type="text" value={resetCode} onChange={(e) => { setResetCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setErrors({}); }} placeholder="6-digit code" className={inputCls} maxLength={6} />
                {errors.resetCode && <p className="text-xs text-destructive mt-1">{errors.resetCode}</p>}
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all">
                Verify
              </button>
            </form>
            <button onClick={handleResend} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {resent ? "Code resent!" : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Forgot Password - Step 3: Reset
  if (view === "forgot-reset") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="text-xl font-heading font-bold text-foreground text-center">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center mb-6">Create a new password for your account</p>
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            {resetMsg ? (
              <p className="text-sm text-success text-center font-medium">{resetMsg}</p>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div>
                  <input type="password" value={newPass} onChange={(e) => { setNewPass(e.target.value); setErrors({}); }} placeholder="New Password" className={inputCls} maxLength={128} />
                  {errors.newPass && <p className="text-xs text-destructive mt-1">{errors.newPass}</p>}
                </div>
                <div>
                  <input type="password" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value); setErrors({}); }} placeholder="Confirm Password" className={inputCls} maxLength={128} />
                  {errors.confirmPass && <p className="text-xs text-destructive mt-1">{errors.confirmPass}</p>}
                </div>
                <button
                  type="submit"
                  disabled={newPass.length < 8 || newPass !== confirmPass}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Login view
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="text-xl font-heading font-bold text-foreground text-center">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1 text-center mb-6">Sign in to your account</p>

        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <button onClick={() => handleSocialLogin("Google")} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
            Continue with Google
          </button>
          <button onClick={() => handleSocialLogin("Apple")} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>}
            Continue with Apple
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">or continue with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({}); }} placeholder="Email address" className={inputCls} maxLength={255} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({}); }} placeholder="Password" className={inputCls} maxLength={128} />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <div className="text-right">
              <button type="button" onClick={() => { setView("forgot-email"); setErrors({}); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Forgot Password?
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />} Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
