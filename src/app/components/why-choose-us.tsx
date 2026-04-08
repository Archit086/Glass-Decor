"use client";
import FadeIn from "./fade-in";
import { ShieldCheck, Ruler, Droplets, Gem } from "lucide-react";
import Image from "next/image";

const features = [
  { 
    icon: ShieldCheck, 
    title: "Premium Quality", 
    desc: "Highest grade tempered and architectural glass meticulously selected for clarity and endurance." 
  },
  { 
    icon: Ruler, 
    title: "Custom Fit", 
    desc: "Precision measurements and bespoke fabrication ensuring flawless integration with your space." 
  },
  { 
    icon: Gem, 
    title: "Minimal Elegance", 
    desc: "Clean lines and sophisticated hardware that seamlessly complement any modern interior." 
  },
  { 
    icon: Droplets, 
    title: "Expert Installation", 
    desc: "Secure, structural fittings performed by our seasoned professional installation teams." 
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Offset Overlapping Images */}
          <div className="relative h-[650px] w-full hidden md:block">
            <FadeIn className="absolute top-0 left-0 w-[70%] h-[75%] z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)]">
                <Image 
                  src="/images/glass_hero_1775669437068.png" 
                  alt="High-end minimal interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={200} className="absolute bottom-8 right-4 w-[60%] h-[60%] z-20">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_12px_40px_-5px_rgba(0,0,0,0.1)] ring-[12px] ring-background">
                <Image 
                  src="/images/mirror_product_1775669460883.png" 
                  alt="Elegant mirror detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>

          {/* Mobile fallback layout for images */}
          <div className="md:hidden relative h-[400px] w-full mb-8">
             <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)]">
                <Image 
                  src="/images/glass_hero_1775669437068.png" 
                  alt="High-end minimal interior"
                  fill
                  className="object-cover"
                />
              </div>
          </div>

          {/* Right Side: Vertical Feature List */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground mb-6">Why Choose Us</h2>
              <p className="text-muted-foreground font-light leading-relaxed text-lg mb-16 max-w-lg">
                We fuse modern aesthetics with uncompromising quality to elevate every installation, guaranteeing a seamless process from design to finish.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-10">
              {features.map((feature, i) => (
                <FadeIn key={i} delay={300 + (i * 150)}>
                  <div className="group flex items-start gap-6 transition-transform duration-500 hover:-translate-y-1">
                    {/* Minimal Circular Icon Container */}
                    <div className="flex items-center justify-center bg-muted/40 h-16 w-16 shrink-0 rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] group-hover:bg-muted/80 transition-all duration-500 ease-out">
                      <feature.icon className="w-[1.4rem] h-[1.4rem] stroke-[1.2] text-foreground opacity-80" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col pt-1">
                      <h3 className="text-[19px] font-medium tracking-wide text-foreground mb-2 group-hover:text-muted-foreground transition-colors duration-500">{feature.title}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed text-[15px] max-w-[90%]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
