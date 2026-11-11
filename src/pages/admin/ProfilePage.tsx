import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trash2,
  Shield,
  Save,
  Key,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<any>(JSON.parse(localStorage.getItem("admin_user") || "{}"));
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", role: "admin" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/admins`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) setAdmins(data.data);
    } catch (error) {
      console.error("Fetch admins error:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(currentUser),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("admin_user", JSON.stringify(data));
        setCurrentUser(data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("Connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("New admin created!");
        setIsAddingAdmin(false);
        setNewAdmin({ name: "", email: "", password: "", role: "admin" });
        fetchAdmins();
      } else {
        toast.error(data.message || "Failed to create admin.");
      }
    } catch (error) {
      toast.error("Connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F0F5FF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1200px] mx-auto w-full overflow-hidden">
          <header className="mb-8 lg:mb-10">
            <h1 className="text-2xl lg:text-3xl font-heading font-black text-[#1E3A8A] uppercase">System Settings</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm lg:text-base">Manage credentials and administrative team.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* My Profile Section */}
            <section className="space-y-6 lg:space-y-8">
              <div className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-blue-100 shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl lg:rounded-2xl flex items-center justify-center border border-blue-100">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-[#3B82F6]" />
                  </div>
                  <h2 className="text-lg lg:text-xl font-heading font-black text-[#1E3A8A]">Account Profile</h2>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 lg:space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] lg:text-[11px] font-black text-slate-400 tracking-widest uppercase ml-1">Display Name</label>
                    <Input 
                      value={currentUser.name} 
                      onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                      className="h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent focus:bg-white text-sm lg:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] lg:text-[11px] font-black text-slate-400 tracking-widest uppercase ml-1">Email Address</label>
                    <Input 
                      value={currentUser.email} 
                      onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                      className="h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent focus:bg-white text-sm lg:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] lg:text-[11px] font-black text-slate-400 tracking-widest uppercase ml-1">New Password</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})}
                        className="h-12 lg:h-14 pl-12 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent focus:bg-white text-sm lg:text-base"
                      />
                    </div>
                  </div>
                  <Button variant="cta" className="w-full h-12 lg:h-14 rounded-xl lg:rounded-2xl shadow-lg shadow-blue-500/20 font-bold text-sm" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </form>
              </div>
            </section>

            {/* Admin Management Section */}
            <section className="space-y-6 lg:space-y-8">
              <div className="bg-[#1E3A8A] p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4">
                  <Shield className="w-32 h-32 lg:w-40 lg:h-40" />
                </div>
                
                <div className="flex items-center justify-between mb-6 lg:mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center border border-white/20">
                      <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h2 className="text-lg lg:text-xl font-heading font-black text-white">Admins</h2>
                  </div>
                  <Button 
                    onClick={() => setIsAddingAdmin(true)}
                    className="bg-[#3B82F6] hover:bg-blue-400 text-white rounded-xl h-10 w-10 p-0 shadow-lg"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>

                <div className="space-y-3 lg:space-y-4 relative z-10 max-h-[350px] lg:max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <div key={admin._id} className="bg-white/5 border border-white/10 p-4 lg:p-5 rounded-2xl lg:rounded-3xl flex items-center justify-between hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-blue-500/20 flex items-center justify-center font-black text-white text-[10px] lg:text-xs uppercase">
                            {admin.role === 'super-admin' ? 'S' : 'A'}
                          </div>
                          <div>
                            <p className="font-bold text-xs lg:text-sm">{admin.name}</p>
                            <p className="text-[9px] lg:text-[10px] text-white/40 tracking-wider font-medium truncate max-w-[120px] sm:max-w-none">{admin.email}</p>
                          </div>
                        </div>
                        {admin.email !== currentUser.email && (
                          <Button variant="ghost" size="icon" className="hover:bg-red-500/20 text-white/20 hover:text-red-500 h-8 w-8">
                            <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                          </Button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/20 font-medium py-10 italic text-sm">Loading administrative team...</p>
                  )}
                </div>
              </div>

              {/* Add Admin Modal Overlay */}
              <AnimatePresence>
                {isAddingAdmin && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setIsAddingAdmin(false)}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-lg w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center mb-6 lg:mb-8">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-50 rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-blue-100">
                          <Shield className="w-7 h-7 lg:w-8 lg:h-8 text-[#3B82F6]" />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-heading font-black text-[#1E3A8A]">Add New Admin</h2>
                        <p className="text-slate-500 font-medium text-xs lg:text-sm mt-1">Provide secure access to a team member.</p>
                      </div>

                      <form onSubmit={handleCreateAdmin} className="space-y-3 lg:space-y-4">
                        <Input 
                          placeholder="Full Name" 
                          className="h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent text-sm lg:text-base"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                          required 
                        />
                        <Input 
                          type="email" 
                          placeholder="Email Address" 
                          className="h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent text-sm lg:text-base"
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                          required 
                        />
                        <Input 
                          type="password" 
                          placeholder="Secret Password" 
                          className="h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border-transparent text-sm lg:text-base"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                          required 
                        />
                        <div className="flex gap-3 lg:gap-4 mt-6 lg:mt-8">
                          <Button type="button" variant="outline" className="flex-1 h-12 lg:h-14 rounded-xl lg:rounded-2xl font-bold text-sm" onClick={() => setIsAddingAdmin(false)}>Cancel</Button>
                          <Button variant="cta" className="flex-1 h-12 lg:h-14 rounded-xl lg:rounded-2xl font-bold text-sm" disabled={isLoading}>Create User</Button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
