import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ContactSection from "../components/contact-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Glass Decor",
  description: "Get in touch with Glass Decor for your custom glass interiors and installations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
