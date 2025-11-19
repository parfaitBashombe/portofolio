"use client";

import { useState, cache } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectImageCarouselProps {
  mainImage: string;
  additionalImages?: string[];
  title: string;
  className?: string;
}

// Cache the image URLs processing
const processImageUrls = cache((mainImage: string, additionalImages: string[]) => {
  return [mainImage, ...additionalImages].filter(Boolean);
});

export default function ProjectImageCarousel({
  mainImage,
  additionalImages = [],
  title,
  className = "",
}: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use cached processing
  const allImages = processImageUrls(mainImage, additionalImages);
  
  if (allImages.length === 0) {
    return (
      <div className="w-full h-64 bg-muted flex items-center justify-center rounded-lg">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className={`relative group w-full ${className}`}>
      {/* Main Image Display with Animation */}
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={allImages[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Navigation Arrows - Only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <motion.div
            className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentIndex + 1} / {allImages.length}
          </motion.div>
        )}

        {/* Main Image Badge */}
        {currentIndex === 0 && allImages.length > 1 && (
          <motion.div
            className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Main
          </motion.div>
        )}
      </div>

      {/* Thumbnail Dots Indicator */}
      {allImages.length > 1 && (
        <motion.div
          className="flex justify-center gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToImage(e, index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
