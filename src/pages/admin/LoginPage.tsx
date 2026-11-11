import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, LogIn, ShieldCheck } from "lucide-react";
import logo from "../../assets/shavi-logo.webp";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("admin_token");
    if (token) navigate("/admin");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data));
        toast.success(`Welcome back, ${data.name}!`);
        navigate("/admin");
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.error("Server took too long to respond. Please try again.");
      } else {
        console.error("Login error:", error);
        toast.error("Could not connect to the server.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <ShieldCheck className="w-20 h-20 text-primary" />
          </div>

          <div className="text-center mb-10 relative">
            <Link to="/">
              <img 
                src={logo} 
                alt="Shavi Homes" 
                className="h-16 sm:h-20 w-auto mx-auto mb-6 brightness-0 invert"
              />
            </Link>
            <h1 className="text-3xl font-heading font-black text-white mb-2">Admin Portal</h1>
            <p className="text-white/40 font-medium text-sm">Enterprise Management System v1.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-white/50 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <Input
                  type="email"
                  placeholder="admin@shavihomes.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-white/50 uppercase tracking-widest pl-1">Secret Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all text-base"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="cta" 
              className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" 
              disabled={isLoading}
            >
              <LogIn className="w-5 h-5 mr-3" />
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>

          <p className="mt-10 text-center text-white/20 text-xs">
            © 2024 Shavi Homes Calgary. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
