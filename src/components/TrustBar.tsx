import { motion } from "framer-motion";
import { Shield, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Award, value: "12+", label: "Years Experience" },
  { icon: CheckCircle, value: "400+", label: "Projects Completed" },
  { icon: Shield, value: "100%", label: "Code-Compliant Work" },
];

const TrustBar = () => {
  return (
    <section className="bg-heading py-6 sm:py-8">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <s.icon className="w-6 h-6 text-primary" />
              <div>
                <span className="text-2xl font-extrabold text-primary-foreground">{s.value}</span>
                <span className="ml-2 text-sm text-primary-foreground/70 font-medium">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
