import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import beforeImg from "@/assets/before-basement.webp";
import afterImg from "@/assets/after-basement.webp";
import { ArrowLeftRight } from "lucide-react";

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">See The Difference</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4">
            From Unused Basement — To Legal Rental Suite
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Drag the slider to see the transformation. <span className="font-bold text-foreground">This could be YOUR basement next month.</span> Every project includes a free design consultation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* After image (full background) */}
            <img
              src={afterImg}
              alt="Basement after renovation — legal rental suite"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={beforeImg}
                alt="Basement before renovation — unused space"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
                draggable={false}
              />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10 bg-heading/80 backdrop-blur-sm text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full">
              Before
            </div>
            <div className="absolute top-4 right-4 z-10 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full">
              After
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 z-20"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-0.5 h-full bg-primary-foreground/90 shadow-lg" />
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-xl flex items-center justify-center border-2 border-primary/30">
                <ArrowLeftRight className="w-5 h-5 text-heading" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;
