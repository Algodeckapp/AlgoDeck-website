import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { ShieldCheck, Lock } from 'lucide-react'

function getOAuthUrl() {
  if (typeof window === "undefined") return "";
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
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
            <CardContent className="p-8">
              <Button
                className="w-full h-14 rounded-xl bg-[#3A7BFF] hover:bg-[#3A7BFF]/90 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                onClick={() => {
                  window.location.href = getOAuthUrl();
                }}
              >
                Sign in with Kimi
              </Button>
              
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
