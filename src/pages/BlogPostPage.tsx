import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import serviceBasement from "@/assets/service-basement.webp";
import serviceSuite2 from "@/assets/service-suite-2.webp";
import servicePharmacy from "@/assets/service-pharmacy.webp";
import serviceClinic from "@/assets/service-clinic.webp";
import serviceOffice from "@/assets/service-office.webp";
import serviceSpa from "@/assets/service-spa.webp";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  status: string;
}

// Static blog posts for fallback
const staticBlogPosts: Blog[] = [
  {
    _id: "static-1",
    title: "5 Things to Know Before Building a Legal Basement in Calgary",
    content: `
      <p>Building a legal basement suite is one of the smartest investments a Calgary homeowner can make. Not only does it provide a reliable source of rental income, but it also significantly increases your property's resale value. However, the process is governed by strict municipal bylaws and safety codes that must be followed to its letter.</p>
      
      <h3>1. Separate Heating and Ventilation</h3>
      <p>In Calgary, legal secondary suites must have their own independent heating and ventilation systems. This ensures fire safety and individual climate control for tenants. Most conversions require installing a second furnace or an approved electric heating system.</p>

      <h3>2. Ceiling Height Requirements</h3>
      <p>To be considered legal, your basement must have a minimum ceiling height. Generally, this is 1.95 meters over at least 80% of the floor area. If your ceiling is too low, you may need to excavate the floor—a process known as 'underpinning'—which adds cost but creates a much more premium living space.</p>

      <h3>3. Egress Windows</h3>
      <p>Every bedroom in a legal suite must have at least one 'egress' window. This is a window large enough for an adult to crawl through in case of an emergency. The window must provide an unobstructed opening of a certain size and remain open without additional support.</p>

      <h3>4. Fire Separation</h3>
      <p>You must have a fire-rated barrier between the main home and the secondary suite. This typically involves using specialized drywall (Type X) on the ceilings and walls that separate the two units, along with interconnected smoke and CO alarms.</p>

      <h3>5. Parking Provisions</h3>
      <p>Calgary bylaws often require at least one dedicated off-street parking stall for the secondary suite, in addition to the parking required for the main dwelling. Understanding your specific zoning is crucial before you start construction.</p>
    `,
    coverImage: serviceBasement,
    category: "Legal Basement",
    author: "Shavi Homes Team",
    publishedAt: "2026-03-30T00:00:00.000Z",
    createdAt: "2026-03-30T00:00:00.000Z",
    slug: "legal-basement-calgary-guide",
    excerpt: "Building a legal basement involves more than just construction. From ceiling heights to separate heating, here's what you need to know about Calgary's bylaws.",
    status: "Published"
  },
  {
    _id: "static-2",
    title: "The ROI of Secondary Suites: How Much Can You Really Earn?",
    content: `
      <p>Many homeowners ask: "Is it really worth the $80,000+ investment to build a secondary suite?" When you look at the data for the Calgary market in 2026, the answer is a resounding yes.</p>
      
      <h3>Immediate Cash Flow</h3>
      <p>The average legal one-bedroom secondary suite in Calgary now rents for between $1,400 and $1,700 per month. Even with a financed renovation, the rental income often covers the additional mortgage payments and provides a surplus of $500–$800 monthly.</p>

      <h3>Property Value Increase</h3>
      <p>Appraisal data shows that adding a legal, high-quality secondary suite can increase a property's market value by 15% to 25%. In a $600,000 home, that's an instant equity gain of $90,000 to $150,000.</p>

      <h3>Market Demand</h3>
      <p>Calgary's vacancy rate remains at historic lows. High-quality, legally approved suites are in extremely high demand, often being rented within days of hitting the market. This minimizes vacancy risk for investors.</p>
    `,
    coverImage: serviceSuite2,
    category: "Investment",
    author: "Financial Expert",
    publishedAt: "2026-03-25T00:00:00.000Z",
    createdAt: "2026-03-25T00:00:00.000Z",
    slug: "secondary-suite-roi-analysis",
    excerpt: "Discover how a secondary suite can pay off your mortgage faster and increase your property value by up to 20% in the current Calgary market.",
    status: "Published"
  },
  {
    _id: "static-3",
    title: "Designing the Perfect Pharmacy: Compliance & Patient Experience",
    content: `
      <p>Commercial construction for healthcare providers like pharmacies requires a unique blend of retail design psychology and strict medical regulatory compliance. At Shavi Homes, we've refined this process into an art form.</p>
      
      <h3>The Dispensary Workflow</h3>
      <p>The heart of any pharmacy is the dispensary. We design layouts that optimize "the golden triangle"—the path between the pharmacist, the medication storage, and the patient counter. Minimizing steps here translates directly to faster service and fewer errors.</p>

      <h3>Regulatory Storage</h3>
      <p>From narcotics safes to specialized refrigeration for temperature-sensitive biologics, storage must meet Alberta College of Pharmacy standards. We integrate these security and environmental controls seamlessly into the design.</p>

      <h3>Patient Privacy</h3>
      <p>Modern pharmacies are moving toward clinical services. We design private consultation rooms that provide acoustic privacy while remaining accessible and welcoming to patients.</p>
    `,
    coverImage: servicePharmacy,
    category: "Commercial",
    author: "Architecture Lead",
    publishedAt: "2026-03-18T00:00:00.000Z",
    createdAt: "2026-03-18T00:00:00.000Z",
    slug: "pharmacy-design-compliance",
    excerpt: "Healthcare construction requires a balance of strict regulatory compliance and a welcoming patient environment. We break down the essentials.",
    status: "Published"
  },
  {
    _id: "static-4",
    title: "Building Safe Spaces: A Guide to Calgary Day Care Construction",
    content: `
      <p>Opening a day care in Calgary involves meeting some of the most rigorous safety and sanitary standards in the construction industry. At Shavi Homes, we understand that "good enough" isn't an option when it comes to children's safety.</p>
      
      <h3>Licensing and Square Footage</h3>
      <p>Provincial regulations require specific indoor and outdoor square footage per child. We help you maximize your floor plan to accommodate the highest possible enrollment while remaining fully compliant with fire codes and licensing requirements.</p>

      <h3>Kid-Safe Materials</h3>
      <p>From low-VOC paints to microbial-resistant rubberized flooring, we select materials that are both durable and safe for children. We also ensure washroom facilities are designed with child-appropriate heights and safety features.</p>
    `,
    coverImage: serviceClinic,
    category: "Day Care",
    author: "Compliance Specialist",
    publishedAt: "2026-03-12T00:00:00.000Z",
    createdAt: "2026-03-12T00:00:00.000Z",
    slug: "day-care-construction-guide-calgary",
    excerpt: "Opening a day care in Calgary involves meeting rigorous safety and sanitary standards. Here's what you need to know.",
    status: "Published"
  },
  {
    _id: "static-5",
    title: "The Ultimate Restaurant Renovation Checklist for 2026",
    content: `
      <p>A restaurant renovation is a race against time. Every day your doors are closed is a day of lost revenue. Our project management ensures a rapid buildout without sacrificing quality.</p>
      
      <h3>Kitchen Layout and MEP</h3>
      <p>Mechanical, Electrical, and Plumbing (MEP) systems are the lifeblood of a kitchen. We coordinate with commercial kitchen equipment suppliers early to ensure your ventilation, grease traps, and power supply are perfectly positioned.</p>

      <h3>Front-of-House Ambiance</h3>
      <p>While the kitchen is the engine, the dining room is the soul. We use premium lighting, acoustic treatments, and custom millwork to create an atmosphere that perfectly matches your brand's culinary identity.</p>
    `,
    coverImage: serviceOffice,
    category: "Restaurant",
    author: "Design Team",
    publishedAt: "2026-03-05T00:00:00.000Z",
    createdAt: "2026-03-05T00:00:00.000Z",
    slug: "restaurant-renovation-checklist",
    excerpt: "A restaurant renovation is a race against time. Every day your doors are closed is a day of lost revenue. Our project management ensures rapid buildout without sacrificing quality.",
    status: "Published"
  },
  {
    _id: "static-6",
    title: "Scaling Your Food Chain: Brand-Consistent Construction at Speed",
    content: `
      <p>For food chain owners and franchisees, consistency across multiple locations is key to brand loyalty. We specialize in standardized buildouts that deliver the same premium experience from one community to the next.</p>
      
      <h3>Standardized Buildout Packs</h3>
      <p>We work with your corporate architects to create standardized material and finish packages. This allows us to source materials in bulk and reduce construction timelines for every new outlet.</p>
    `,
    coverImage: serviceSpa,
    category: "Commercial",
    author: "Shavi Homes Team",
    publishedAt: "2026-02-26T00:00:00.000Z",
    createdAt: "2026-02-26T00:00:00.000Z",
    slug: "food-chain-construction-scaling",
    excerpt: "For food chain owners and franchisees, consistency across multiple locations is key to brand loyalty. We specialize in standardized buildouts.",
    status: "Published"
  }
];

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        // First check static posts
        const staticPost = staticBlogPosts.find(p => p.slug === slug);
        if (staticPost) {
          setPost(staticPost as Blog);
          setIsLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs/${slug}`
        );
        const data = await response.json();
        
        if (response.ok && data.success) {
          // Prepend API base URL to cover image if it's a relative path
          const blog = data.data;
          if (blog.coverImage && blog.coverImage.startsWith("/uploads/")) {
            blog.coverImage = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:2155"}${blog.coverImage}`;
          }
          setPost(blog);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-heading overflow-hidden mb-12">
        <div className="container-tight px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <div className="w-px h-4 bg-white/10" />
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                {post.category || "General"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-primary-foreground leading-tight mb-8 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {post.author || "Shavi Homes Team"}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {"5 min read"}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Post Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto" />
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-heading prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-heading prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-heading">Share this article:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                {["Construction", "Calgary", "Real Estate"].map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              {/* CTA */}
              <div className="bg-heading rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <h3 className="text-xl font-bold mb-4 relative z-10 text-primary-foreground">Thinking of Building?</h3>
                <p className="text-primary-foreground/60 text-sm mb-6 relative z-10">
                  Get a free consultation for your project today and build with confidence.
                </p>
                <Button variant="cta" className="w-full py-6 text-base" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>

              {/* Related Posts */}
              <div>
                <h4 className="text-lg font-bold mb-6">Recent Articles</h4>
                <div className="space-y-6">
                  {staticBlogPosts.filter(p => p._id !== post._id).slice(0, 3).map(p => (
                    <Link key={p._id} to={`/blog/${p.slug}`} className="group flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                        <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
                   <FloatingButtons />
      <Footer />
     
    </div>
  );
};

export default BlogPostPage;
