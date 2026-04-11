import fs from "fs";
import path from "path";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PortfolioGrid from "../components/portfolio-grid";
import Link from "next/link";
import FadeIn from "../components/fade-in";

export default async function ProjectsPage() {
  const photosDir = path.join(process.cwd(), "public", "photos_project");
  
  let files: string[] = [];
  try {
    files = fs.readdirSync(photosDir);
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  const projectItems = files
    .filter((file) => /\.(jpe?g|png|mp4|webp)$/i.test(file))
    .map((file, index) => {
      const isVideo = file.toLowerCase().endsWith(".mp4");
      
      // Determine a realistic title based on a pool of categories
      const titles = [
        "Glass Partition – Office",
        "Luxury Shower Enclosure",
        "Modern Glass Railing",
        "Decorative Mirror Panel",
        "Architectural Glass Facade",
        "Custom Glass Partition",
        "Minimalist Shower Glass",
        "Balcony Glass Railing",
        "Textured Glass Panel",
        "Frameless Glass Entry"
      ];
      
      return {
        id: index,
        url: `/photos_project/${file}`,
        type: isVideo ? "video" : "image",
        title: titles[index % titles.length],
        filename: file
      };
    });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-foreground">
              Our Work
            </h1>
            <p className="font-sans text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              Crafted Glass Installations & Designs
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <PortfolioGrid projects={projectItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 border-t border-border/40 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground">
              Have a similar project in mind?
            </h2>
            <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-10 py-5 bg-foreground text-background text-lg font-medium rounded-full transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-foreground/20 active:scale-[0.98]"
              >
                Request a Quote
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
