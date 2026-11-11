import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Save,
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from "@/components/admin/Sidebar";
import MobileNav from "@/components/admin/MobileNav";
import { cn, compressImage } from "@/lib/utils";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  status: "Draft" | "Published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "Legal Basement",
  "Investment",
  "Commercial",
  "Day Care",
  "Restaurant",
  "Medical",
  "Office",
  "Wellness",
  "General",
];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts">("all");
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    content: "",
    excerpt: "",
    coverImage: "",
    category: "General",
    status: "Draft" as "Draft" | "Published",
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const increaseFontSize = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const currentSize = document.queryCommandValue("fontSize") || "3";
    const newSize = Math.min(7, parseInt(currentSize) + 1);
    document.execCommand("fontSize", false, newSize.toString());
  };

  const decreaseFontSize = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const currentSize = document.queryCommandValue("fontSize") || "3";
    const newSize = Math.max(1, parseInt(currentSize) - 1);
    document.execCommand("fontSize", false, newSize.toString());
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);
      const formDataUpload = new FormData();
      formDataUpload.append("coverImage", compressedFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
          body: formDataUpload,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url.startsWith('http') ? data.url : `${import.meta.env.VITE_BACKEND_URL || "http://localhost:2155"}${data.url}`;
        
        editorRef.current?.focus();
        document.execCommand("insertImage", false, imageUrl);
        toast.success("Image added to editor!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Could not upload image.");
    }
    e.target.value = "";
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs?limit=100`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBlogs(data.data);
      } else if (response.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Could not load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingBlog ? prev.slug : generateSlug(title),
    }));
  };

  const handleSave = async () => {
    try {
      const finalContent = editorRef.current?.innerHTML || formData.content;
      const payload = { ...formData, content: finalContent };

      const url = editingBlog
        ? `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs/${editingBlog._id}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs`;

      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingBlog ? "Blog updated successfully!" : "Blog created successfully!");
        setIsModalOpen(false);
        setEditingBlog(null);
        resetForm();
        fetchBlogs();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to save blog.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Could not save blog.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog deleted successfully.");
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not delete blog.");
    }
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage,
      category: blog.category,
      status: blog.status,
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      author: "",
      content: "",
      excerpt: "",
      coverImage: "",
      category: "General",
      status: "Draft",
    });
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && blog.status === "Published") ||
      (activeTab === "drafts" && blog.status === "Draft");

    return matchesSearch && matchesTab;
  });

  // Initialize editor content when modal opens
  useEffect(() => {
    if (editorRef.current && isModalOpen) {
      editorRef.current.innerHTML = formData.content || "<p><br></p>";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, editingBlog]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F0F5FF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto w-full overflow-hidden">
          <header className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-extrabold text-[#1E3A8A] pb-1 lg:pb-2 inline-block uppercase">
                BLOGS
              </h1>
              <p className="text-slate-500 font-semibold mt-1 text-sm lg:text-base">
                Manage your blog posts and content.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={openCreateModal}
                className="h-10 lg:h-14 px-4 lg:px-8 rounded-xl lg:rounded-2xl bg-[#1E3A8A] font-bold text-white shadow-sm hover:shadow-md transition-all gap-2 lg:gap-3 text-xs lg:text-sm"
              >
                <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">NEW BLOG</span>
                <span className="sm:hidden">NEW</span>
              </Button>
            </div>
          </header>

          {/* Search & Filters */}
          <div className="bg-white p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-blue-100 shadow-sm mb-6 lg:mb-8 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 lg:gap-8">
            <div className="relative w-full max-w-xl">
              <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-blue-300" />
              <Input
                placeholder="Search blogs..."
                className="h-12 lg:h-14 pl-12 lg:pl-14 rounded-xl lg:rounded-2xl bg-blue-50/50 border-blue-100 focus:bg-white focus:ring-blue-200 transition-all text-sm lg:text-base font-medium placeholder:text-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="flex bg-blue-50 p-1 rounded-xl border border-blue-100">
                {(["all", "published", "drafts"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                      activeTab === tab
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-blue-400 hover:text-blue-600"
                    )}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 lg:pl-12">
                      Blog Post
                    </th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Date
                    </th>
                    <th className="px-6 lg:px-10 py-4 lg:py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8 lg:pl-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="p-8 lg:p-10" />
                        </tr>
                      ))
                  ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, i) => (
                      <motion.tr
                        key={blog._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-slate-50/50 transition-all group"
                      >
                        <td className="px-6 lg:px-10 py-4 lg:py-6 pl-8 lg:pl-12">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                              {blog.coverImage ? (
                                <img
                                  src={blog.coverImage.startsWith('http') ? blog.coverImage : `${import.meta.env.VITE_BACKEND_URL || "http://localhost:2155"}${blog.coverImage}`}
                                  alt={blog.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 text-xs lg:text-sm truncate max-w-[200px] lg:max-w-[300px]">
                                {blog.title}
                              </p>
                              <p className="text-[9px] lg:text-[10px] text-slate-400 font-medium">
                                by {blog.author}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6">
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              blog.status === "Published"
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                            )}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 text-xs lg:text-sm text-slate-500 font-medium">
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 lg:px-10 py-4 lg:py-6 pr-8 lg:pl-12 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditModal(blog)}
                              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white border border-slate-100 shadow-sm hover:border-blue-300 hover:text-blue-500 transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(blog._id, blog.title)}
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
                      <td colSpan={5} className="p-16 lg:p-24 text-center">
                        <p className="text-slate-400 font-medium italic text-sm">
                          No blogs found.
                        </p>
                        <Button
                          onClick={openCreateModal}
                          variant="outline"
                          className="mt-4"
                        >
                          Create your first blog
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[1.5rem] lg:rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 lg:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl lg:text-2xl font-heading font-extrabold text-[#1E3A8A]">
                    {editingBlog ? "Edit Blog" : "Create New Blog"}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {editingBlog ? "Update your blog post" : "Write a new blog post"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBlog(null);
                    resetForm();
                  }}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                {/* Title & Slug Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter blog title"
                      className="h-12 rounded-xl border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Slug
                    </label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="blog-post-slug"
                      className="h-12 rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                {/* Author & Category Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Author
                    </label>
                    <Input
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name"
                      className="h-12 rounded-xl border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as "Draft" | "Published" })
                      }
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                    Cover Image
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://example.com/image.webp or upload below"
                      className="h-12 rounded-xl border-slate-200 flex-1"
                    />
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        try {
                          const compressedFile = await compressImage(file);
                          const formDataUpload = new FormData();
                          formDataUpload.append("coverImage", compressedFile);

                          const response = await fetch(
                            `${import.meta.env.VITE_API_URL || "http://localhost:2155/api"}/blogs/upload`,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                              },
                              body: formDataUpload,
                            }
                          );

                          if (response.ok) {
                            const data = await response.json();
                            setFormData((prev) => ({ ...prev, coverImage: data.url }));
                            toast.success("Image uploaded successfully!");
                          } else {
                            toast.error("Failed to upload image.");
                          }
                        } catch (error) {
                          console.error("Upload error:", error);
                          toast.error("Could not upload image.");
                        }
                      }}
                      className="hidden"
                      id="cover-image-upload"
                    />
                    <label htmlFor="cover-image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 px-4 rounded-xl border-slate-200 cursor-pointer"
                        asChild
                      >
                        <span className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload
                        </span>
                      </Button>
                    </label>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-3 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                      <img
                        src={formData.coverImage.startsWith('http') ? formData.coverImage : `${import.meta.env.VITE_BACKEND_URL || "http://localhost:2155"}${formData.coverImage}`}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary of the blog post..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                    Content
                  </label>
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border border-slate-200 rounded-t-xl">
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("bold", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("italic", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("underline", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("strikeThrough", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={increaseFontSize}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600 font-bold text-xs w-8 h-8 flex items-center justify-center"
                      title="Increase Font Size"
                    >
                      A+
                    </button>
                    <button
                      type="button"
                      onClick={decreaseFontSize}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600 font-bold text-xs w-8 h-8 flex items-center justify-center"
                      title="Decrease Font Size"
                    >
                      A-
                    </button>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("formatBlock", false, "H1")}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Heading 1"
                    >
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("formatBlock", false, "H2")}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Heading 2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("justifyLeft", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("justifyCenter", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("justifyRight", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("insertUnorderedList", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("insertOrderedList", false, undefined)}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editorRef.current && document.execCommand("formatBlock", false, "BLOCKQUOTE")}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt("Enter link URL:");
                        if (url && editorRef.current) {
                          editorRef.current.focus();
                          document.execCommand("createLink", false, url);
                        }
                      }}
                      className="p-2 rounded hover:bg-slate-200 text-slate-600"
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditorImageUpload}
                      className="hidden"
                      id="editor-image-upload"
                    />
                    <label htmlFor="editor-image-upload">
                      <span
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                        title="Upload Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </span>
                    </label>
                  </div>
                  {/* Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const html = (e.target as HTMLDivElement).innerHTML;
                      setFormData((prev) => ({ ...prev, content: html }));
                    }}
                    dir="ltr"
                    className="min-h-[300px] p-4 border-x border-b border-slate-200 rounded-b-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 prose prose-sm max-w-none"
                    style={{ minHeight: "300px" }}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 lg:p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBlog(null);
                    resetForm();
                  }}
                  className="h-12 px-6 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="h-12 px-6 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsPage;
