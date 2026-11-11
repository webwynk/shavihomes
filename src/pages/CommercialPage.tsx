import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import commercialImg from "@/assets/commercial-banner.webp";

import pharmacyImg from "@/assets/medical.webp";
import clinicImg from "@/assets/service-clinic.webp";
import officeImg from "@/assets/service-office.webp";
import spaImg from "@/assets/spa.webp";
import commercialServiceImg from "@/assets/service-commercial.webp";

const commercialServices = [
  {
    title: "Pharmacy Construction",
    desc: "Purpose-built pharmacies meeting all regulatory, accessibility, and Alberta College of Pharmacy requirements.",
    image: pharmacyImg,
    slug: "pharmacy",
  },
  {
    title: "Medical Clinic Construction",
    desc: "Healthcare spaces designed for patient flow, infection control, compliance, and professional excellence.",
    image: clinicImg,
    slug: "medical-clinic",
  },
  {
    title: "Office Construction",
    desc: "Modern workspaces engineered for productivity, collaboration, and growth — on time and on budget.",
    image: officeImg,
    slug: "office",
  },
  {
    title: "Spa & Wellness Buildouts",
    desc: "Luxurious wellness environments with specialized plumbing, ventilation, and premium finishes.",
    image: spaImg,
    slug: "spa-wellness",
  },
  {
    title: "General Commercial",
    desc: "Retail, restaurants, warehouses, and mixed-use developments — full-scale commercial builds done right.",
    image: commercialServiceImg,
    slug: "commercial",
  },
];

const benefits = [
  "On-time, on-budget delivery",
  "Full permit & code compliance",
  "Minimal disruption to operations",
  "Dedicated project management",
  "Multi-trade coordination",
  "Post-build support & warranty",
];

const CommercialPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img src={commercialImg} alt="Commercial construction" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-heading/75" />
        </div>
        <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Commercial Projects</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mt-3 mb-4">
              Commercial Construction That Works While You Operate
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl">
              From pharmacies and clinics to offices and retail — we deliver commercial spaces on time, on code, and on budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Why Businesses Choose Shavi Homes</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We understand that commercial projects have unique demands — tight timelines, regulatory compliance, and the need to minimize disruption to your operations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={commercialImg} alt="Commercial project" className="w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commercial Services Grid */}
      <section className="section-padding section-alt">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Our Commercial Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Specialized construction for every type of commercial space.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((s, i) => (
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
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
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

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Let's Discuss Your Commercial Project</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation and get a custom plan tailored to your business needs.
          </p>
          <Button variant="cta" size="lg" className="text-base px-10 py-6" asChild>
            <a href="/contact">Book Free Consultation</a>
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default CommercialPage;
