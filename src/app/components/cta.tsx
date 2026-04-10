"use client";
import FadeIn from "./fade-in";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-32 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">Let's Design Your Space</h2>
          <p className="mt-6 text-muted font-sans text-lg md:text-xl font-light">
            Bring clarity and modern elegance to your next project.
          </p>
          <Link href="/contact" className="inline-block mt-10 px-8 py-4 bg-background text-foreground font-medium rounded hover:bg-muted transition-colors shadow-lg shadow-background/5 text-center">
            Contact Us Today
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
