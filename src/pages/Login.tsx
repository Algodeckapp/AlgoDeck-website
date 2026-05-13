import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { ShieldCheck, Lock, User, Mail, ArrowRight } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import { useNavigate } from 'react-router'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      navigate('/admin');
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      setIsRegister(false);
      setError("");
      alert("Account created successfully! Please log in.");
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (isRegister) {
      registerMutation.mutate(formData);
    } else {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3A7BFF]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-[#3A7BFF]/10 border border-[#3A7BFF]/20 flex items-center justify-center mx-auto mb-6 text-[#3A7BFF]">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 text-glow">
              {isRegister ? "Create Admin" : "Admin Portal"}
            </h1>
            <p className="text-[#94A3B8]">
              {isRegister ? "Setup your administrative access" : "Secure access for AlgoDeck administrators"}
            </p>
          </div>

          <Card className="bg-[#0A0F2C]/60 backdrop-blur-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
            <CardHeader className="pt-8 pb-4 text-center border-b border-white/5">
              <div className="flex items-center justify-center gap-2 text-[#64748B] text-[10px] font-bold uppercase tracking-widest mb-2">
                <Lock size={12} className="text-[#3A7BFF]" /> Encrypted Session
              </div>
              <CardTitle className="text-white text-xl">
                {isRegister ? "Get Started" : "Welcome Back"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-[#3A7BFF]/50 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="admin@algodeck.app"
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-[#3A7BFF]/50 transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-[#3A7BFF]/50 transition-colors"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl bg-[#3A7BFF] hover:bg-[#3A7BFF]/90 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20 mt-4 group"
                  disabled={loginMutation.isPending || registerMutation.isPending}
                >
                  {loginMutation.isPending || registerMutation.isPending ? (
                    "Processing..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isRegister ? "Create Account" : "Sign In"} 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <button
                  type="button"
                  className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError("");
                  }}
                >
                  {isRegister ? "Already have an account? Sign In" : "Need administrative access? Create account"}
                </button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 text-center">
            <a href="/" className="text-sm font-bold text-[#3A7BFF] hover:underline opacity-50 hover:opacity-100 transition-opacity">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
