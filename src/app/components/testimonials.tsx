"use client";
import FadeIn from "./fade-in";

const reviews = [
  { 
    name: "Sarah Jenkins", 
    role: "Interior Designer", 
    text: "Their minimal glass partitions completely transformed our office space. The quality and structural integrity are genuinely outstanding." 
  },
  { 
    name: "Marcus Thorne", 
    role: "Homeowner", 
    text: "The custom frameless shower they installed is the centerpiece of our bathroom renovation. Highly recommend their vision and execution." 
  },
  { 
    name: "Elena Rostova", 
    role: "Architect", 
    text: "I have worked with many suppliers, but their attention to modern, clean design puts them in a league of their own. Pure excellence." 
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-24 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground mb-6">Client Stories</h2>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">
              Perspectives from the architects, designers, and homeowners we collaborate with on unique residential and commercial projects.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={i * 200} className={`h-full ${i === 1 ? 'md:mt-16' : ''} ${i === 2 ? 'md:mt-8' : ''}`}>
              <div className="bg-background/90 p-8 pt-10 rounded-xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] border border-border/40 h-full flex flex-col justify-between hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                <div>
                  <svg className="w-6 h-6 text-foreground/10 mb-8 transition-colors group-hover:text-foreground/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  <p className="text-foreground leading-loose font-sans text-[15px] font-light md:max-w-[95%]">"{review.text}"</p>
                </div>
                <div className="mt-12 pt-6 border-t border-border/60">
                  <h4 className="font-medium text-foreground tracking-wide text-sm">{review.name}</h4>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1.5">{review.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
