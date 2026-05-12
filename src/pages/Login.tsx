import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { ShieldCheck, Lock, Terminal } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import { useNavigate } from 'react-router'

function getOAuthUrl() {
  try {
    if (typeof window === "undefined") return "";
    
    const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
    const appID = import.meta.env.VITE_APP_ID;

    if (!kimiAuthUrl || !appID) {
      console.error("[Auth] Missing VITE_KIMI_AUTH_URL or VITE_APP_ID in environment variables.");
      alert("System Configuration Error: Login is temporarily unavailable.");
      return "";
    }

    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
    url.searchParams.set("client_id", appID);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "profile");
    url.searchParams.set("state", state);

    return url.toString();
  } catch (err) {
    console.error("[Auth] Failed to construct OAuth URL:", err);
    return "";
  }
}

export default function Login() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const devLoginMutation = trpc.auth.devLogin.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      navigate('/admin');
    },
    onError: (err) => {
      console.error("[DevLogin Error]", err);
      alert("Developer Login failed: " + err.message);
    }
  });

  const pingQuery = trpc.ping.useQuery(undefined, { 
    enabled: false,
    retry: false
  });

  const checkConnection = async () => {
    try {
      const res = await fetch("/api/trpc/ping?batch=1");
      const text = await res.text();
      
      try {
        const json = JSON.parse(text);
        if (json[0]?.result?.data?.ok || json.ok) {
          alert("✅ Connection Successful! Backend is reachable.");
        } else {
          alert("❌ Connection Failed: API returned unexpected data.\n\nResponse: " + text.slice(0, 200));
        }
      } catch (e) {
        alert("❌ Connection Failed: API returned HTML instead of JSON.\n\nFirst 200 chars: " + text.slice(0, 200));
      }
    } catch (err) {
      alert("❌ Connection Error: " + (err as Error).message);
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
            <h1 className="text-3xl font-bold text-white mb-2 text-glow">Admin Portal</h1>
            <p className="text-[#94A3B8]">Secure access for AlgoDeck administrators</p>
          </div>

          <Card className="bg-[#0A0F2C]/60 backdrop-blur-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
            <CardHeader className="pt-8 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 text-[#64748B] text-xs font-bold uppercase tracking-widest mb-2">
                <Lock size={12} /> Encrypted Session
              </div>
              <CardTitle className="text-white">Welcome Back</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <Button
                className="w-full h-14 rounded-xl bg-[#3A7BFF] hover:bg-[#3A7BFF]/90 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                onClick={() => {
                  const url = getOAuthUrl();
                  if (url) {
                    window.location.href = url;
                  }
                }}
              >
                Sign in with Kimi
              </Button>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <span className="relative bg-[#0A0F2C] px-4 text-[10px] text-[#64748B] font-bold uppercase tracking-tighter">Dev Tools</span>
              </div>

              <Button
                variant="outline"
                className="w-full h-14 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-base transition-all hover:bg-white/10 hover:scale-[1.02]"
                onClick={() => devLoginMutation.mutate()}
                disabled={devLoginMutation.isPending}
              >
                {devLoginMutation.isPending ? "Authenticating..." : <span className="flex items-center gap-2"><Terminal size={18} /> Developer Login</span>}
              </Button>

              <button 
                onClick={checkConnection}
                className="w-full text-[10px] text-[#3A7BFF] uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity mt-2"
              >
                Check API Connection
              </button>
              
              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <p className="text-[#64748B] text-xs leading-relaxed">
                  By signing in, you agree to our internal <br />
                  security protocols and data privacy guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 text-center">
            <a href="/" className="text-sm font-bold text-[#3A7BFF] hover:underline">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
