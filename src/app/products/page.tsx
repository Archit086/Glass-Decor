import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FadeIn from "../components/fade-in";
import Image from "next/image";
import { Home, Bath, Sofa, Briefcase, Store, Monitor } from "lucide-react";

const products = [
  { title: "Glass Partitions", desc: "Seamless room dividers enhancing flow and natural light.", image: "/images/glass_hero_1775669437068.png", mt: "lg:mt-0" },
  { title: "Glass Doors", desc: "Elegant frameless solutions for modern residential entryways.", image: "/images/glass_railing_1775669504891.png", mt: "lg:mt-12" },
  { title: "Shower Enclosures", desc: "Minimalist, watertight glass tailored for luxury bathrooms.", image: "/images/glass_shower_1775669678694.png", mt: "lg:mt-24" },
  { title: "Glass Railings", desc: "Transparent structural safety for staircases and balconies.", image: "/images/glass_railing_1775669504891.png", mt: "lg:mt-0" },
  { title: "Mirrors & Panels", desc: "Custom-cut reflective surfaces and decorative wall panels.", image: "/images/mirror_product_1775669460883.png", mt: "lg:mt-12" },
  { title: "Decorative Glass Designs", desc: "Bespoke architectural accents offering privacy and texture.", image: "/images/glass_hero_1775669437068.png", mt: "lg:mt-24" }
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col items-center md:items-start">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-foreground mb-6">
              Our Glass Solutions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Modern glass designs expertly crafted to enhance both aesthetics and functionality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Product Categories (Staggered Grid) */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 gap-y-16">
            {products.map((product, i) => (
              <FadeIn key={i} delay={i * 150} className={`${product.mt}`}>
                <div className="group cursor-pointer flex flex-col">
                  <div className="relative h-[25rem] w-full mb-6 overflow-hidden rounded-xl bg-muted shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08)]">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-500"></div>
                  </div>
                  <div className="pl-1 pr-4">
                    <h3 className="text-xl font-medium text-foreground tracking-wide opacity-90 mb-2">{product.title}</h3>
                    <p className="text-muted-foreground font-light text-[15px] leading-relaxed">{product.desc}</p>
                    <div className="w-6 h-[1px] bg-border mt-4 group-hover:w-16 group-hover:bg-foreground/40 transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Applications Section */}
      <section className="py-32 bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
             <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-16 tracking-tight">Applications</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Residential */}
            <FadeIn delay={150}>
              <div className="bg-background rounded-2xl p-10 md:p-12 border border-border/50 shadow-sm h-full">
                <h3 className="text-2xl font-serif text-foreground mb-8">Residential</h3>
                <ul className="flex flex-col gap-8">
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Sofa className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Living Spaces</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Bath className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Bathrooms</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Home className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Wardrobes</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Commercial */}
            <FadeIn delay={250}>
              <div className="bg-background rounded-2xl p-10 md:p-12 border border-border/50 shadow-sm h-full">
                <h3 className="text-2xl font-serif text-foreground mb-8">Commercial</h3>
                <ul className="flex flex-col gap-8">
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Office Cabins</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Store className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Storefronts</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                       <Monitor className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-foreground tracking-wide font-light text-lg">Conference Rooms</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 4. Glass Types */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
             <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-16 tracking-tight text-center">Core Materials</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { type: "Toughened Glass", desc: "Heat-treated for immense structural strength and safety." },
              { type: "Laminated Glass", desc: "Multi-layered composition designed to prevent shattering." },
              { type: "Frosted Glass", desc: "Textured finish offering diffused light and elegant privacy." },
              { type: "Clear Glass", desc: "Ultra-transparent panels maximizing pure natural daylight." }
            ].map((glass, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="flex flex-col items-center text-center">
                 <h4 className="text-[19px] font-medium tracking-wide text-foreground mb-3">{glass.type}</h4>
                 <p className="text-muted-foreground font-light leading-relaxed text-[15px]">{glass.desc}</p>
                 <div className="w-8 h-[1px] bg-border mt-6"></div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custom Solutions */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-border/40">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
           
           <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
             <FadeIn>
               <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-6 tracking-tight">Bespoke Solutions</h3>
               <p className="text-muted-foreground font-light mb-12 max-w-lg text-lg leading-relaxed">
                 Every space is unique. We offer custom glass solutions tailored precisely to your design vision and functional needs.
               </p>
               
               <ul className="flex flex-col gap-6 pl-4 border-l-2 border-muted">
                 <li className="text-foreground tracking-wide font-light">Custom dimensional sizing</li>
                 <li className="text-foreground tracking-wide font-light">Endless design flexibility</li>
                 <li className="text-foreground tracking-wide font-light">Seamless professional installation</li>
               </ul>
             </FadeIn>
           </div>
           
           <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative rounded-2xl overflow-hidden shadow-[0_4px_30px_-5px_rgba(0,0,0,0.08)] order-1 lg:order-2">
             <FadeIn className="w-full h-full">
               <Image 
                 src="/images/glass_hero_1775669437068.png" 
                 alt="Custom architectural solutions" 
                 fill
                 className="object-cover"
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
             </FadeIn>
           </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-foreground text-background py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <FadeIn className="flex-1">
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 leading-tight">Let’s bring your vision to life.</h3>
          </FadeIn>
          <FadeIn delay={200} className="shrink-0">
            <button className="bg-background text-foreground hover:bg-muted font-medium px-8 py-4 rounded transition-colors duration-300 shadow-xl shadow-background/5">
              Get a Quote
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
