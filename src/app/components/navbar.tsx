"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-wide text-foreground">
          Glass<span className="text-muted-foreground/60 font-light">Decor</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-muted-foreground">
          <Link 
            href="/projects" 
            className={`transition-colors duration-200 ${pathname === '/projects' ? 'text-foreground font-semibold' : 'hover:text-foreground'}`}
          >
            Projects
          </Link>
          <Link 
            href="/products" 
            className={`transition-colors duration-200 ${pathname === '/products' ? 'text-foreground font-semibold' : 'hover:text-foreground'}`}
          >
            Products
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors duration-200 ${pathname === '/about' ? 'text-foreground font-semibold' : 'hover:text-foreground'}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`transition-colors duration-200 ${pathname === '/contact' ? 'text-foreground font-semibold' : 'hover:text-foreground'}`}
          >
            Contact
          </Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu place-holder */}
          <button className="text-foreground p-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
