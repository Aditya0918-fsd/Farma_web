import { useState } from "react";
import { MessageSquare, Send, Phone, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";

const EXPERTS = [
  { name: "Dr. Suresh Kumar", speciality: "Crop Disease Expert", exp: "15 yrs", rating: 4.9, reviews: 234, available: true, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80" },
  { name: "Dr. Anita Patel", speciality: "Soil & Fertilizer Specialist", exp: "12 yrs", rating: 4.8, reviews: 189, available: true, img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&q=80" },
  { name: "Dr. Ramesh Singh", speciality: "Irrigation & Water Mgmt", exp: "18 yrs", rating: 4.9, reviews: 302, available: false, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80" },
  { name: "Dr. Priya Sharma", speciality: "Organic Farming Expert", exp: "10 yrs", rating: 4.7, reviews: 145, available: true, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80" },
];

const FAQS = [
  { q: "My wheat crop has yellow spots, what disease is it?", a: "Yellow spots on wheat usually indicate Wheat Yellow Rust. Apply Propiconazole fungicide at 0.1% concentration. Contact an expert for confirmation.", category: "Disease" },
  { q: "When is the best time to apply urea to paddy?", a: "Apply urea in 3 splits: at transplanting, 25-30 days after transplanting, and at panicle initiation stage.", category: "Fertilizer" },
  { q: "How to control white fly in cotton?", a: "Use Imidacloprid 17.8 SL at 0.5 ml/litre water. Spray in the evening for better results.", category: "Pest Control" },
];

export default function ExpertAdvicePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "expert", text: "Hello! I am Dr. Suresh Kumar. How can I help you with your crops today?" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "expert", text: "Thank you for your question. Let me analyze this and provide you with the best solution. Could you also share a photo of the affected crop?" }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">Expert</span> Advice
            </h1>
            <p className="text-gray-400 text-sm">Get expert solutions for your crop problems instantly</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expert List */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold mb-4">Available Experts</h2>
            {EXPERTS.map((e) => (
              <div key={e.name} className="bg-[#111] border border-white/10 rounded-2xl p-4 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img src={e.img} alt={e.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#111] ${e.available ? "bg-primary" : "bg-gray-500"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{e.name}</div>
                    <div className="text-xs text-gray-400">{e.speciality}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5 text-xs">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{e.rating}</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{e.exp} exp</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={() => toast.success(`Chat started with ${e.name}`)} disabled={!e.available} className="flex-1 bg-primary text-black font-semibold text-xs h-8">
                    <MessageSquare className="h-3 w-3 mr-1" /> Chat
                  </Button>
                  <Button size="sm" onClick={() => toast.info(`Calling ${e.name}...`)} variant="ghost" disabled={!e.available} className="flex-1 border border-white/10 text-xs h-8">
                    <Phone className="h-3 w-3 mr-1" /> Call
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl flex flex-col h-125">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <img src={EXPERTS[0].img} alt="" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-sm font-bold">{EXPERTS[0].name}</div>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${m.from === "user" ? "bg-primary text-black" : "bg-white/10 text-white"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your question..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
              />
              <Button onClick={sendMessage} className="bg-primary text-black font-semibold shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">Common Questions & Answers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-primary/40 transition-colors">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-3">{faq.category}</Badge>
                <div className="flex items-start gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold">{faq.q}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
