import { motion } from "framer-motion";
import { ShieldCheck, Clock, TrendingUp, Zap } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    desc: "Every project starts with full permit compliance and code-first planning. Zero surprises at inspection — guaranteed.",
  },
  {
    icon: Zap,
    desc: "We handle all permits, approvals, and code requirements before breaking ground — eliminating risk from day one.",
  },
  {
    icon: TrendingUp,
    desc: "Our designs maximize ROI — expect $1,500–$2,000+/month in rental income and significant property value increase.",
  },
  {
    icon: Clock,
    desc: "Project timelines you can count on. Structured milestones, regular updates, and on-time delivery every time.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-heading px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-28 sm:pb-32 lg:pb-36"
        >
          {/* Subtle diagonal pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.5) 10px,
                rgba(255,255,255,0.5) 11px
              )`,
            }}
          />

          {/* Header row */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-4">
            <div>
              <div className="w-12 h-1 bg-primary mb-5 rounded-full" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground italic">
                Why Us?
              </h2>
            </div>
            <div className="flex items-start gap-4 max-w-md lg:text-right">
              <p className="text-primary-foreground/70 text-sm sm:text-base leading-relaxed">
                We combine construction expertise with a code-first approach to make complex projects simple and stress-free. Build with a team that cares about your investment.
              </p>
              <div className="hidden lg:flex shrink-0 w-16 h-16 rounded-2xl border-2 border-primary-foreground/20 items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards overlapping the banner */}
        <div className="relative z-20 -mt-20 sm:-mt-24 px-2 sm:px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card rounded-2xl p-7 shadow-xl hover-lift border border-border group"
              >
                <div className="w-14 h-14 rounded-2xl bg-heading flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <r.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
