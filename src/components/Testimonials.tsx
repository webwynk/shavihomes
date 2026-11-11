import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import client1 from "@/assets/client-1.webp";
import client2 from "@/assets/client-2.webp";
import client3 from "@/assets/client-3.webp";
import client4 from "@/assets/client-4.webp";
import client5 from "@/assets/client-5.webp";
import client6 from "@/assets/client-6.webp";
import client7 from "@/assets/client-7.webp";
import client8 from "@/assets/client-8.webp";
import client9 from "@/assets/client-9.webp";
import client10 from "@/assets/client-10.webp";

// Two staggered rows of portraits, evenly distributed
const topRow = [
  { src: client1, ml: "4%" },
  { src: client2, ml: "6%" },
  { src: client4, ml: "6%" },
  { src: client5, ml: "6%" },
  { src: client6, ml: "6%" },
  { src: client7, ml: "6%" },
];

const bottomRow = [
  { src: client9, ml: "10%" },
  { src: client3, ml: "8%" },
  { src: client10, ml: "8%" },
  { src: client8, ml: "8%" },
];

// Ghost placeholder positions
const ghostPositions = [
  { top: "0%", left: "18%", w: 100, h: 120 },
  { top: "5%", left: "50%", w: 110, h: 130 },
  { top: "0%", left: "80%", w: 100, h: 120 },
  { top: "55%", left: "62%", w: 100, h: 120 },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative section-alt overflow-hidden py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Photo mosaic area */}
        <div className="relative mb-4">
          {/* Ghost cards behind */}
          {ghostPositions.map((g, i) => (
            <div
              key={`ghost-${i}`}
              className="absolute rounded-2xl bg-border/40"
              style={{ top: g.top, left: g.left, width: g.w, height: g.h }}
            />
          ))}

          {/* Top row */}
          <div className="flex items-end justify-center gap-0 mb-3">
            {topRow.map((p, i) => (
              <motion.div
                key={`top-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-md shrink-0"
                style={{
                  width: i === 2 ? 130 : i % 2 === 0 ? 110 : 120,
                  height: i === 2 ? 170 : i % 2 === 0 ? 140 : 155,
                  marginLeft: i === 0 ? 0 : "12px",
                  marginBottom: i === 1 ? -15 : i === 4 ? -10 : 0,
                }}
              >
                <img src={p.src} alt="Happy client" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Bottom row - offset to create staggered mosaic */}
          <div className="flex items-start justify-center gap-0 -mt-8">
            {bottomRow.map((p, i) => (
              <motion.div
                key={`bot-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-md shrink-0"
                style={{
                  width: i === 0 ? 110 : i === 3 ? 130 : 120,
                  height: i === 0 ? 140 : i === 3 ? 165 : 150,
                  marginLeft: i === 0 ? 0 : "14px",
                  marginTop: i === 1 ? 20 : i === 2 ? -10 : 0,
                }}
              >
                <img src={p.src} alt="Happy client" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Fade to blend into text */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-section-alt to-transparent" />
        </div>

        {/* Centered text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center pb-8"
        >
          <span className="inline-block px-5 py-1.5 rounded-full border border-border bg-card text-sm font-semibold text-foreground mb-6 shadow-sm">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
            Trusted by homeowners
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-muted-foreground/40 mb-6 italic">
            across Calgary
          </h2>
          <p className="text-foreground font-semibold text-lg max-w-xl mx-auto mb-8">
            Learn why 400+ clients trust Shavi Homes to build their legal basements and commercial spaces.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-heading text-primary-foreground hover:bg-heading/90 px-8 py-6 text-base rounded-full font-bold shadow-lg"
            asChild
          >
            <a href="/contact">
              Read Success Stories <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
