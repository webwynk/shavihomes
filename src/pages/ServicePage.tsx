import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Shield, TrendingUp, ClipboardList } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ServiceGallery from "@/components/ServiceGallery";
import { COMPANY_PHONE, COMPANY_PHONE_TEL } from "@/lib/contact";

import basementImg from "@/assets/basement.webp";
import basementImg2 from "@/assets/service-basement-2.webp";
import basementImg3 from "@/assets/service-basement-3.webp";
import suiteImg from "@/assets/Suite.webp";
import suiteImg2 from "@/assets/service-suite-2.webp";
import suiteImg3 from "@/assets/service-suite-3.webp";
import pharmacyImg from "@/assets/medical.webp";
import pharmacyImg2 from "@/assets/service-pharmacy-2.webp";
import pharmacyImg3 from "@/assets/service-pharmacy-3.webp";
import clinicImg from "@/assets/service-clinic.webp";
import clinicImg2 from "@/assets/service-clinic-2.webp";
import clinicImg3 from "@/assets/service-clinic-3.webp";
import officeImg from "@/assets/service-office.webp";
import officeImg2 from "@/assets/service-office-2.webp";
import officeImg3 from "@/assets/service-office-3.webp";
import spaImg from "@/assets/spa.webp";
import spaImg2 from "@/assets/service-spa-2.webp";
import spaImg3 from "@/assets/service-spa-3.webp";
import commercialImg from "@/assets/service-commercial.webp";
import commercialImg2 from "@/assets/service-commercial-2.webp";
import commercialImg3 from "@/assets/service-commercial-3.webp";
import residentialImg from "@/assets/service-residential.webp";
import residentialImg2 from "@/assets/service-residential-2.webp";
import residentialImg3 from "@/assets/service-residential-3.webp";
import maintenanceImg from "@/assets/service-maintenance.webp";
import maintenanceImg2 from "@/assets/service-maintenance-2.webp";
import maintenanceImg3 from "@/assets/service-maintenance-3.webp";
import duplexHomesImg from "@/assets/service-duplex-homes.webp";
import garageSuiteImg from "@/assets/service-garage-suite.webp";

const serviceData: Record<string, {
  title: string;
  images: string[];
  problem: string;
  solution: string;
  steps: string[];
  compliance: string;
  results: string;
}> = {
  "legal-basement": {
    title: "Legal Basement Construction",
    images: [basementImg, basementImg2, basementImg3],
    problem: "Most homeowners want to develop their basements but face confusing permit processes, code requirements, and the risk of costly rework if inspections fail. Unlicensed contractors often cut corners, leaving homeowners with illegal suites that can't be rented.",
    solution: "Shavi Homes handles the entire process — from permit applications to final inspection. We design and build basements that meet every Calgary building code requirement, ensuring you pass inspection on the first try.",
    steps: ["Free site assessment & feasibility check", "Custom design with permit-ready drawings", "Permit submission & approval management", "Full construction with milestone updates", "Final inspection & code-compliant handover"],
    compliance: "All work meets Calgary's Safety Codes Act, Alberta Building Code, and local zoning bylaws. We handle separate entrance requirements, egress windows, fire separation, HVAC, plumbing, and electrical to code.",
    results: "Homeowners typically see $1,500–$2,000+/month in rental income and a $80K–$120K increase in property value. Your legal basement becomes a genuine income-generating asset.",
  },
  "secondary-suite": {
    title: "Secondary Suite Development",
    images: [suiteImg, suiteImg2, suiteImg3],
    problem: "Building a secondary suite involves navigating complex zoning bylaws, minimum size requirements, and safety regulations. Many contractors lack experience with the specific compliance needs of legal secondary suites.",
    solution: "We specialize in secondary suites designed to maximize rental income while meeting all legal requirements. Every suite features separate entrance, full kitchen, bathroom, and living space — built for long-term tenant comfort.",
    steps: ["Zoning & feasibility review", "Suite design optimized for rental ROI", "Permit applications & approvals", "Construction with quality checkpoints", "Final inspection & tenant-ready handover"],
    compliance: "Full compliance with Calgary's secondary suite regulations including minimum ceiling heights, egress requirements, fire separation, sound insulation, and parking provisions.",
    results: "Our secondary suites generate consistent rental income and significantly increase your property's market value. Most clients see full ROI within 3–5 years.",
  },
  "backyard-suite": {
    title: "Backyard Suite",
    images: [suiteImg2, suiteImg, suiteImg3],
    problem: "Finding space for growing families or generating rental income without a basement can be difficult. Traditional extensions can be disruptive and limited by existing structure.",
    solution: "Our Backyard Suites (Garden Suites) provide a completely detached, luxury living space. We handle everything from site preparation and utility connections to premium interior finishing.",
    steps: ["Lot feasibility & setback analysis", "Custom architectural suite design", "Utility connection & foundation prep", "Precision construction with minimal disruption", "Final inspection & handover"],
    compliance: "Strict adherence to Calgary's Backyard Suite bylaws, including height restrictions, site coverage limits, and fire safety protocols for detached structures.",
    results: "Create a private oasis for family or a high-demand rental property that adds significant footprint and value to your home.",
  },
  "new-construction": {
    title: "New Home Construction",
    images: [residentialImg, residentialImg2, residentialImg3],
    problem: "The custom home building process is often plagued by budget overruns, poor communication, and delays that keep families out of their homes longer than expected.",
    solution: "Building with Shavi Homes means a transparent, guided journey. We combine innovative design with project management excellence to deliver a home that's uniquely yours, on time.",
    steps: ["Architectural consultation & visioning", "Detailed budgeting & specification", "Construction phase with regular site tours", "Quality assurance & final walkthrough", "Warranty enrollment & move-in"],
    compliance: "Built to exceed National Building Code standards with high-performance energy efficiency and premium structural integrity.",
    results: "A legacy home built to last generations, with every detail tailored to your lifestyle and future needs.",
  },
  "extension-suite": {
    title: "Extension Suite",
    images: [residentialImg2, residentialImg, residentialImg3],
    problem: "Homeowners often outgrow their space but don't want to leave their neighborhood. Finding a way to add square footage that blends seamlessly with the original home is a major challenge.",
    solution: "We design and build extensions that look like they were always part of your home. Whether it's a primary suite addition or a multi-room expansion, we ensure structural and aesthetic harmony.",
    steps: ["Structural assessment of existing home", "Seamless architectural integration design", "Permit & structural engineering", "Phased construction to minimize living impact", "Interior finishing & integration"],
    compliance: "Ensuring all new additions meet current structural loads, fire separation codes, and energy standards while harmonizing with existing systems.",
    results: "Increased living space and property value without the stress of moving, tailored perfectly to your evolving needs.",
  },
  "duplex-homes": {
    title: "Duplex Homes",
    images: [duplexHomesImg, residentialImg2, residentialImg3],
    problem: "Building a single-family home on a lot zoned for higher density leaves money on the table. Duplex construction requires party-wall detailing, dual utility servicing, and title separation that many builders aren't equipped to handle.",
    solution: "We design and build side-by-side duplexes that maximize your lot's potential — two fully independent homes with separate entrances, utilities, and titles, each finished to the same quality standard as our custom homes.",
    steps: ["Lot feasibility & subdivision/title review", "Duplex architectural design & engineering", "Permit submission for both units", "Parallel construction with shared efficiencies", "Final inspections & dual handover"],
    compliance: "Full compliance with Calgary zoning bylaws for duplex/semi-detached dwellings, party wall fire separation requirements, and Alberta Building Code standards for multi-unit residential.",
    results: "Two income-generating or resale-ready homes on one lot — clients typically see stronger returns than a single-family build on the same land.",
  },
  "garage-suite": {
    title: "Garage Suite",
    images: [garageSuiteImg, suiteImg3, suiteImg2],
    problem: "Underutilized garage space is a missed opportunity for rental income or guest housing. Converting or building above a garage requires specialized structural and utility planning.",
    solution: "We transform or rebuild garages into functional, modern living suites. Our designs prioritize privacy and efficient use of space, creating a versatile asset above your parking.",
    steps: ["Structural load & height analysis", "Utility routing (water, sewer, gas)", "Custom suite design above or replacing garage", "Construction with street-access planning", "Final code compliance check"],
    compliance: "Compliance with municipal garage suite regulations, including parking minimums, entrance heights, and utility separation requirements.",
    results: "Turn your parking space into a dual-purpose asset: secure vehicle storage with a high-value rental unit above.",
  },
  "custom-homes": {
    title: "Custom Homes",
    images: [residentialImg, residentialImg2, residentialImg3],
    problem: "Homeowners with a unique vision often struggle to find builders who can execute custom designs without compromising on quality or blowing the budget.",
    solution: "We build fully custom homes from the ground up, working closely with homeowners and architects to bring one-of-a-kind designs to life with premium materials and craftsmanship.",
    steps: ["Vision & design consultation", "Custom architectural drawings & engineering", "Permit applications & approvals", "Construction with dedicated project management", "Final walkthrough & warranty handover"],
    compliance: "Built to Alberta Building Code and Calgary zoning requirements, with energy efficiency and structural standards exceeding minimum code.",
    results: "A home built exactly to your specifications — no compromises, no cookie-cutter layouts, just a home that reflects how you actually live.",
  },
  "modern-four-plex": {
    title: "Modern Four Plex",
    images: [residentialImg2, duplexHomesImg, residentialImg],
    problem: "Four-plex developments require careful unit layout, shared-wall fire separation, and parking/utility planning that can quickly become complex without experienced guidance.",
    solution: "We design and build modern four-plex properties — four fully independent units with contemporary finishes, optimized for both livability and strong rental or resale returns.",
    steps: ["Site & zoning feasibility for multi-unit", "Four-unit architectural design", "Permit coordination for multi-family build", "Phased construction across all units", "Final inspections & unit-by-unit handover"],
    compliance: "Full compliance with Calgary's multi-family zoning bylaws, fire separation between units, parking requirements, and Alberta Building Code for multi-unit residential.",
    results: "Four modern, independently titled or rented units on one property — a high-density asset built for strong long-term returns.",
  },
  "townhouse-four-plex": {
    title: "Town House Four Plex",
    images: [residentialImg3, duplexHomesImg, residentialImg2],
    problem: "Townhouse-style four-plex builds need multi-level unit planning, shared party walls, and individual entrances — details that are easy to get wrong without dedicated multi-family experience.",
    solution: "We build townhouse-style four-plexes with private entrances, multi-level layouts, and quality finishes in each unit, giving every owner or tenant a home that feels fully their own.",
    steps: ["Layout planning for 4 townhouse units", "Multi-level architectural & structural design", "Permit submission & approvals", "Construction with unit-level quality control", "Final inspection & staggered handover"],
    compliance: "Meets Calgary townhouse zoning bylaws, party wall fire code, individual utility metering standards, and Alberta Building Code.",
    results: "A row of four private, multi-level townhomes that command premium rents or sale prices thanks to their house-like feel.",
  },
  "row-homes": {
    title: "Row Homes",
    images: [duplexHomesImg, residentialImg, residentialImg3],
    problem: "Row home construction demands precise alignment across multiple attached units, consistent structural detailing, and efficient sequencing to keep the whole project on schedule.",
    solution: "We deliver row home developments with consistent quality across every unit, streamlined construction sequencing, and designs that balance individuality with efficient shared-wall construction.",
    steps: ["Row layout & site planning", "Unit design with shared-wall engineering", "Permit approvals for the full row", "Sequential construction across units", "Final inspections & handover per unit"],
    compliance: "Compliance with Calgary row housing zoning bylaws, fire separation between units, and Alberta Building Code structural standards.",
    results: "A cohesive row of quality-built homes delivered efficiently, with each unit ready for sale or rental on schedule.",
  },
  "detached-houses": {
    title: "Detached Houses",
    images: [residentialImg, residentialImg3, residentialImg2],
    problem: "Buyers and investors looking for a standalone home want privacy and full lot ownership, but standard builders often default to generic layouts that don't maximize the lot.",
    solution: "We build fully detached single-family homes designed around your lot's orientation, privacy needs, and lifestyle — from foundation to final finishes.",
    steps: ["Lot assessment & orientation planning", "Custom detached home design", "Permit applications & approvals", "Full construction with quality checkpoints", "Final walkthrough & handover"],
    compliance: "Built to Alberta Building Code, Calgary single-family zoning bylaws, and energy efficiency requirements.",
    results: "A private, standalone home built to last — full ownership of your lot with no shared walls.",
  },
  "attached-homes": {
    title: "Attached Homes",
    images: [residentialImg3, residentialImg, duplexHomesImg],
    problem: "Attached / semi-detached homes need to balance cost-efficient shared-wall construction with privacy and sound insulation that homeowners expect from a standalone house.",
    solution: "We build attached and semi-detached homes with high-performance sound insulation and fire separation between units, so each side lives like a fully private home.",
    steps: ["Site & shared-wall feasibility review", "Design with acoustic & privacy focus", "Permit submission & approvals", "Construction with party-wall quality control", "Final inspection & handover"],
    compliance: "Full compliance with Calgary semi-detached zoning bylaws, party wall fire separation, sound transmission standards, and Alberta Building Code.",
    results: "An attached home that feels fully private, built at a lower cost per square foot than a detached equivalent.",
  },
  "pharmacy": {
    title: "Pharmacy Construction",
    images: [pharmacyImg, pharmacyImg2, pharmacyImg3],
    problem: "Pharmacy construction requires specialized knowledge of regulatory layouts, controlled substance storage, accessibility standards, and Alberta College of Pharmacy requirements — most general contractors lack this expertise.",
    solution: "We build purpose-designed pharmacies that meet every regulatory requirement from day one. Our team understands the specific needs of pharmaceutical retail and clinical pharmacy spaces.",
    steps: ["Regulatory consultation & space planning", "Design meeting all pharmacy standards", "Permit & licensing coordination", "Construction with minimal disruption", "Final handover with compliance documentation"],
    compliance: "All builds meet Alberta College of Pharmacy standards, Health Canada requirements, accessibility codes, and local building regulations.",
    results: "Our pharmacy builds open on schedule, pass all inspections, and provide optimized patient flow and staff efficiency from day one.",
  },
  "medical-clinic": {
    title: "Medical Clinic Construction",
    images: [clinicImg, clinicImg2, clinicImg3],
    problem: "Healthcare facilities require precise attention to patient flow, infection control, accessibility, and privacy regulations. Poor construction planning leads to operational inefficiencies and compliance issues.",
    solution: "We design and build medical clinics that prioritize patient experience, staff workflow, and regulatory compliance. From single-practitioner offices to multi-specialty clinics.",
    steps: ["Healthcare space planning consultation", "Clinical design with patient flow optimization", "Regulatory approvals & permits", "Construction with infection control protocols", "Commissioning & compliance verification"],
    compliance: "Full compliance with Alberta Health Services requirements, AODA accessibility standards, infection prevention guidelines, and privacy regulations for medical records.",
    results: "Our clinics operate efficiently from opening day with optimized patient flow, satisfied staff, and zero compliance concerns.",
  },
  "office": {
    title: "Office Construction",
    images: [officeImg, officeImg2, officeImg3],
    problem: "Modern offices need to balance open collaboration spaces with focused work areas, integrate technology infrastructure, and meet evolving workplace expectations — all while staying on budget.",
    solution: "We create modern workspaces engineered for productivity. Our office builds integrate smart technology, flexible layouts, and premium finishes that attract and retain top talent.",
    steps: ["Workspace needs assessment", "Design for productivity & collaboration", "Technology infrastructure planning", "Phased construction (minimal disruption)", "Final fit-out & move-in coordination"],
    compliance: "All office builds meet commercial building codes, fire safety requirements, accessibility standards, and energy efficiency regulations.",
    results: "Our office spaces improve employee satisfaction, reduce operational costs, and project the professional image your business deserves.",
  },
  "spa-wellness": {
    title: "Spa & Wellness Buildouts",
    images: [spaImg, spaImg2, spaImg3],
    problem: "Wellness spaces require specialized plumbing, ventilation, moisture control, and ambiance engineering that most contractors simply don't understand. Poor construction leads to maintenance nightmares.",
    solution: "We build luxurious spa and wellness environments with proper moisture management, ventilation systems, and premium finishes that create an unforgettable client experience.",
    steps: ["Wellness space consultation", "Ambiance-focused design & material selection", "Specialized MEP engineering", "Construction with quality-controlled finishes", "Final inspection & environment testing"],
    compliance: "All builds meet health and safety codes, commercial plumbing requirements, ventilation standards, and accessibility regulations specific to wellness facilities.",
    results: "Our spa builds deliver the premium client experience that drives repeat bookings and positive reviews — built to last with minimal maintenance.",
  },
  "day-care": {
    title: "Day Care Construction",
    images: [commercialImg, commercialImg2, commercialImg3],
    problem: "Childcare facilities face some of the strictest safety, sanitary, and space-usage regulations. Inadequate design can lead to license denials and safety risks.",
    solution: "We build safe, inspiring, and fully compliant day care centers. From rubberized flooring to specific washroom heights, we handle every detail required for provincial childcare licensing.",
    steps: ["Licensing requirement audit", "Kid-safe design & material selection", "Indoor/Outdoor flow planning", "Specialized MEP & safety systems", "Final licensing inspection support"],
    compliance: "Total compliance with provincial childcare licensing regulations, fire safety for children's spaces, and sanitary standards.",
    results: "A vibrant, safe environment that passes licensing inspections with flying colors and provides peace of mind for parents.",
  },
  "restaurant": {
    title: "Restaurant Construction",
    images: [commercialImg2, commercialImg, commercialImg3],
    problem: "High-performance kitchens, complex grease trap requirements, and specific ventilation needs make restaurant builds technically challenging and prone to delays.",
    solution: "Shavi Homes specializes in high-efficiency restaurant buildouts. We coordinate kitchen equipment, professional ventilation (HVAC), and front-of-house aesthetics to create a seamless dining environment.",
    steps: ["Kitchen workflow & MEP design", "Health department permit coordination", "Interior brand integration", "Kitchen equipment installation & testing", "Fire suppression & final safety checks"],
    compliance: "Meeting all health department codes, fire suppression (Ansul system) requirements, and specialized commercial plumbing/ventilation standards.",
    results: "A turnkey restaurant space ready for opening night, optimized for peak service and food safety.",
  },
  "pubs": {
    title: "Pub & Bar Construction",
    images: [commercialImg3, commercialImg2, commercialImg],
    problem: "Pubs require specialized beverage systems, acoustic management, and durable finishes that can withstand high traffic and specialized lighting/audio needs.",
    solution: "We build social spaces with character and durability. From custom bar millwork to advanced draft lines and sound systems, we create environments that keep customers coming back.",
    steps: ["Bar layout & ergonomics", "Draft/Beverage system integration", "Acoustic & lighting design", "Durable commercial finish selection", "AGLC compliance coordination"],
    compliance: "Adherence to AGLC regulations, occupancy safety codes, sound attenuation standards, and commercial kitchen/bar health codes.",
    results: "A high-atmosphere, durable social venue that balances aesthetic appeal with operational efficiency.",
  },
  "food-chain": {
    title: "Food Chain Outlets",
    images: [commercialImg, commercialImg3, commercialImg2],
    problem: "Franchisees need to meet strict corporate brand standards, equipment specs, and tight timelines to start generating revenue as quickly as possible.",
    solution: "We deliver rapid, brand-consistent buildouts for food chains. We work closely with corporate architects and equipment suppliers to ensure every detail matches franchise specifications exactly.",
    steps: ["Corporate brand standard review", "Aggressive timeline scheduling", "Franchise equipment coordination", "Multi-location project management", "Final corporate handover"],
    compliance: "Meeting both local building codes and strict corporate brand/health safety standards.",
    results: "Fast-track construction that gets your outlet operational on schedule, perfectly reflecting your brand's international or national standards.",
  },
  "commercial": {
    title: "Commercial Construction",
    images: [commercialImg, commercialImg2, commercialImg3],
    problem: "Commercial projects demand strict timelines, complex permitting, multi-trade coordination, and compliance with commercial building codes. Delays and cost overruns are the norm with inexperienced contractors.",
    solution: "Shavi Homes delivers full-scale commercial construction — from retail stores and restaurants to warehouses and mixed-use developments. We manage every phase from permits to punch list, on time and on budget.",
    steps: ["Commercial feasibility & site assessment", "Architectural design & permit coordination", "Multi-trade scheduling & procurement", "Phased construction with milestone reporting", "Final inspection, commissioning & handover"],
    compliance: "Full compliance with Alberta commercial building codes, fire safety regulations, accessibility standards (AODA), environmental requirements, and municipal zoning bylaws.",
    results: "Our commercial clients open on schedule with zero compliance issues. We've delivered retail, restaurant, and warehouse projects that operate efficiently from day one.",
  },
  "residential": {
    title: "Residential Construction",
    images: [residentialImg, residentialImg2, residentialImg3],
    problem: "Homeowners struggle to find contractors who deliver quality craftsmanship on time and within budget. Poor communication, hidden costs, and subpar finishes are all too common in residential construction.",
    solution: "We build custom homes, renovations, and additions with meticulous attention to detail. Every project includes transparent pricing, regular updates, and finishes that exceed expectations.",
    steps: ["In-home consultation & design vision", "Custom architectural plans & budgeting", "Permit applications & approvals", "Construction with weekly progress updates", "Final walkthrough & quality-assured handover"],
    compliance: "All residential work meets Alberta Building Code, energy efficiency standards, Calgary zoning bylaws, and safety codes. We handle all permits and inspections.",
    results: "Our homeowners love their spaces — beautifully crafted homes built to last, on budget, and completed when promised. Average client satisfaction rating: 4.9/5.",
  },
  "maintenance": {
    title: "Maintenance Services",
    images: [maintenanceImg, maintenanceImg2, maintenanceImg3],
    problem: "Property owners struggle to find reliable, skilled maintenance providers who respond quickly and deliver quality work. Unresolved maintenance issues lead to costly repairs, tenant complaints, and property value decline.",
    solution: "Shavi Homes offers comprehensive maintenance services for both residential and commercial properties. From routine HVAC servicing and plumbing repairs to electrical work and general upkeep — we keep your property running smoothly year-round.",
    steps: ["Maintenance request & priority assessment", "Scheduled site visit & diagnosis", "Transparent quote & approval", "Professional repair or service", "Quality check & preventive recommendations"],
    compliance: "All maintenance work meets Alberta Safety Codes, electrical and plumbing regulations, and HVAC industry standards. Our licensed technicians are fully insured and certified.",
    results: "Our maintenance clients enjoy fewer emergency repairs, longer equipment lifespans, and happier tenants. Properties under our care maintain peak condition and higher market value.",
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { icon: ClipboardList, title: "The Problem", content: service.problem },
    { icon: CheckCircle, title: "Our Solution", content: service.solution },
    { icon: Shield, title: "Compliance & Safety", content: service.compliance },
    { icon: TrendingUp, title: "Results & ROI", content: service.results },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-heading/70" />
        </div>
        <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              </motion.div>
            ))}

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Our Process</h2>
              <div className="space-y-4">
                {service.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                    <p className="text-foreground font-medium pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ServiceGallery images={service.images} title={service.title} interval={2000} />
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <div>
            <div className="sticky top-24 bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Get a free consultation and custom plan for your {service.title.toLowerCase()} project.
              </p>
              <Button variant="cta" className="w-full py-6 text-base mb-3" asChild>
                <a href={`/contact?service=${encodeURIComponent(service.title)}`}>Book Consultation</a>
              </Button>
              <Button variant="ctaOutline" className="w-full py-5" asChild>
                <a href={COMPANY_PHONE_TEL}>Call {COMPANY_PHONE}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ServicePage;
