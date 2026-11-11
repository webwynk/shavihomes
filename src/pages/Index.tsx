import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import CommercialSection from "@/components/CommercialSection";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Legal Basement & Commercial General Contractor in Calgary"
        description="Shavi Homes is Calgary's premier general contractor for legal basements, secondary suites, and commercial tenant improvements. Expert renovations built to code."
        url="/"
      />
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfter />
      <WhyChooseUs />
      <Process />
      <CommercialSection />
      <Testimonials />
      <SocialProof />
      <FinalCTA />
      <ContactForm />
      <Footer />
      <FloatingButtons />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
