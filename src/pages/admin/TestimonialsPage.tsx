import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquareQuote, 
  Plus, 
  Trash2, 
  Star, 
  Upload,
  Loader2,
  X,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  createdAt: string;
}

const IMGBB_API_KEY = "31dbe7e054cc80260478a41cf866cbd1";

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    image: ""
  });

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/testimonials`);
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url = editingId 
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/testimonials/${editingId}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/testimonials`;
    
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingId ? "Testimonial updated" : "Testimonial added");
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", role: "", text: "", rating: 5, image: "" });
        fetchTestimonials();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        }
      });
      if (response.ok) {
        toast.success("Deleted successfully");
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      role: t.role,
      text: t.text,
      rating: t.rating,
      image: t.image
    });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F0F5FF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1200px] mx-auto w-full">
          <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-black text-[#1E3A8A] uppercase">Testimonials</h1>
              <p className="text-slate-500 font-medium mt-1">Manage what clients say about Shavi Homes.</p>
            </div>
            <Button 
                onClick={() => {
                    setEditingId(null);
                    setFormData({ name: "", role: "", text: "", rating: 5, image: "" });
                    setIsModalOpen(true);
                }}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-blue-500/20 gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add New Story
            </Button>
          </header>

          {isLoading && testimonials.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <motion.div 
                    key={t._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-sm relative group flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 italic flex-1">"{t.text}"</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-50" />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(t)} className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(t._id)} className="h-8 w-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {testimonials.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <MessageSquareQuote className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium italic">No testimonials found. Add your first client story!</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl max-w-xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-black text-[#1E3A8A]">{editingId ? 'Edit Story' : 'New Story'}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Client Name</label>
                        <Input 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe"
                            className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Client Role / Project</label>
                        <Input 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            placeholder="Homeowner - Pharmacy"
                            className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Testimonial Content</label>
                    <Textarea 
                        value={formData.text}
                        onChange={(e) => setFormData({...formData, text: e.target.value})}
                        placeholder="Write something beautiful about Shavi Homes..."
                        className="min-h-[120px] rounded-2xl bg-slate-50 border-transparent focus:bg-white resize-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Rating (1-5)</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <span className="font-bold text-[#1E3A8A] bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-sm border border-blue-100">
                                {formData.rating}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Client Image</label>
                        <div className="relative">
                            <input 
                                type="file" 
                                id="avatar-upload" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                            />
                            <label 
                                htmlFor="avatar-upload"
                                className={`flex items-center justify-center gap-2 h-12 rounded-xl border border-dashed border-slate-300 font-bold text-[11px] uppercase tracking-widest cursor-pointer transition-all hover:bg-slate-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {formData.image ? 'Change Photo' : 'Upload Photo'}
                            </label>
                            {formData.image && (
                                <div className="absolute top-1/2 -translate-y-1/2 left-3 w-7 h-7 rounded-full overflow-hidden border border-white shadow-sm pointer-events-none">
                                    <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Button variant="cta" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20" disabled={isLoading || isUploading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingId ? 'Update Story' : 'Publish Story'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTestimonialsPage;
