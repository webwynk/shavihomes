import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Mail, Phone, Calendar, 
  Briefcase, DollarSign, MessageCircle, 
  Globe, User, Send, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Lead {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  type?: string;
  budget?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!lead) return null;

  const handleSendResponse = async () => {
    if (!responseMessage.trim()) {
      toast.error("Please enter a response message.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/consultations/${lead._id}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify({ message: responseMessage })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Response sent successfully!");
        setIsResponding(false);
        setResponseMessage("");
        onClose();
      } else {
        toast.error(data.message || "Failed to send response.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
            onClick={() => {
              if (!isResponding) onClose();
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-white w-full sm:max-w-4xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-[2.5rem] shadow-2xl overflow-y-auto sm:overflow-hidden flex flex-col md:flex-row"
          >
            {/* Global Close Button - Always visible at top right */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white sm:text-slate-300 hover:text-white sm:hover:text-slate-600 bg-black/20 sm:bg-transparent hover:bg-black/40 sm:hover:bg-slate-50 rounded-full z-[110] backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Left Sidebar - Identity & Core Info */}
            <div className="md:w-1/3 bg-[#1E3A8A] p-6 sm:p-8 text-white flex flex-col items-center text-center relative shrink-0">
               <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/20 mb-4 sm:mb-6 shadow-xl">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
               </div>
               
               <h3 className="text-xl sm:text-2xl font-heading font-extrabold leading-tight mb-2 text-white px-4">
                  {lead.name}
               </h3>
               <span className="px-3 py-1 bg-blue-500/30 border border-white/10 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#93C5FD] mb-6 sm:mb-8">
                  Verified Prospect
               </span>

               <div className="w-full space-y-3 sm:space-y-4 text-left">
                  <div className="group">
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 ml-1 group-hover:text-white/60 transition-colors">Primary Email</p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl sm:rounded-2xl flex items-center gap-3 transition-all">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-[11px] sm:text-xs font-semibold truncate">{lead.email || "—"}</span>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 ml-1 group-hover:text-white/60 transition-colors">Phone Number</p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl sm:rounded-2xl flex items-center gap-3 transition-all">
                      <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-[11px] sm:text-xs font-semibold">{lead.phone || "—"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-1 gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-white/10 text-white shrink-0">
                           <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-[8px] sm:text-[9px] font-bold text-white/40 uppercase">Sector</p>
                          <p className="text-[10px] sm:text-xs font-bold text-white truncate">{lead.type || 'Standard'}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-white/10 text-white shrink-0">
                           <DollarSign className="w-4 h-4" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-[8px] sm:text-[9px] font-bold text-white/40 uppercase">Budget</p>
                          <p className="text-[10px] sm:text-xs font-bold text-white truncate">{lead.budget || 'N/A'}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Main Panel - Timeline & Content */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col min-w-0 bg-white">
               <div className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                     <div className="flex-1 min-w-[140px] flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                        <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                           <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Submited On</p>
                           <p className="text-[10px] sm:text-xs font-bold text-slate-700">{new Date(lead.createdAt).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <div className="flex-1 min-w-[140px] flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                        <Globe className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                           <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Source Path</p>
                           <p className="text-[10px] sm:text-xs font-bold text-slate-700 truncate max-w-[80px] sm:max-w-none">{lead.source || 'Website Home'}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 text-slate-800">
                           <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                           <h4 className="font-heading font-extrabold text-base sm:text-lg">
                              {isResponding ? "Compose Email Response" : "Inquiry Description"}
                           </h4>
                        </div>
                        {isResponding && (
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              To: {lead.email}
                           </span>
                        )}
                     </div>
                     
                     <div className="flex-1 bg-slate-50/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-dashed border-slate-200 relative overflow-hidden group min-h-[140px] flex flex-col">
                        {!isResponding ? (
                           <>
                              <div className="absolute top-0 left-0 w-1 h-full bg-blue-200 group-hover:bg-blue-500 transition-all" />
                              <p className="text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed italic relative z-10">
                                 {lead.message ? `"${lead.message}"` : "The client has not provided a specific description with this consultation inquiry."}
                              </p>
                              <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 transition-transform group-hover:scale-110">
                                 <MessageCircle className="w-32 h-32 sm:w-48 sm:h-48 text-slate-900" />
                              </div>
                           </>
                        ) : (
                           <div className="flex-1 flex flex-col gap-4 relative z-10">
                              <Textarea 
                                 placeholder="Type your response here..."
                                 className="flex-1 bg-transparent border-none text-slate-700 text-sm focus-visible:ring-0 resize-none p-0 min-h-[120px]"
                                 value={responseMessage}
                                 onChange={(e) => setResponseMessage(e.target.value)}
                                 autoFocus
                              />
                              <div className="text-[10px] text-slate-400 font-medium italic mt-auto">
                                 Tip: The email will be sent from Shavi Homes with your email set as the reply-to.
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                 {!isResponding ? (
                    <>
                       <Button 
                          variant="cta" 
                          disabled={!lead.email}
                          onClick={() => setIsResponding(true)}
                          className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold shadow-xl shadow-blue-500/20 text-white uppercase tracking-widest text-[10px] sm:text-xs disabled:opacity-50 disabled:grayscale transition-all duration-300"
                       >
                          Respond to Client
                       </Button>
                       <Button variant="outline" className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold border-slate-100 text-slate-500 hover:bg-slate-50 uppercase tracking-widest text-[10px] sm:text-xs transition-all duration-300" onClick={onClose}>
                          Done Reviewing
                       </Button>
                    </>
                 ) : (
                    <>
                       <Button 
                          variant="cta" 
                          disabled={isSending || !responseMessage.trim()}
                          onClick={handleSendResponse}
                          className="flex-[2] h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold shadow-xl shadow-orange-500/20 text-white uppercase tracking-widest text-[10px] sm:text-xs flex gap-3 transition-all duration-300"
                       >
                          {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          {isSending ? "Sending..." : "Send Response Email"}
                       </Button>
                       <Button 
                          variant="outline" 
                          disabled={isSending}
                          onClick={() => setIsResponding(false)}
                          className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold border-slate-100 text-slate-500 hover:bg-slate-50 uppercase tracking-widest text-[10px] sm:text-xs transition-all duration-300"
                       >
                          Go Back
                       </Button>
                    </>
                 )}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadDetailModal;
