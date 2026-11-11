import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// Importing images for static blog posts
import blog1Img from "@/assets/service-basement.webp";
import blog2Img from "@/assets/service-suite-2.webp";
import blog3Img from "@/assets/service-pharmacy.webp";
import blog4Img from "@/assets/service-clinic.webp";
import blog5Img from "@/assets/service-office.webp";
import blog6Img from "@/assets/service-spa.webp";

// Static blog posts - these remain unchanged
const staticBlogPosts = [
  {
    _id: "static-1",
    title: "5 Things to Know Before Building a Legal Basement in Calgary",
    excerpt: "Building a legal basement involves more than just construction. From ceiling heights to separate heating, here's what you need to know about Calgary's bylaws.",
    coverImage: blog1Img,
    category: "Legal Basement",
    author: "Shavi Homes Team",
    publishedAt: "2026-03-30",
    slug: "legal-basement-calgary-guide",
  },
  {
    _id: "static-2",
    title: "The ROI of Secondary Suites: How Much Can You Really Earn?",
    excerpt: "Discover how a secondary suite can pay off your mortgage faster and increase your property value by up to 20% in the current Calgary market.",
    coverImage: blog2Img,
    category: "Investment",
    author: "Financial Expert",
    publishedAt: "2026-03-25",
    slug: "secondary-suite-roi-analysis",
  },
  {
    _id: "static-3",
    title: "Designing the Perfect Pharmacy: Compliance & Patient Experience",
    excerpt: "Healthcare construction requires a balance of strict regulatory compliance and a welcoming patient environment. We break down the essentials.",
    coverImage: blog3Img,
    category: "Commercial",
    author: "Architecture Lead",
    publishedAt: "2026-03-18",
    slug: "pharmacy-design-compliance",
  },
  {
    _id: "static-4",
    title: "Why a Professional Medical Clinic Layout Matters for Your Practice",
    excerpt: "Patient flow, privacy, and infection control — a well-designed clinic layout can improve both staff efficiency and patient satisfaction.",
    coverImage: blog4Img,
    category: "Medical",
    author: "Project Manager",
    publishedAt: "2026-03-12",
    slug: "medical-clinic-layout-importance",
  },
  {
    _id: "static-5",
    title: "Modern Office Trends: Creating a Space Your Team Loves",
    excerpt: "From open collaboration zones to quiet pods, see how modern office design is evolving to support hybrid work and team well-being.",
    coverImage: blog5Img,
    category: "Office",
    author: "Design Team",
    publishedAt: "2026-03-05",
    slug: "modern-office-design-trends",
  },
  {
    _id: "static-6",
    title: "The Essentials of Spa & Wellness Center Construction",
    excerpt: "Building a spa requires specialized knowledge in moisture control, premium lighting, and acoustic privacy. Here's how we deliver luxury.",
    coverImage: blog6Img,
    category: "Wellness",
    author: "Shavi Homes Team",
    publishedAt: "2026-02-26",
    slug: "spa-wellness-construction-essentials",
  },
];

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  createdAt?: string;
  status?: string;
}

const BlogPage = () => {
  const [dynamicBlogs, setDynamicBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Combine static and dynamic blogs and sort by date descending (newest first)
  const allBlogs = [...staticBlogPosts, ...dynamicBlogs].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt || 0);
    const dateB = new Date(b.publishedAt || b.createdAt || 0);
    return dateB.getTime() - dateA.getTime();
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs?limit=100`
        );
        const data = await response.json();
        if (response.ok) {
          // Prepend API base URL to cover images if they're relative paths
          const blogs = data.data.map((blog: Blog) => {
            if (blog.coverImage && blog.coverImage.startsWith("/uploads/")) {
              return { ...blog, coverImage: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:2155"}${blog.coverImage}` };
            }
            return blog;
          });
          setDynamicBlogs(blogs);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // Silent fail - static blogs will still show
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Construction Insights & News | Shavi Homes Blog"
        description="Stay updated with the latest trends in residential and commercial construction, Calgary bylaws, and property investment tips from the Shavi Homes team."
        url="/blog"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-heading overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-foreground/30 rounded-full" />
          <div className="absolute bottom-16 left-1/4 w-6 h-6 border-2 border-primary rounded-full" />
        </div>
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Insights & Guides
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-primary-foreground mb-6"
          >
            Our Latest <span className="gradient-text">Articles</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/70 text-lg max-w-2xl mx-auto"
          >
            Stay updated with the latest trends in residential and commercial construction, regulatory changes in Calgary, and investment tips.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {allBlogs.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover-lift"
              >
                <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-heading/80 backdrop-blur-md text-primary-foreground text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center text-primary font-bold gap-2 group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          )}

          {/* Pagination Placeholder */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding section-alt pt-0">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="bg-heading rounded-[2rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center sm:text-left">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-black text-primary-foreground mb-4">
                  Stay Ahead With Our <span className="text-primary">Insights</span>
                </h2>
                <p className="text-primary-foreground/60 text-lg">
                  Subscribe to our newsletter and get the latest Calgary construction guides delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 flex-1 rounded-xl bg-white/5 border border-white/10 px-6 text-primary-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <Button variant="cta" size="lg" className="h-14 px-8 text-base">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default BlogPage;
