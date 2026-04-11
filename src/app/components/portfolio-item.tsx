"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "./portfolio-grid";

export default function PortfolioItem({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: () => void; 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (project.type !== "video") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {
                // Autoplay might be blocked by browser until interaction
              });
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [project.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-black/10 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full transition-transform duration-1000 ease-out group-hover:scale-[1.03]">
        {project.type === "video" ? (
          <video
            ref={videoRef}
            src={project.url}
            muted
            loop
            playsInline
            className="w-full h-auto block"
          />
        ) : (
          <img
            src={project.url}
            alt={project.title}
            className="w-full h-auto block"
          />
        )}
      </div>

      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
        }`}
      >
        <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 transition-transform duration-700 group-hover:translate-y-0">
          <p className="font-sans text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
            {project.filename.includes("Video") ? "Video Project" : "Exquisite Design"}
          </p>
          <h3 className="font-serif text-2xl text-white tracking-wide">
            {project.title}
          </h3>
        </div>
      </div>
      
      {/* Subtle border effect on hover */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-white/20 transition-colors duration-700"></div>
    </motion.div>
  );
}
