import { motion } from "framer-motion";
import { MessageSquare, PenTool, Hammer, CheckSquare } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Consultation", desc: "Free site assessment and feasibility check for your project." },
  { icon: PenTool, step: "02", title: "Design & Approval", desc: "Custom plans, permit submissions, and code-compliant engineering." },
  { icon: Hammer, step: "03", title: "Construction", desc: "Structured build with milestone updates and quality checkpoints." },
  { icon: CheckSquare, step: "04", title: "Final Inspection", desc: "100% code-compliant handover — built to pass the first time." },
];

const Process = () => {
  return (
    <section id="process" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4">
            Our 4-Step Process
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 relative z-10">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Step {s.step}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
