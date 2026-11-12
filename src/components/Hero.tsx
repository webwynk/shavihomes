import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-basement.webp";
import { reportContactConversion } from "@/lib/gtag";

const Hero = () => {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Modern legal basement suite in Calgary"
          loading="eager"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-heading/95 via-heading/80 to-heading/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-heading/40" />
      </div>

      <div className="relative z-10 w-full container-tight section-padding pt-28 sm:pt-36">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-orange-200 font-semibold text-sm mb-6 border border-primary/40">
            Calgary's Trusted Construction Experts
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold leading-[1.12] mb-6 text-primary-foreground">
            Legal Basement Construction in Calgary —{" "}
            <span className="gradient-text">Built to Pass Inspection First Time</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl leading-relaxed">
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
            <Button
              variant="ctaOutline"
              size="lg"
              className="text-base px-8 py-6 bg-heading/40 backdrop-blur-sm border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              asChild
            >
              <a href="#services">See Your Basement Plan</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
