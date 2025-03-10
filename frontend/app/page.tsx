"use client";

import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Move localStorage access to useEffect (client-side only)
    const token = localStorage.getItem('token');
    if(token) {
      router.push('/dashboard');
    }
    setIsLoading(false);
  }, [router]);
  
  // Show a simple loading state while checking authentication
  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-t-2 border-blue-500 rounded-full"></div>
      </main>
    );
  }
  
  return (
    <main className="bg-gradient-to-b from-white to-gray-50">
      <Appbar />
      <Hero />
      <div className="py-12 md:py-16">
        <HeroVideo />
      </div>
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <Footer />
    </main>
  );
}