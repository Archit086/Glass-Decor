"use client";
import FadeIn from "./fade-in";
import Image from "next/image";

const categories = [
  { title: "Custom Mirrors", image: "/images/mirror_product_1775669460883.png", mt: "lg:mt-0" },
  { title: "Glass Partitions", image: "/images/glass_hero_1775669437068.png", mt: "lg:mt-16" },
  { title: "Frameless Railings", image: "/images/glass_railing_1775669504891.png", mt: "lg:mt-6" },
  { title: "Shower Enclosures", image: "/images/glass_shower_1775669678694.png", mt: "lg:mt-24" }
];

export default function ProductPreview() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground max-w-[15ch]">Our Crafted Solutions</h2>
            <p className="mt-2 text-muted-foreground md:max-w-md font-light leading-relaxed text-lg">
              Expertly crafted panels, mirrors, and enclosures designed to blend seamlessly into minimal environments.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {categories.map((cat, i) => (
            <FadeIn key={i} delay={i * 200} className={cat.mt}>
              <div className="group cursor-pointer flex flex-col">
                <div className="relative h-[24rem] w-full mb-6 overflow-hidden rounded-xl bg-muted shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08)]">
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-500"></div>
                </div>
                <div className="pl-1">
                  <h3 className="text-[17px] font-medium text-foreground tracking-wide opacity-90">{cat.title}</h3>
                  <div className="w-6 h-[1px] bg-border mt-3 group-hover:w-16 group-hover:bg-foreground/40 transition-all duration-500 ease-out"></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
