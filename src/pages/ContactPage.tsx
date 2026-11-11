import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "@/lib/contact";
import { reportConversion } from "@/lib/gtag";


const projectTypes = [
  "Legal Basement",
  "Secondary Suite",
  "Pharmacy",
  "Medical Clinic",
  "Office",
  "Spa & Wellness",
  "Commercial",
  "Residential",
  "Maintenance",
];

const offices = [
  {
    city: "Calgary",
    address: "123 Centre Street SW, Calgary, AB T2G 1A1",
    phone: COMPANY_PHONE,
    mapQuery: "Calgary+Alberta+Canada",
  },
  {
    city: "Edmonton",
    address: "456 Jasper Avenue, Edmonton, AB T5J 1N9",
    phone: COMPANY_PHONE,
    mapQuery: "Edmonton+Alberta+Canada",
  },
];

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
  const [activeOffice, setActiveOffice] = useState(0);
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
        body: JSON.stringify({ ...form, source: "Contact Page" }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you! We'll contact you within 24 hours.");
        reportConversion();
        setForm({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us | Book a Free Consultation | Shavi Homes"
        description="Get in touch with Shavi Homes. Book a free consultation for your Calgary basement suite, home renovation, or commercial buildout today."
        url="/contact"
      />
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-heading overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-foreground/30 rounded-full" />
          <div className="absolute top-32 right-20 w-4 h-4 bg-[#F97316] rotate-45" />
          <div className="absolute bottom-16 left-1/4 w-6 h-6 border-2 border-[#F97316] rounded-full" />
          <div className="absolute top-20 right-1/3 w-3 h-3 bg-primary-foreground/40 rotate-45" />
        </div>
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#F97316] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6"
          >
            Let's Connect With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8"
          >
            Let's talk about your project. Send us a message and we will be in touch within one work day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <a href={COMPANY_PHONE_TEL} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">{COMPANY_PHONE_DISPLAY}</span>
            </a>
            <a href="mailto:info@shavihomes.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span className="font-medium">info@shavihomes.com</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill in the form and our team will get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-heading mb-1.5 block">Full Name *</label>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-heading mb-1.5 block">Phone Number *</label>
                    <Input
                      placeholder={COMPANY_PHONE}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-12"
                      maxLength={20}
                      type="tel"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-heading mb-1.5 block">Email Address</label>
                  <Input
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-12"
                    maxLength={100}
                    type="email"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
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
                </div>
                <div>
                  <label className="text-sm font-semibold text-heading mb-1.5 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="min-h-[120px]"
                    maxLength={1000}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-base py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No obligation. We respond within 24 hours.
                </p>
              </form>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <a href={COMPANY_PHONE_TEL} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold text-foreground group-hover:text-[#F97316] transition-colors">{COMPANY_PHONE_DISPLAY}</p>
                    </div>
                  </a>
                  <a href="mailto:info@shavihomes.com" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">info@shavihomes.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-semibold text-foreground">Calgary, Alberta, Canada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Working Hours</p>
                      <p className="font-semibold text-foreground">Mon – Fri: 8AM – 6PM</p>
                      <p className="text-sm text-muted-foreground">Sat: 9AM – 2PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-heading rounded-2xl p-8 text-primary-foreground">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary-foreground">Need Urgent Help?</h3>
                <p className="text-primary-foreground/70 mb-5">Call us directly for emergency maintenance or time-sensitive projects.</p>
                <a
                  href={COMPANY_PHONE_TEL}
                  className="inline-flex items-center gap-2 bg-[#F97316] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#EA580C] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations + Google Map */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">Our Offices</h2>
            <p className="text-muted-foreground">Visit us for an in-person consultation.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Office List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {offices.map((office, i) => (
                <button
                  key={office.city}
                  onClick={() => setActiveOffice(i)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                    activeOffice === i
                      ? "bg-card border-[#F97316] shadow-lg"
                      : "bg-card border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${activeOffice === i ? "bg-[#F97316]" : "bg-muted-foreground/30"}`} />
                    <div>
                      <h3 className="font-heading font-bold text-lg">
                        {office.city}
                        {activeOffice === i && (
                          <span className="ml-2 text-sm text-[#F97316] font-semibold">— MAP</span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{office.address}</p>
                      <p className="text-sm text-muted-foreground">{office.phone}</p>
                      <p className="text-sm text-muted-foreground">Visit us for in person project</p>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>

            {/* Dynamic Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg border border-border aspect-[4/3]"
            >
              <iframe
                title={`Map of ${offices[activeOffice].city} office`}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-114.0719!3d51.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${offices[activeOffice].mapQuery}!5e0!3m2!1sen!2sca&q=${offices[activeOffice].mapQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
