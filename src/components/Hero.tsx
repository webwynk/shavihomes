import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-basement.webp";
import { reportContactConversion } from "@/lib/gtag";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Modern legal basement suite in Calgary" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-heading/70" />
      </div>

      <div className="relative z-10 container-tight section-padding pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 border border-primary/30">
            Calgary's Trusted Construction Experts
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-primary-foreground">
            Legal Basement Construction in Calgary —{" "}
            <span className="gradient-text">Built to Pass Inspection First Time</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
            Turn your basement into a legal, income-generating space without delays, rework, or permit issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="cta" size="lg" className="text-base px-8 py-6" asChild>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  reportContactConversion("/contact");
                }}
              >
                Get Free Consultation
              </a>
            </Button>
            <Button variant="ctaOutline" size="lg" className="text-base px-8 py-6 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <a href="#services">See Your Basement Plan</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
