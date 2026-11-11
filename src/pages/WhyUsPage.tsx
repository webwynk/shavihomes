import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import WhyChooseUs from "@/components/WhyChooseUs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, Users, BarChart3, Clock, CheckCircle } from "lucide-react";

const stats = [
  { value: "400+", label: "Projects Completed" },
  { value: "100%", label: "Inspection Pass Rate" },
  { value: "15+", label: "Years Experience" },
  { value: "4.9/5", label: "Client Rating" },
];

const values = [
  { icon: ShieldCheck, title: "Code-First Approach", desc: "Every project starts with full permit compliance and code-first planning. Zero surprises at inspection." },
  { icon: Award, title: "Quality Craftsmanship", desc: "Premium materials, skilled tradespeople, and meticulous attention to detail on every build." },
  { icon: Users, title: "Client-Focused", desc: "Transparent communication, regular updates, and a dedicated project manager for every job." },
  { icon: BarChart3, title: "ROI Maximization", desc: "Our designs are engineered to maximize your return — from rental income to property value." },
  { icon: Clock, title: "On-Time Delivery", desc: "Structured milestones and disciplined scheduling ensure your project is completed when promised." },
  { icon: CheckCircle, title: "Full-Service", desc: "From permits to final inspection — we handle everything so you don't have to." },
];

const WhyUsPage = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Why Choose Shavi Homes | Calgary's Top Contractor"
        description="With over 400 projects completed and a 100% inspection pass rate, Shavi Homes is the trusted choice for renovations and commercial builds in Calgary."
        url="/why-us"
      />
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-heading overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)`,
          }}
        />
        <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why Shavi Homes</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mt-3 mb-6">
              Built Different. Built Right.
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              We combine construction expertise with a code-first approach to deliver projects that pass inspection, generate income, and stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">{s.value}</div>
                <div className="text-muted-foreground font-medium text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">What Sets Us Apart</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every decision we make is guided by these core principles.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl bg-heading flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <v.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-alt">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to Build With the Best?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation and see why 400+ Calgary homeowners and businesses trust Shavi Homes.
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

export default WhyUsPage;
