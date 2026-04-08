import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FeaturedProjects from "./components/featured-projects";
import WhyChooseUs from "./components/why-choose-us";
import ProductPreview from "./components/product-preview";
import Testimonials from "./components/testimonials";
import Cta from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero imageUrl="/images/glass_hero_1775669437068.png" />
      <FeaturedProjects />
      <WhyChooseUs />
      <ProductPreview />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  );
}