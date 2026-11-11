import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { COMPANY_PHONE } from "@/lib/contact";
import { reportConversion } from "@/lib/gtag";

const projectTypes = [
  "Legal Basement",
  "Secondary Suite",
  "Pharmacy",
  "Medical Clinic",
  "Office",
  "Spa & Wellness",
];


const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", phone: "", type: "", budget: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = projectTypes.find(t => 
        t.toLowerCase().includes(serviceParam.toLowerCase()) || 
        serviceParam.toLowerCase().includes(t.toLowerCase())
      );
      if (match) {
        setForm(prev => ({ ...prev, type: match }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, source: "Consultation Form" }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you! We'll contact you within 24 hours.");
        reportConversion();
        setForm({ name: "", phone: "", type: "", budget: "" });
      } else {
        toast.error(data.message || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Could not connect to the server. Please check if the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Get Started</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-6">
              Free Consultation
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your project and we'll get back to you within 24 hours with a custom plan and cost estimate.
            </p>
            <div className="space-y-4">
              {[
                "Free feasibility assessment",
                "Detailed cost breakdown",
                "Timeline and milestone plan",
                "Permit & compliance roadmap",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-5">
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">Full Name</label>
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">Phone Number</label>
                <Input
                  placeholder={COMPANY_PHONE}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-12"
                  maxLength={20}
                  type="tel"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">Project Type</label>
                <select
                  className="w-full h-12 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-heading mb-1.5 block">Budget Range</label>
                <Input
                  placeholder="e.g. $50,000"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="h-12"
                />
              </div>
              <Button 
                type="submit" 
                variant="cta" 
                size="lg" 
                className="w-full text-base py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Free Consultation"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No obligation. We respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
