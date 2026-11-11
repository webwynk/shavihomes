import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import commercialImg from "@/assets/commercial-banner.webp";

const CommercialSection = () => {
  return (
    <section id="commercial" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={commercialImg} alt="Commercial construction" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-heading/80" />
      </div>

      <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Commercial Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-6 text-primary-foreground">
            Commercial Construction That Works While You Operate
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl">
            From pharmacies and clinics to offices and spa facilities — we deliver commercial spaces on time, on code, and on budget.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-lg">
            {["Pharmacy Buildouts", "Medical Clinics", "Office Spaces", "Spa & Wellness"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-primary-foreground/90 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <Button variant="cta" size="lg" className="text-base px-8 py-6" asChild>
            <a href="/contact">Discuss Your Project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommercialSection;
