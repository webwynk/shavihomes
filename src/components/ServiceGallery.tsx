import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ServiceGalleryProps {
  images: string[];
  title: string;
  interval?: number;
}

const ServiceGallery = ({ images, title, interval = 2000 }: ServiceGalleryProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, images.length]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Project Gallery</h2>
      <div className="relative overflow-hidden rounded-xl aspect-video">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${title} - Image ${i + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              i === current ? "opacity-100" : "opacity-0"
            )}
            loading={i === 0 ? "eager" : "lazy"}
            width={1280}
            height={720}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                i === current ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;
