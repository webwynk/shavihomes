import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index.tsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));
const WhyUsPage = lazy(() => import("./pages/WhyUsPage.tsx"));
const ProcessPage = lazy(() => import("./pages/ProcessPage.tsx"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const LoginPage = lazy(() => import("./pages/admin/LoginPage.tsx"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage.tsx"));
const LeadsPage = lazy(() => import("./pages/admin/LeadsPage.tsx"));
const ProfilePage = lazy(() => import("./pages/admin/ProfilePage.tsx"));
const AdminTestimonialsPage = lazy(() => import("./pages/admin/TestimonialsPage.tsx"));
const AdminBlogsPage = lazy(() => import("./pages/admin/BlogsPage.tsx"));
const AdminAuth = lazy(() => import("./pages/admin/AdminAuth.tsx"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/process" element={<ProcessPage />} />

              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminAuth>
                    <DashboardPage />
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/leads"
                element={
                  <AdminAuth>
                    <LeadsPage />
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <AdminAuth>
                    <AdminTestimonialsPage />
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/blogs"
                element={
                  <AdminAuth>
                    <AdminBlogsPage />
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <AdminAuth>
                    <ProfilePage />
                  </AdminAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
