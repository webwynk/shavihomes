import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  LogOut,
  ChevronRight,
  X,
  MessageSquareQuote,
  BookText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "../../assets/shavi-logo.webp";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Consultations", icon: Users, path: "/admin/leads" },
    { label: "Testimonials", icon: MessageSquareQuote, path: "/admin/testimonials" },
    { label: "Blogs", icon: BookText, path: "/admin/blogs" },
    { label: "My Profile", icon: UserCircle, path: "/admin/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-[80] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-[90] w-64 bg-[#1E3A8A] border-r border-white/10 flex flex-col pt-8 pb-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-6 mb-10 flex items-center justify-between">
          <Link to="/" className="flex flex-col gap-1">
            <img 
              src={logo} 
              alt="Shavi Homes" 
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-black pl-1">Admin Panel</p>
          </Link>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-900/40"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/60 group-hover:text-white")} />
                  <span className={`font-semibold text-sm tracking-tight ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <div className="bg-white/10 rounded-2xl p-4 mb-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse shadow-[0_0_8px_rgba(147,197,253,0.5)]" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Network Active</span>
            </div>
            <p className="text-xs text-white/70 font-medium leading-relaxed">
              Connected to secure gateway.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start gap-3 h-12 rounded-xl bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
