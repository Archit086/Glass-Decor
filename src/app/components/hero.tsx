"use client";
import FadeIn from "./fade-in";
import Image from "next/image";

export default function Hero({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
        {/* Left Text Content */}
        <div className="max-w-xl py-12">
          <FadeIn>
            <h1 className="font-serif text-5xl lg:text-7xl font-medium leading-[1.1] text-foreground tracking-tight">
              Enhance Your Space <br />
              <span className="text-muted-foreground font-light">with Glass Elegance</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-sans max-w-md">
              Premium custom glass solutions crafted to elevate your home or commercial environment with minimal, sophisticated design.
            </p>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-foreground text-background font-medium text-sm rounded hover:bg-foreground/90 transition-all duration-300 shadow-xl shadow-foreground/10 hover:shadow-foreground/20">
                View Projects
              </button>
              <button className="px-8 py-4 bg-background border border-border text-foreground font-medium text-sm rounded hover:bg-accent transition-all duration-300">
                Contact Us
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Right Image Content */}
        <div className="relative h-[60vh] md:h-[75vh] w-full mt-8 md:mt-0">
          <FadeIn delay={300} className="w-full h-full p-2 relative">
            <div className="absolute inset-0 bg-accent/50 rounded-2xl -rotate-2 scale-95 origin-center transition-transform duration-700 ease-out"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Added unoptimized prop for artifact generation images if needed, and objectFit fill handling for the prompt */}
              <Image 
                src={imageUrl} 
                alt="Glass Elegance Interior"
                fill
                className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
