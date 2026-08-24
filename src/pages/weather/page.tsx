import { CloudSun, Droplets, Wind, Eye, Thermometer, Cloud, Sun, CloudRain } from "lucide-react";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { useApp } from "@/context/AppContext.tsx";

const HOURLY = [
  { time: "6 AM", icon: Sun, temp: 24, rain: "5%" },
  { time: "9 AM", icon: CloudSun, temp: 27, rain: "10%" },
  { time: "12 PM", icon: CloudSun, temp: 31, rain: "15%" },
  { time: "3 PM", icon: Cloud, temp: 28, rain: "30%" },
  { time: "6 PM", icon: CloudRain, temp: 25, rain: "60%" },
  { time: "9 PM", icon: CloudRain, temp: 22, rain: "70%" },
];

const WEEKLY = [
  { day: "Today", icon: CloudSun, high: 31, low: 22, desc: "Partly Cloudy", rain: "20%" },
  { day: "Tomorrow", icon: CloudRain, high: 28, low: 20, desc: "Light Rain", rain: "65%" },
  { day: "Wednesday", icon: CloudRain, high: 26, low: 19, desc: "Heavy Rain", rain: "85%" },
  { day: "Thursday", icon: Cloud, high: 29, low: 21, desc: "Cloudy", rain: "30%" },
  { day: "Friday", icon: Sun, high: 33, low: 23, desc: "Sunny", rain: "5%" },
  { day: "Saturday", icon: CloudSun, high: 32, low: 22, desc: "Partly Cloudy", rain: "15%" },
  { day: "Sunday", icon: Sun, high: 34, low: 24, desc: "Clear Sky", rain: "5%" },
];

const FARM_TIPS = [
  { title: "Heavy Rain Alert", desc: "Expected heavy rain on Wednesday. Avoid spraying pesticides. Secure crop storage.", type: "warning" },
  { title: "Ideal Sowing Conditions", desc: "Friday onwards is ideal for sowing wheat. Soil moisture will be optimal after rains.", type: "success" },
  { title: "Frost Warning", desc: "No frost risk this week. Night temperatures remain above 19°C.", type: "info" },
];

export default function WeatherPage() {
  const { t } = useApp();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504608524841-42584120d693?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">{t.weather.title.split(" ")[0]}</span> {t.weather.title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-gray-400 text-sm">{t.weather.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Card */}
        <div className="bg-linear-to-br from-[#0f2a0f] to-[#111] border border-primary/20 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <CloudSun className="h-4 w-4 text-primary" />
                Kanpur, Uttar Pradesh
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-7xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>28°C</div>
                  <div className="text-gray-300 mt-1">Partly Cloudy</div>
                </div>
                <div className="text-8xl">⛅</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Droplets, label: "Humidity", value: "62%" },
                { icon: Wind, label: "Wind Speed", value: "12 km/h" },
                { icon: Eye, label: "Visibility", value: "8 km" },
                { icon: Thermometer, label: "Feels Like", value: "30°C" },
                { icon: CloudRain, label: "Rain Chance", value: "20%" },
                { icon: Sun, label: "UV Index", value: "High" },
              ].map((w) => (
                <div key={w.label} className="bg-white/5 rounded-xl p-3 text-center">
                  <w.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                  <div className="text-sm font-bold">{w.value}</div>
                  <div className="text-[10px] text-gray-500">{w.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 mb-6">
          <h3 className="font-bold mb-4">{t.weather.hourlyForecast}</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {HOURLY.map((h) => (
              <div key={h.time} className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-2">{h.time}</div>
                <h.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold">{h.temp}°C</div>
                <div className="text-[10px] text-blue-400">{h.rain}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 mb-6">
          <h3 className="font-bold mb-4">{t.weather.weeklyForecast}</h3>
          <div className="space-y-2">
            {WEEKLY.map((d) => (
              <div key={d.day} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="w-28 text-sm text-gray-300 shrink-0">{d.day}</div>
                <d.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1 text-sm text-gray-400">{d.desc}</div>
                <div className="text-xs text-blue-400 shrink-0">{d.rain} rain</div>
                <div className="text-sm shrink-0">
                  <span className="font-bold">{d.high}°</span>
                  <span className="text-gray-500">/{d.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Advisory */}
        <div>
          <h3 className="font-bold mb-4">{t.weather.advisoryTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FARM_TIPS.map((t) => (
              <div key={t.title} className={`p-4 rounded-2xl border ${t.type === "warning" ? "bg-yellow-500/10 border-yellow-500/20" : t.type === "success" ? "bg-primary/10 border-primary/20" : "bg-blue-500/10 border-blue-500/20"}`}>
                <div className={`text-sm font-bold mb-1 ${t.type === "warning" ? "text-yellow-400" : t.type === "success" ? "text-primary" : "text-blue-400"}`}>{t.title}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
