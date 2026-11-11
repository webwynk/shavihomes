import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "@/lib/contact";
import logo from "../assets/shavi-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-heading text-primary-foreground overflow-hidden">
      {/* Giant brand name */}
      <div className="container-tight px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 border-b border-white/5">
        <div className="select-none mb-12 sm:mb-20">
          <Link to="/" className="block group decoration-none">
            <h2
              className="font-heading font-black uppercase leading-[0.85] tracking-tighter text-[#f5f0e8]"
              style={{
                fontSize: "clamp(5rem, 16vw, 16rem)",
                WebkitTextStroke: "2px rgba(245, 240, 232, 0.15)",
              }}
            >
              <span className="block">
                S<span className="text-primary">H</span>AVI
              </span>
              <span className="block">
                <span className="text-primary">H</span>OMES
              </span>
            </h2>
          </Link>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-tight px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-primary-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "RESIDENTIAL", to: "/services/residential" },
                { label: "LEGAL BASEMENT", to: "/services/legal-basement" },
                { label: "SECONDARY SUITE", to: "/services/secondary-suite" },
                { label: "BACKYARD SUITE", to: "/services/backyard-suite" },
                { label: "MEDICAL CLINIC", to: "/services/medical-clinic" },
                { label: "OFFICE", to: "/services/office" },
                { label: "COMMERCIAL", to: "/services/commercial" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-primary-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "WHY US", to: "/why-us" },
                { label: "PROCESS", to: "/process" },
                { label: "BLOG", to: "/blog" },
                { label: "TESTIMONIALS", to: "/testimonials" },
                { label: "CONTACT", to: "/contact" },
                { label: "PRIVACY POLICY", to: "/privacy-policy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-primary-foreground">
              Socials
            </h4>
            <ul className="space-y-3">
              {[
                {
                  label: "FACEBOOK",
                  href: "https://www.facebook.com/people/Shavi-Homes/61572363000369/",
                },
                {
                  label: "INSTAGRAM",
                  href: "https://www.instagram.com/shavihomes",
                },
                { label: "LINKEDIN", href: "https://linkedin.com/" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href !== "#" ? "_blank" : undefined}
                    rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase tracking-wide"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-5 text-primary-foreground">
              Studio
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@shavihomes.com"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase tracking-wide"
              >
                INFO@SHAVIHOMES.COM
              </a>
              <a
                href={COMPANY_PHONE_TEL}
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase tracking-wide"
              >
                {COMPANY_PHONE_DISPLAY}
              </a>
              <p className="text-sm text-primary-foreground/60 uppercase tracking-wide leading-relaxed">
                CALGARY, ALBERTA,
                <br />
                CANADA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4 relative text-center sm:text-left">
          <div className="order-2 sm:order-1 space-y-2">
            <p className="text-xs text-primary-foreground/30 uppercase tracking-widest font-medium">
              Copyright © {new Date().getFullYear()} Shavi Homes.
            </p>
            <p className="text-[10px] text-primary-foreground/20 uppercase tracking-[0.1em] font-medium">
              Design & Developed by{" "}
              <a
                href="https://kyptronix.us"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Kyptronix LLP
              </a>
            </p>
          </div>

          <Link
            to="/admin/login"
            className="flex flex-col items-center gap-1.5 group transition-all duration-500 order-1 sm:order-2 px-6"
          >
            <div className="p-2.5 rounded-full bg-white/10 border border-white/10 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all duration-500 shadow-inner">
              <User className="w-4 h-4 text-white group-hover:text-orange-500 transition-all duration-500" />
            </div>
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] transition-all duration-500 translate-y-0.5">
              Admin
            </span>
          </Link>

          <p className="text-xs text-primary-foreground/30 uppercase tracking-widest font-medium order-3">
            ✦ We are{" "}
            <span className="font-bold text-primary-foreground/50">
              Shavi Homes
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
