"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "./fade-in";
import { Mail, Check, Phone, MapPin } from "lucide-react";

const projectTypes = [
  "Glass Partitions",
  "Shower Enclosures",
  "Glass Railings",
  "Mirrors & Panels",
  "Custom Glass Work",
  "Office Installations",
  "Home Installations",
  "Other",
];

export default function ContactSection() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/glass_hero_1775669437068.png"
          alt="Modern glass interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Heading */}
          <FadeIn>
            <div className="max-w-xl">
              <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
                Let’s build something <span className="italic">beautiful</span> together
              </h1>
              <p className="mt-8 text-white/70 font-sans text-lg md:text-xl font-light max-w-md">
                Custom glass solutions tailored to your architectural vision.
              </p>
            </div>
          </FadeIn>

          {/* Right Side: Contact Form Card */}
          <FadeIn delay={200}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20">
              <div className="mb-10">
                <h2 className="font-serif text-3xl text-white mb-6">Get in touch</h2>
                <div className="flex flex-col gap-4 text-white/70 font-light">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Phone size={14} className="text-white/60" />
                    </div>
                    <a href="tel:+919800000000" className="hover:text-white transition-colors">
                      +91 98XXXXXXX
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Mail size={14} className="text-white/60" />
                    </div>
                    <a href="mailto:info@glassdecor.com" className="hover:text-white transition-colors">
                      info@glassdecor.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <MapPin size={14} className="text-white/60" />
                    </div>
                    <span>Delhi, India</span>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white/90 ml-1">Phone Number <span className="text-white/50 ml-1">*</span></label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/60 transition-all font-medium drop-shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Project description</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all font-light resize-none"
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-white/80 ml-1">What are you looking for?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleType(type)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all duration-300 ${
                          selectedTypes.includes(type)
                            ? "bg-white text-black border-white"
                            : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                          selectedTypes.includes(type) ? "bg-black border-black" : "border-white/20"
                        }`}>
                          {selectedTypes.includes(type) && <Check size={12} className="text-white" />}
                        </div>
                        <span className="truncate">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-8 px-8 py-5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl shadow-white/5">
                  Request a Call
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
