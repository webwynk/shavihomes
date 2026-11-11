import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BookingGraph from "@/components/admin/BookingGraph";
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";
import { cn } from "@/lib/utils";

interface Consultation {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  type?: string;
  budget?: string;
  message?: string;
  source?: string;
  status?: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [leads, setLeads] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/consultations`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setLeads(data.data);
      } else if (response.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Could not load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const stats = [
    { label: "Total Leads", value: leads.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending", value: leads.filter(l => l.status !== 'Completed').length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed", value: leads.filter(l => l.status === 'Completed').length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "New Today", value: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length, icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentLeads = leads.slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F0F5FF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto w-full overflow-hidden">
          <header className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-extrabold text-[#1E3A8A] pb-2 inline-block">Dashboard Overview</h1>
              <p className="text-slate-500 font-medium mt-1 text-sm lg:text-base">Welcome back, Admin. Shavi Homes overview.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline" className="h-10 lg:h-12 rounded-xl border-blue-200 font-semibold text-blue-700 bg-white shadow-sm hover:shadow-md transition-all text-sm px-4">
                <Link to="/admin/leads">View Reports</Link>
              </Button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl border border-blue-100 shadow-sm flex items-center gap-4 lg:gap-5"
              >
                <div className={cn("w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6 lg:w-7 lg:h-7", stat.color)} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-tight">{stat.label}</p>
                  <p className="text-xl lg:text-2xl font-extrabold text-[#1E3A8A]">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analytics Graph - FULL WIDTH */}
          <section className="bg-white p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5 mb-8 lg:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl lg:rounded-2xl flex items-center justify-center border border-blue-100">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-heading font-extrabold text-[#1E3A8A]">Booking Analytics</h2>
                  <p className="text-xs text-slate-500 font-medium">Daily lead volume performance</p>
                </div>
              </div>
              <div className="flex bg-blue-50 p-1 rounded-xl border border-blue-100 w-fit">
                <button className="px-4 py-1.5 text-xs font-bold bg-white text-blue-700 rounded-lg shadow-sm">Daily</button>
                <button className="px-4 py-1.5 text-xs font-bold text-blue-400 hover:text-blue-600 transition-colors">Weekly</button>
              </div>
            </div>
            <div className="w-full">
              <BookingGraph data={leads} />
            </div>
          </section>

          {/* Recent Leads Preview */}
          <section className="bg-white p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl lg:rounded-2xl flex items-center justify-center border border-blue-100">
                  < Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-heading font-extrabold text-[#1E3A8A]">Recent Leads</h2>
                  <p className="text-xs text-slate-500 font-medium">Last 3 submissions</p>
                </div>
              </div>
              <Button asChild variant="ghost" className="text-[#3B82F6] font-bold hover:bg-blue-50 gap-2 text-xs h-9 px-3">
                <Link to="/admin/leads">
                  Manage All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-20 lg:h-24 bg-slate-50 rounded-2xl lg:rounded-3xl animate-pulse" />
                ))
              ) : recentLeads.length > 0 ? (
                recentLeads.map((lead, i) => (
                  <motion.div
                    key={lead._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-50 p-4 lg:p-5 rounded-2xl lg:rounded-3xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all cursor-pointer group border border-transparent"
                  >
                    <div className="flex items-center gap-4 lg:gap-5">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl border border-slate-200 flex items-center justify-center text-lg lg:text-xl font-extrabold text-slate-400">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm lg:text-lg leading-tight">{lead.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 font-medium">
                          <span className="flex items-center gap-1.5 text-[10px] lg:text-xs text-slate-500 font-medium">
                            <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#3B82F6]" /> {lead.phone || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] lg:text-xs text-slate-500 font-medium">
                            <Mail className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#3B82F6]" /> {lead.email || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block px-6 lg:px-10 border-l border-slate-200 ml-auto mr-4 lg:mr-6">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sector</p>
                      <p className="text-xs lg:text-sm font-bold text-slate-800">{lead.type || 'General'}</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="bg-white border-slate-200 rounded-lg lg:rounded-xl font-bold text-[10px] lg:text-xs h-8 lg:h-10 px-3 lg:px-4">
                      <Link to="/admin/leads">Details</Link>
                    </Button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">No recent leads found.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
