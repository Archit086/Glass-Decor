"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "./portfolio-grid";
import { useEffect } from "react";

export default function PortfolioModal({ 
  project, 
  onClose 
}: { 
  project: Project | null; 
  onClose: () => void; 
}) {
  // Disable scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-[105] max-w-7xl w-full max-h-full flex flex-col items-center"
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-3xl bg-muted">
              {project.type === "video" ? (
                <video
                  src={project.url}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              ) : (
                <img
                  src={project.url}
                  alt={project.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )}
            </div>

            <div className="mt-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="font-sans text-muted-foreground font-light tracking-wide uppercase text-sm">
                Exquisite Glass Installation
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
