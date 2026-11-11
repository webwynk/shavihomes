import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import basementImg from "@/assets/basement.webp";
import suiteImg from "@/assets/Suite.webp";
import clinicImg from "@/assets/service-clinic.webp";
import officeImg from "@/assets/service-office.webp";
import commercialImg from "@/assets/service-commercial.webp";
import residentialImg from "@/assets/service-residential.webp";
import backyardSuiteImg from "@/assets/service-suite-2.webp";
import heroBasementImg from "@/assets/hero-basement.webp";
import duplexImg from "@/assets/service-duplex-homes.webp";
import garageSuiteImg from "@/assets/service-garage-suite.webp";



const services = [
  {
    title: "Residential Construction",
    desc: "Custom homes, renovations, and additions built with quality craftsmanship and care.",
    image: residentialImg,
    slug: "residential",
  },
  {
    title: "Legal Basement Construction",
    desc: "Fully permitted basements built to Calgary's building code — pass inspection the first time.",
    image: basementImg,
    slug: "legal-basement",
  },
  {
    title: "Secondary Suite Development",
    desc: "Income-generating suites designed for maximum ROI and tenant comfort.",
    image: suiteImg,
    slug: "secondary-suite",
  },
  {
    title: "Backyard Suite",
    desc: "Detached, versatile backyard living spaces perfect for guests, family, or rental income.",
    image: heroBasementImg,
    slug: "backyard-suite",
  },
  {
    title: "Medical Clinic Construction",
    desc: "Healthcare spaces designed for patient flow, compliance, and professional excellence.",
    image: clinicImg,
    slug: "medical-clinic",
  },
  {
    title: "Office Construction",
    desc: "Modern workspaces engineered for productivity, collaboration, and growth.",
    image: officeImg,
    slug: "office",
  },
  {
    title: "Commercial Construction",
    desc: "Full-scale commercial builds — retail, restaurants, warehouses, and mixed-use spaces done right.",
    image: commercialImg,
    slug: "commercial",
  },
  {
    title: "Duplex Homes",
    desc: "Side-by-side duplex builds designed to maximize land value and deliver two income-ready homes.",
    image: duplexImg,
    slug: "duplex-homes",
  },
  {
    title: "Garage Suite",
    desc: "Turn underused garage space into a modern rental suite or guest home above your parking.",
    image: garageSuiteImg,
    slug: "garage-suite",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding section-alt">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">What We Build</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Not just construction — we build legally approved, income-generating spaces.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/services/${s.slug}`}
                className="group block bg-card rounded-xl overflow-hidden shadow-sm hover-lift border border-border"
              >
                <div className="img-zoom aspect-[4/3]">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                  <Button variant="ghost" className="p-0 h-auto text-primary font-semibold group-hover:gap-3 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
export { services };
