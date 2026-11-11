import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, ArrowRight, Eye } from "lucide-react";

import social1 from "@/assets/social-1.webp";
import social2 from "@/assets/social-2.webp";
import social3 from "@/assets/social-3.webp";
import social4 from "@/assets/social-4.webp";
import social5 from "@/assets/social-5.webp";
import social6 from "@/assets/social-6.webp";

const projects = [
  { image: social1, label: "Legal Basement", tag: "In Progress" },
  { image: social2, label: "Legal Basement", tag: "Completed" },
  { image: social3, label: "Commercial Build", tag: "Pharmacy" },
  { image: social4, label: "Before / After", tag: "Transformation" },
  { image: social5, label: "Behind the Scenes", tag: "Our Team" },
  { image: social6, label: "Commercial Build", tag: "Medical Clinic" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/shavihomes" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Shavi-Homes/61572363000369/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/" },
];

const SocialProof = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 max-w-3xl mx-auto">
            Don't take our word for it.{" "}
            <span className="gradient-text">See what we've been building.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real projects. Real results. No stock photos — just actual work across Calgary.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer"
            >
              {/* Image with zoom */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Label badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-bold text-foreground shadow-sm border border-border">
                  {p.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-heading/0 group-hover:bg-heading/70 transition-all duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground font-semibold text-sm">{p.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA + Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button variant="cta" size="lg" className="text-base px-10 py-6 rounded-full mb-8" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Explore Our Social Pages <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-5 mb-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300"
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Subtle positioning line */}
          <p className="text-sm text-muted-foreground italic">
            "We document every build — so you know exactly what you're getting."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
