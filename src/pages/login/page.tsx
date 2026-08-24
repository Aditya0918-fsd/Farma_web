import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, RefreshCw, Phone, Lock, Shield, Headphones, Zap, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";

type LoginType = "farmer" | "dealer";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [loginType, setLoginType] = useState<LoginType>("farmer");
  const [showPass, setShowPass] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [captcha, setCaptcha] = useState("7K8P2");
  const [isLoading, setIsLoading] = useState(false);

  const typeConfig = {
    farmer: { label: "Farmer Login", subtitle: "Login as a Farmer", icon: User },
    dealer: { label: "Dealer Login", subtitle: "Login as a Dealer", icon: Store },
  };

  const handleRefreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const roleTitle = loginType === "farmer" ? "Farmer Partner" : "Agri Dealer";
      
      // Save User Session to AppContext
      loginUser({
        name: loginType === "farmer" ? "Rajesh Kumar" : "Kisan Agro Dealer",
        phone: mobileNumber || "9876543210",
        role: loginType,
        state: "Bihar",
        district: "Patna",
        village: "Danapur",
      });

      toast.success(`Welcome back! Logged in as ${roleTitle}.`);
      navigate("/");
    }, 600);
  };

  const handleWhatsAppLogin = () => {
    toast.info("WhatsApp Login request sent! Please check your WhatsApp messages.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] to-transparent flex items-center px-6">
          <div>
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>Login</h1>
            <p className="text-gray-400 text-sm">Home &gt; <span className="text-primary">Login</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Type selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {(["farmer", "dealer"] as LoginType[]).map((type) => {
            const cfg = typeConfig[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => setLoginType(type)}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  loginType === type
                    ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10"
                    : "border-white/10 bg-[#111] text-gray-300 hover:border-white/20"
                }`}
              >
                <cfg.icon className="h-6 w-6 shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{cfg.label}</div>
                  <div className={`text-xs ${loginType === type ? "text-primary" : "text-gray-500"}`}>{cfg.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left panel */}
          <div className="md:col-span-2 bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-1">Welcome <span className="text-primary">Back!</span></h2>
            <p className="text-gray-400 text-sm mb-6">Login to continue your smart farming journey.</p>
            <img src="/krivexa-logo.jpg" alt="KRIVEXA" className="w-32 h-32 object-cover rounded-2xl border border-primary/40 shadow-xl mb-6" />
            <div className="space-y-4 w-full text-left">
              {[
                { icon: Shield, title: "Secure & Safe", desc: "Your data is 100% safe and secure with us." },
                { icon: Headphones, title: "24x7 Support", desc: "We are always here to help you." },
                { icon: Zap, title: "Smart & Easy", desc: "All farming solutions in one platform." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{f.title}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel - Form */}
          <div className="md:col-span-3 bg-[#0e0e0e] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6">{typeConfig[loginType].label}</h3>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Mobile Number <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your 10-digit mobile number" 
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" 
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Password <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Captcha <span className="text-red-400">*</span></Label>
                <div className="flex gap-3">
                  <Input 
                    value={inputCaptcha}
                    onChange={(e) => setInputCaptcha(e.target.value)}
                    placeholder="Enter captcha" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" 
                    required
                  />
                  <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 font-mono font-bold text-primary tracking-widest text-lg select-none">
                    {captcha}
                    <button type="button" onClick={handleRefreshCaptcha} className="cursor-pointer ml-1 text-gray-500 hover:text-primary transition-colors">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                  <input type="checkbox" className="accent-primary" defaultChecked /> Remember Me
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Password reset link sent to your registered mobile number."); }} className="text-primary hover:underline">Forgot Password?</a>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90 rounded-xl cursor-pointer">
                {isLoading ? "Logging in..." : "Login →"}
              </Button>

              <div className="text-center text-gray-500 text-sm">or</div>

              <Button type="button" onClick={handleWhatsAppLogin} variant="ghost" className="w-full border border-white/10 text-white hover:bg-white/5 py-5 rounded-xl cursor-pointer">
                Login with WhatsApp
              </Button>

              <p className="text-center text-gray-400 text-sm pt-2">
                {"Don't have an account? "}<Link to="/register" className="text-primary font-semibold hover:underline">Register Now</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { icon: Lock, label: "100% Secure", desc: "Your data is always protected" },
            { icon: Shield, label: "Trusted Platform", desc: "Trusted by thousands of farmers" },
            { icon: User, label: "Easy to Use", desc: "Simple and user friendly" },
            { icon: Phone, label: "Access Anywhere", desc: "Use on web or mobile app" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-3 p-3 bg-[#111] rounded-xl border border-white/10">
              <b.icon className="h-5 w-5 text-primary shrink-0" />
              <div>
                <div className="text-xs font-semibold">{b.label}</div>
                <div className="text-[11px] text-gray-500">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
