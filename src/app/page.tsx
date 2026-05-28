import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Ecosystem from "@/components/sections/Ecosystem";
import { ArrowUpRight } from "lucide-react";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    // The main wrapper enforces smooth scrolling and sets global selection colors
    <main className="relative min-h-screen bg-[#03070b] selection:bg-[#D72731] selection:text-white overflow-x-hidden">
      
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Page Sections */}
      <div className="flex flex-col w-full">
        <Navbar />
        <Hero />
        <About />
        <Ecosystem />
        <Gallery />
        <Testimonials />
         <Footer />
      </div>

    </main>
  );
}