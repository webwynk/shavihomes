import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";

import client1 from "@/assets/client-1.webp";
import client2 from "@/assets/client-2.webp";
import client3 from "@/assets/client-3.webp";
import client4 from "@/assets/client-4.webp";
import client5 from "@/assets/client-5.webp";
import client6 from "@/assets/client-6.webp";
import client7 from "@/assets/client-7.webp";
import client8 from "@/assets/client-8.webp";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

const staticTestimonials = [
  {
    name: "Sarah M.",
    role: "Homeowner — Legal Basement",
    image: client1,
    text: "Shavi Homes turned our unfinished basement into a beautiful legal suite. The permit process was seamless, and we passed inspection on the first try. Now we're earning $1,800/month in rental income!",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Property Investor — Secondary Suite",
    image: client2,
    text: "As an investor, ROI is everything. Shavi Homes delivered a secondary suite that exceeded my expectations — on time, on budget, and generating income within 3 months of completion.",
    rating: 5,
  },
  {
    name: "Dr. Patel",
    role: "Pharmacy Owner",
    image: client3,
    text: "Building a pharmacy requires very specific regulatory knowledge. Shavi Homes understood every requirement and delivered a space that passed all inspections. Highly recommend for any pharmacy buildout.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "Medical Clinic Director",
    image: client4,
    text: "Our clinic needed to be operational quickly. Shavi Homes managed the entire process from design to final inspection with zero delays. Patient flow is exactly as we envisioned.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Business Owner — Office Build",
    image: client5,
    text: "The team built our new office space while we continued operating from a temporary location. They finished ahead of schedule and the quality of work is outstanding. Our team loves the new space.",
    rating: 5,
  },
  {
    name: "Lisa & Mark T.",
    role: "Homeowners — Basement Development",
    image: client6,
    text: "We were nervous about the permit process, but Shavi Homes handled everything. From start to finish, they kept us informed and the final result was beyond our expectations.",
    rating: 5,
  },
  {
    name: "Ahmed H.",
    role: "Spa Owner",
    image: client7,
    text: "Building a spa requires specialized knowledge — moisture control, ventilation, premium finishes. Shavi Homes nailed every detail. Our clients constantly comment on the beautiful space.",
    rating: 5,
  },
  {
    name: "Karen W.",
    role: "Property Developer",
    image: client8,
    text: "I've worked with many contractors over the years. Shavi Homes stands out for their professionalism, transparency, and quality. They're now my go-to for every project.",
    rating: 5,
  },
];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/testimonials`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          setTestimonials(staticTestimonials as any);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setTestimonials(staticTestimonials as any);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Client Reviews & Testimonials | Shavi Homes"
        description="Read real reviews from over 400 satisfied clients. Discover why Shavi Homes is the highest-rated general contractor in Calgary for residential and commercial builds."
        url="/testimonials"
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-heading overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)`,
        }} />
        <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Client Stories</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mt-3 mb-6">
              Trusted by 400+ Calgary Clients
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Real stories from homeowners and business owners who built with Shavi Homes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 shadow-sm border border-border hover-lift h-full flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-primary text-primary' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-alt">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Join Our Growing List of Happy Clients</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Your success story starts with a free consultation.
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

export default TestimonialsPage;
