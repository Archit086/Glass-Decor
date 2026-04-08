"use client";
import FadeIn from "./fade-in";
import Image from "next/image";

const projects = [
  { id: 1, title: "Modern Partitions", image: "/images/glass_hero_1775669437068.png", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Custom Mirrors", image: "/images/mirror_product_1775669460883.png", span: "col-span-1" },
  { id: 3, title: "Frameless Railings", image: "/images/glass_railing_1775669504891.png", span: "col-span-1" },
  { id: 4, title: "Minimal Shower", image: "/images/glass_shower_1775669678694.png", span: "col-span-1" },
  { id: 5, title: "Architectural Glass", image: "/images/glass_hero_1775669437068.png", span: "col-span-1" }
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-foreground">Featured Projects</h2>
              <p className="mt-4 text-muted-foreground font-sans max-w-lg">Discover our recent residential and commercial installations showcasing precision and minimalist design.</p>
            </div>
            <button className="text-sm font-medium border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-200">
              View full gallery
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-[auto] md:grid-rows-[250px_250px] gap-4 md:gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 100} className={`relative group overflow-hidden rounded-xl h-[250px] md:h-auto ${project.span}`}>
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-medium tracking-wide drop-shadow-md">{project.title}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
