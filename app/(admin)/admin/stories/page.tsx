"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Star, User } from "lucide-react";
import { motion } from "framer-motion";
import { Story } from "@/lib/appwrite/database";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    university: "",
    content: "",
    rating: 5,
    status: "pending" as "pending" | "approved" | "rejected",
    file: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stories");
      if (!response.ok) throw new Error("Failed to fetch stories");
      const data = await response.json();
      setStories(data.documents || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('program', formData.program);
      formDataToSend.append('university', formData.university);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('status', formData.status);

      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const url = editingStory ? `/api/stories/${editingStory.$id}` : "/api/stories";
      const method = editingStory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to save story");

      await fetchStories();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const response = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete story");
      await fetchStories();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditing = (story: Story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      program: story.program,
      university: story.university,
      content: story.content,
      rating: story.rating,
      status: story.status,
      file: null,
    });
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingStory(null);
    setFormData({
      name: "",
      program: "",
      university: "",
      content: "",
      rating: 5,
      status: "pending",
      file: null,
    });
    setPreviewUrl(null);
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch =
        story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || story.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getImageUrl = (imageId?: string) => {
    if (!imageId) return null;
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/testimonials-media/files/${imageId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&width=200&height=200`;
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
  }

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Student Success Stories</h1>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add New Story
          </motion.button>
        </div>

        {error && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 p-4"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
              <motion.div
                  key={story.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                    {story.imageId ? (
                        <img
                            src={getImageUrl(story.imageId) || ''}
                            alt={story.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.program}</p>
                    <p className="text-xs text-gray-500">{story.university}</p>
                  </div>
                </div>

                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                      <Star
                          key={i}
                          className={`w-4 h-4 ${
                              i < story.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  "{story.content}"
                </p>

                <div className="flex justify-between items-center">
              <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      story.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : story.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {story.status}
              </span>

                  <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEditing(story)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(story.$id!)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={resetForm}
            >
              <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4">
                  {editingStory ? "Edit Success Story" : "Add New Success Story"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Program</label>
                    <input
                        type="text"
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., MSc Computer Science"
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">University</label>
                    <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., University of Toronto"
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student Photo (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {previewUrl && (
                        <div className="mt-2">
                          <img
                              src={previewUrl}
                              alt="Preview"
                              className="h-20 w-20 object-cover rounded-full border border-gray-200"
                          />
                        </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Success Story</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={6}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Share the student's success story..."
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                          <option key={num} value={num}>
                            {num} Star{num !== 1 ? "s" : ""}
                          </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "pending" | "approved" | "rejected" })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingStory ? "Update" : "Create"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
        )}
      </motion.div>
  );
}