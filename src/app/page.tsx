"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Bell, Users, BarChart2, Barcode, Zap } from "lucide-react";

const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false, loading: () => <div /> });
const MotionH1 = dynamic(() => import("framer-motion").then(mod => mod.motion.h1), { ssr: false, loading: () => <h1 /> });
const MotionP = dynamic(() => import("framer-motion").then(mod => mod.motion.p), { ssr: false, loading: () => <p /> });

const features = [
  {
    icon: <Zap className="text-purple-500 w-7 h-7" />,
    title: "Real-time Inventory Tracking",
    desc: "Instantly see stock changes and updates across all devices."
  },
  {
    icon: <Barcode className="text-blue-500 w-7 h-7" />,
    title: "Barcode Scanning",
    desc: "Add, update, and manage products with fast barcode scanning."
  },
  {
    icon: <Bell className="text-orange-500 w-7 h-7" />,
    title: "Stock Alerts",
    desc: "Get notified when items run low or reach reorder points."
  },
  {
    icon: <BarChart2 className="text-cyan-500 w-7 h-7" />,
    title: "Advanced Reporting",
    desc: "Visualize sales, trends, and inventory health with beautiful charts."
  },
  {
    icon: <Users className="text-gray-700 w-7 h-7" />,
    title: "Multi-User Roles",
    desc: "Invite team members, assign permissions, and collaborate securely."
  },
  {
    icon: <CheckCircle className="text-green-500 w-7 h-7" />,
    title: "Audit & History Logs",
    desc: "Track every change for compliance and peace of mind."
  },
];

const testimonials = [
  {
    name: "Ayesha K.",
    role: "Small Business Owner",
    quote: "This app transformed how I manage my stock. The real-time alerts and reports are a lifesaver!"
  },
  {
    name: "Ravi S.",
    role: "Warehouse Manager",
    quote: "Barcode scanning is lightning fast. My team loves the multi-user support."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
        <MotionH1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#E879F9] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-4"
        >
          Effortless Inventory Management
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-8"
        >
          Track stock, get alerts, and grow your business with confidence. All-in-one, real-time, and beautifully simple.
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-10"
        >
          <Link href="/sign-in" passHref legacyBehavior>
            <Button
              size="lg"
              className="rounded-xl px-8 py-4 text-lg font-semibold shadow-lg bg-gradient-to-r from-[#E879F9] via-[#3B82F6] to-[#06B6D4] text-white border-0 hover:brightness-110 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] active:scale-95"
              style={{ backgroundSize: '200% 200%', backgroundPosition: 'left center' }}
            >
              Get Started Free
            </Button>
          </Link>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative mx-auto w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-lg"
        >
          <Image
            src="/localhost_3000_sales.png"
            alt="App screenshot"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
            priority
          />
        </MotionDiv>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">All the features you need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all group">
                  <CardContent className="flex flex-col items-center gap-4 py-8">
                    <span className="bg-gradient-to-br from-[#E879F9] to-[#3B82F6] p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </span>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-center text-base">{feature.desc}</p>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What our users say</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {testimonials.map((t, i) => (
              <MotionDiv
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1"
              >
                <Card className="rounded-xl shadow-md border bg-white">
                  <CardContent className="flex flex-col gap-4 py-8 px-6 items-center">
                    <p className="text-lg text-gray-700 italic text-center">“{t.quote}”</p>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-gray-900">{t.name}</span>
                      <span className="text-xs text-gray-500">{t.role}</span>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#E879F9] via-[#3B82F6] to-[#06B6D4] text-white text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to take control of your inventory?</h2>
          <p className="text-lg mb-4">Start your free trial today and experience the future of inventory management.</p>
          <Link href="/sign-in" passHref legacyBehavior>
            <Button
              size="lg"
              className="rounded-xl px-8 py-4 text-lg font-semibold shadow-lg bg-gradient-to-r from-[#E879F9] via-[#3B82F6] to-[#06B6D4] text-white border-0 hover:brightness-110 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] active:scale-95"
              style={{ backgroundSize: '200% 200%', backgroundPosition: 'left center' }}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">Inventory App</span>
            <Badge className="bg-[#F3F4F6] text-[#6B7280] ml-2">Beta</Badge>
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#" className="hover:text-black transition">Pricing</a>
            <a href="#" className="hover:text-black transition">Contact</a>
          </nav>
          <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Inventory App. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
