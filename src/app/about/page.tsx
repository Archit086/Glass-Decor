import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AboutUsSection from "@/components/ui/about-us-section";

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        <AboutUsSection />
      </div>

      <Footer />
    </main>
  );
}
