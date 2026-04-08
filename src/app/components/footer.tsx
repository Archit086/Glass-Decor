export default function Footer() {
  return (
    <footer className="bg-background py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif text-xl font-semibold tracking-wide text-foreground">
          Glass<span className="font-light text-muted-foreground">Decor</span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
        </div>
        <p className="text-sm text-muted-foreground">&copy; 2026 Glass Decor. All rights reserved.</p>
      </div>
    </footer>
  );
}
