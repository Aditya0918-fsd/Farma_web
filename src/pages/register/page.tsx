import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Phone, MapPin, Lock, CheckCircle, Shield, Zap, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

const STEPS = ["Personal Details", "Mobile Verification", "Land Details", "Bank Details", "Complete"];

const STATES = ["Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Punjab", "Haryana", "Bihar", "Rajasthan"];
const OCCUPATIONS = ["Farmer", "Agricultural Laborer", "Dealer", "Other"];

export default function RegisterPage() {
  const [step] = useState(1);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 to-transparent flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Create Your Account<br />
              <span className="text-primary">Join Krivexa Today!</span>
            </h1>
            <p className="text-gray-300 text-sm">Fill in your details below and start your smart farming journey.</p>
            <p className="text-gray-500 text-xs mt-1">Home &gt; <span className="text-primary">Register</span></p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-10 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 min-w-max">
              <div className={`flex flex-col items-center gap-1`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  i + 1 === step ? "bg-primary border-primary text-black" : 
                  i + 1 < step ? "bg-primary/20 border-primary text-primary" : 
                  "bg-transparent border-white/20 text-gray-500"
                }`}>
                  {i + 1 < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs ${i + 1 === step ? "text-primary" : "text-gray-500"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-8 md:w-16 mb-4 ${i + 1 < step ? "bg-primary" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold mb-1">Welcome to <span className="text-primary">Krivexa!</span></h3>
            <p className="text-gray-400 text-xs mb-4">One platform for all your farming needs.</p>
            <img src="/krivexa-logo.jpg" alt="KRIVEXA" className="w-24 h-24 mx-auto object-cover rounded-2xl border border-primary/40 shadow-lg mb-6" />
            <div className="space-y-3 text-left">
              {[
                { icon: Shield, title: "100% Secure", desc: "Your data is safe with us." },
                { icon: Zap, title: "Grow More, Earn More", desc: "Get better prices and expert support." },
                { icon: Clock, title: "Save Time & Money", desc: "All farming solutions in one place." },
                { icon: Users, title: "Trusted by Farmers", desc: "Join thousands of happy farmers." },
              ].map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <f.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{f.title}</div>
                    <div className="text-[11px] text-gray-500">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Login Now</Link>
            </p>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-[#0e0e0e] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-1">Personal Details</h3>
            <div className="w-12 h-1 bg-primary rounded mb-6" />
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Full Name <span className="text-red-400">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input placeholder="Enter your full name" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Father / Husband Name <span className="text-red-400">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input placeholder="Enter father / husband name" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Gender <span className="text-red-400">*</span></Label>
                  <div className="flex gap-4 mt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input type="radio" name="gender" value={g} className="accent-primary" defaultChecked={g === "Male"} />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Date of Birth <span className="text-red-400">*</span></Label>
                  <Input type="date" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Address <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="Enter your full address" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">State <span className="text-red-400">*</span></Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">District <span className="text-red-400">*</span></Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="kanpur">Kanpur</SelectItem>
                      <SelectItem value="lucknow">Lucknow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Village <span className="text-red-400">*</span></Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400">
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      <SelectItem value="v1">Village 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Pincode <span className="text-red-400">*</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input placeholder="Enter pincode" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Occupation <span className="text-red-400">*</span></Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {OCCUPATIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Password <span className="text-red-400">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90">
                Next Step →
              </Button>
              <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="text-xs font-semibold">Your information is safe with us.</div>
                  <div className="text-[11px] text-gray-500">We do not share your personal data with anyone.</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
