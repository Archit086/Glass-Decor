"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "@/app/components/fade-in";
import Link from "next/link";

const images = [
  "/images/glass_hero_1775669437068.png",
  "/images/mirror_product_1775669460883.png",
  "/images/glass_railing_1775669504891.png",
  "/images/glass_shower_1775669678694.png",
];

const features = [
  { title: "Consultation & Concept", desc: "Every project begins with understanding your space, requirements, and design preferences to create a clear design direction." },
  { title: "Measurement & Planning", desc: "We take precise on-site measurements to ensure a perfect fit and carefully plan every detail before execution." },
  { title: "Custom Glass Design", desc: "We design tailored glass solutions including partitions, mirrors, railings, and panels that enhance both style and functionality." },
  { title: "Fabrication & Finishing", desc: "Using high-quality materials and refined techniques, we ensure durability, clarity, and a premium finish." },
  { title: "Installation & Completion", desc: "Our team delivers clean, secure, and seamless installation, ensuring your space looks polished and complete." },
];

const stats = [
  { value: "150", suffix: "+", label: "Projects Completed" },
  { value: "1.2", suffix: "k", label: "Happy Clients" },
  { value: "12", suffix: "", label: "Years Experience" },
  { value: "98", suffix: "%", label: "Satisfaction Rate" },
];

export default function AboutUsSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Smooth auto-slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-background text-foreground overflow-hidden">
      
      {/* 1. Hero Section */}
      <div className="py-24 md:py-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-6 block">Discover Our Story</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.1] mb-10">About Us</h2>
          <div className="w-12 h-[1px] bg-foreground mx-auto mb-10 opacity-30"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            We are a passionate team of designers and architects dedicated to creating beautiful, functional spaces that inspire and elevate everyday living.
          </p>
        </FadeIn>
      </div>

      {/* 2 & 3. Split Layout: Auto Slider + Processes */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Premium Auto Slider (~45% width) */}
          <div className="w-full lg:w-[45%] shrink-0 h-[600px] lg:h-[800px] relative rounded-2xl overflow-hidden shadow-[0_4px_30px_-5px_rgba(0,0,0,0.08)]">
            {images.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Premium architecture image ${idx + 1}`}
                fill
                priority={idx === 0}
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            ))}
            <div className="absolute inset-0 bg-background/5 pointer-events-none mix-blend-overlay"></div>
          </div>

          {/* Right Column: Features (~55% width) text left-aligned, tight vertical stack */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center lg:py-16">
            <FadeIn>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 tracking-tight">Our Process</h3>
              <p className="text-muted-foreground font-light mb-16 max-w-md text-[17px] leading-relaxed">
                A thoughtful process focused on precision, clarity, and craftsmanship—bringing modern glass designs seamlessly into your space.
              </p>
            </FadeIn>
            
            <div className="flex flex-col gap-10">
              {features.map((feature, i) => (
                <FadeIn key={i} delay={i * 150} className="flex flex-col md:flex-row items-start gap-4 md:gap-6 group">
                  <span className="text-sm font-medium tracking-[0.2em] text-muted-foreground/40 pt-1.5 md:w-12 shrink-0 transition-colors duration-500 group-hover:text-muted-foreground/80">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col">
                    <h4 className="text-[22px] font-semibold tracking-wide text-foreground mb-2 opacity-95">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed font-light text-[15px] md:max-w-[85%] text-opacity-90">
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Minimal Stats Section */}
      <div className="py-32 px-6 max-w-7xl mx-auto border-t border-border/40">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-16 lg:gap-8">
           {stats.map((stat, i) => (
             <FadeIn key={i} delay={i * 150} className="flex flex-col items-center group">
               <div className="text-6xl md:text-7xl font-serif text-foreground mb-4 transition-transform duration-500">
                 {stat.value}<span className="text-muted-foreground opacity-50 text-4xl">{stat.suffix}</span>
               </div>
               <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium text-center">{stat.label}</p>
             </FadeIn>
           ))}
         </div>
      </div>

      {/* 5. Refined CTA Section */}
      <div className="bg-foreground text-background py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <FadeIn className="text-left flex-1 max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 leading-tight">Let’s create a space that reflects your vision.</h3>
            <p className="text-background/50 font-light text-lg mb-0 block">Uncompromising quality and seamless coordination from design to installation.</p>
          </FadeIn>
          <FadeIn delay={200} className="shrink-0">
            <Link href="/contact" className="inline-block bg-background text-foreground hover:bg-muted font-medium px-8 py-4 rounded transition-colors duration-300 shadow-xl shadow-background/5 text-center">
              Contact Us Today
            </Link>
          </FadeIn>
        </div>
      </div>

    </section>
  );
}
