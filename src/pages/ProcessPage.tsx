import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, PenTool, Hammer, CheckSquare, FileText, HardHat, Eye, Handshake } from "lucide-react";

const phases = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    desc: "We start with a free on-site assessment to understand your vision, evaluate feasibility, and discuss budget expectations.",
    details: ["Site walkthrough & measurements", "Zoning & code feasibility check", "Budget range discussion", "Timeline estimation"],
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design & Engineering",
    desc: "Our team creates custom architectural plans optimized for your goals — whether it's rental income, patient flow, or brand experience.",
    details: ["Custom floor plans & 3D renders", "Structural & MEP engineering", "Material selection & finishes", "Client review & revisions"],
  },
  {
    step: "03",
    icon: FileText,
    title: "Permits & Approvals",
    desc: "We handle all permit applications, municipal submissions, and code compliance documentation — no stress on your end.",
    details: ["Building permit applications", "Zoning variance requests (if needed)", "Code compliance documentation", "Approval tracking & follow-up"],
  },
  {
    step: "04",
    icon: HardHat,
    title: "Construction",
    desc: "Structured build with dedicated project management, milestone updates, and quality checkpoints at every stage.",
    details: ["Dedicated project manager", "Weekly progress updates", "Quality control inspections", "Multi-trade coordination"],
  },
  {
    step: "05",
    icon: Eye,
    title: "Inspection & Compliance",
    desc: "We schedule and manage all required inspections, ensuring your project passes on the first attempt.",
    details: ["Pre-inspection quality review", "Municipal inspection scheduling", "Deficiency resolution (if any)", "Code compliance certification"],
  },
  {
    step: "06",
    icon: Handshake,
    title: "Handover & Support",
    desc: "Final walkthrough, documentation handover, and ongoing support to ensure your complete satisfaction.",
    details: ["Client walkthrough & punch list", "Warranty documentation", "Maintenance guidelines", "Post-project support"],
  },
];

const ProcessPage = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Our 6-Step Construction Process | Shavi Homes"
        description="Learn about Shavi Homes' transparent 6-step construction process. From free consultation to final inspection, we handle every detail of your Calgary project."
        url="/process"
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-heading overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)`,
        }} />
        <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">How It Works</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mt-3 mb-6">
              Our Proven 6-Step Process
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              From first consultation to final handover — every step is structured, transparent, and designed for zero surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {phases.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-start gap-8 py-12 ${i < phases.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <p.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Step {p.step}</span>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {p.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-alt">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Step 1 is free. Book a consultation and let's discuss your vision.
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

export default ProcessPage;
