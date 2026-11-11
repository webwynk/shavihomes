import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from "@/components/admin/Sidebar";
import LeadDetailModal from "@/components/admin/LeadDetailModal";
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

const projectTypes = [
  "Legal Basement",
  "Secondary Suite",
  "Pharmacy",
  "Medical Clinic",
  "Office",
  "Spa & Wellness",
];

const LeadsPage = () => {
  const [leads, setLeads] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Consultation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const leadsPerPage = 8;
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
      toast.error("Could not load leads.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the lead for "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/consultations/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (response.ok) {
        setLeads(leads.filter(lead => lead._id !== id));
        toast.success("Lead deleted successfully.");
      } else {
        toast.error("Failed to delete lead.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not reach the server.");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/consultations/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
        toast.success(`Lead marked as ${newStatus}`);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Could not update status.");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["Name", "Email", "Phone", "Project Type", "Budget", "Source", "Date"];
    const csvRows = [
      headers.join(","),
      ...leads.map(lead => [
        `"${lead.name}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.type || 'General'}"`,
        `"${lead.budget || ''}"`,
        `"${lead.source || 'Direct'}"`,
        `"${new Date(lead.createdAt).toLocaleDateString()}"`
      ].join(","))
    ];
    
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `shavi_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export sequence completed!");
  };

  const openLeadDetails = (lead: Consultation) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const filteredLeads = leads.filter(
    (lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm);
      
      const matchesType = 
        selectedType === "All Types" || lead.type === selectedType;
      
      return matchesSearch && matchesType;
    }
  );

  // Pagination Logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F0F5FF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto w-full overflow-hidden">
          <header className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-extrabold text-[#1E3A8A] pb-1 lg:pb-2 inline-block uppercase">CONSULTATIONS</h1>
              <p className="text-slate-500 font-semibold mt-1 text-sm lg:text-base">Found {filteredLeads.length} total records.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="h-10 lg:h-14 px-4 lg:px-8 rounded-xl lg:rounded-2xl border-blue-200 bg-white font-bold text-blue-700 shadow-sm hover:shadow-md transition-all gap-2 lg:gap-3 text-xs lg:text-sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 lg:w-5 lg:h-5 text-[#3B82F6]" /> <span className="hidden sm:inline">DOWNLOAD CSV</span> <span className="sm:hidden">CSV</span>
              </Button>
            </div>
          </header>

          {/* Search & Filters */}
          <div className="bg-white p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-blue-100 shadow-sm mb-6 lg:mb-8 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 lg:gap-8">
            <div className="relative w-full max-w-xl">
              <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-blue-300" />
              <Input 
                placeholder="Search clients..." 
                className="h-12 lg:h-14 pl-12 lg:pl-14 rounded-xl lg:rounded-2xl bg-blue-50/50 border-blue-100 focus:bg-white focus:ring-blue-200 transition-all text-sm lg:text-base font-medium placeholder:text-blue-300"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center min-w-[300px]">
               <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg whitespace-nowrap w-fit">Filter By Sector:</span>
               <select
                 value={selectedType}
                 onChange={(e) => {
                   setSelectedType(e.target.value);
                   setCurrentPage(1);
                 }}
                 className="h-12 lg:h-14 px-4 lg:px-6 rounded-xl lg:rounded-2xl border border-blue-100 bg-blue-50/50 font-bold text-blue-700 transition-all focus:ring-blue-200 appearance-none bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-no-repeat bg-[right_1rem_lg:right_1.5rem_center] cursor-pointer text-sm lg:text-base"
               >
                 <option value="All Types">All Categories</option>
                 {projectTypes.map((type) => (
                   <option key={type} value={type}>{type}</option>
                 ))}
                 <option value="General">Other / General</option>
               </select>
            </div>
          </div>

          {/* Full Table */}
          <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 lg:pl-12">CLIENT NAME</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">PROJECT CATEGORY</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DATE</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">BUDGET</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">STATUS</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8 lg:pl-12">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(leadsPerPage).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="p-8 lg:p-10" />
                      </tr>
                    ))
                  ) : currentLeads.length > 0 ? (
                    currentLeads.map((lead, i) => (
                      <motion.tr 
                        key={lead._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-slate-50/50 transition-all group"
                      >
                        <td className="px-6 lg:px-10 py-4 lg:py-6 pl-8 lg:pl-12">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs lg:text-sm shadow-sm">
                              {lead.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="max-w-[150px] lg:max-w-none">
                              <p className="font-bold text-slate-800 text-xs lg:text-sm truncate">{lead.name}</p>
                              <p className="text-[9px] lg:text-[10px] text-slate-400 font-medium truncate">{lead.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 text-xs lg:text-sm text-slate-500 font-medium">
                          {lead.type || 'Standard Suite'}
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 text-xs lg:text-sm text-slate-500 font-medium">
                          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 text-xs lg:text-sm font-bold text-slate-900">
                          {lead.budget || '$0.00'}
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6">
                          <select
                            value={lead.status || 'Pending'}
                            onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                            className={cn(
                              "px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer outline-none appearance-none bg-no-repeat bg-[right_0.4rem_center] pr-6 lg:pr-8",
                              lead.status === 'Completed' 
                                ? "bg-green-50 text-green-600 border-green-100" 
                                : "bg-orange-50 text-orange-600 border-orange-100"
                            )}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Done</option>
                          </select>
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 pr-8 lg:pl-12 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openLeadDetails(lead)}
                              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white border border-slate-100 shadow-sm hover:border-blue-300 hover:text-blue-500 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteLead(lead._id, lead.name)}
                              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-16 lg:p-24 text-center">
                        <p className="text-slate-400 font-medium italic text-sm">No matches found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-5 lg:p-8 border-t border-slate-100 bg-white flex items-center justify-between">
                <p className="text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {indexOfFirstLead + 1}-{Math.min(indexOfLastLead, filteredLeads.length)}
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                     size="icon" 
                     className="rounded-lg lg:rounded-xl h-8 lg:h-10 w-8 lg:w-10 border-slate-100 bg-white"
                     disabled={currentPage === 1}
                     onClick={() => paginate(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-lg lg:rounded-xl h-8 lg:h-10 w-8 lg:w-10 border-slate-100 bg-white"
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Status Check UI */}
          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-10 opacity-30 select-none pointer-events-none">
             <div className="flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-900 uppercase">
               <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500" /> Database Synchronized
             </div>
             <div className="flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-900 uppercase">
               <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500" /> CSR Security Active
             </div>
          </div>

          <LeadDetailModal 
            lead={selectedLead} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </main>
      </div>
    </div>
  );
};

export default LeadsPage;
