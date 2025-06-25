"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { appwriteConfig, getImageUrl } from "@/utils/appwrite";

interface University {
  $id: string;
  name: string;
  country: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  imageId?: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    intake: "",
    programs: "",
    ranking: "",
    description: "",
    file: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const UNIVERSITY_BUCKET = appwriteConfig.buckets.universities;

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/universities");
      if (!response.ok) throw new Error("Failed to fetch universities");
      const data = await response.json();
      setUniversities(data.documents || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch universities"
      );
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
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("intake", formData.intake);
      formDataToSend.append("programs", formData.programs);
      formDataToSend.append("ranking", formData.ranking);
      formDataToSend.append("description", formData.description);

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const url = editingUniversity
        ? `/api/universities/${editingUniversity.$id}`
        : "/api/universities";
      const method = editingUniversity ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save university");
      }

      await fetchUniversities();
      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save university"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this university?")) return;

    try {
      const response = await fetch(`/api/universities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete university");
      await fetchUniversities();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete university"
      );
    }
  };

  const startEditing = (university: University) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      country: university.country,
      intake: university.intake,
      programs: university.programs,
      ranking: university.ranking,
      description: university.description || "",
      file: null,
    });
    setPreviewUrl(
      university.imageId
        ? getImageUrl(university.imageId, UNIVERSITY_BUCKET, 400, 300)
        : null
    );
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingUniversity(null);
    setFormData({
      name: "",
      country: "",
      intake: "",
      programs: "",
      ranking: "",
      description: "",
      file: null,
    });
    setPreviewUrl(null);
  };

  const getUniversityImageUrl = (imageId?: string) => {
    if (!imageId) return null;
    return getImageUrl(imageId, UNIVERSITY_BUCKET, 400, 300);
  };

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      className="space-y-6 p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Universities Management
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          aria-label="Add new university"
        >
          <Plus size={18} />
          Add New University
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

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search universities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          aria-label="Search universities"
        />
      </div>

      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No universities found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search"
              : "Get started by adding a new university"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredUniversities.map((university, index) => (
            <motion.div
              key={university.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                {university.imageId ? (
                  <Image
                    src={getUniversityImageUrl(university.imageId) || ""}
                    alt={university.name}
                    fill
                    className="object-cover"
                    onError={() => "/placeholder.jpg"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {university.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {university.country}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => startEditing(university)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                      aria-label={`Edit ${university.name}`}
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(university.$id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      aria-label={`Delete ${university.name}`}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Intake:</span>{" "}
                    {university.intake}
                  </p>
                  <p>
                    <span className="font-medium">Programs:</span>{" "}
                    {university.programs}
                  </p>
                  <p>
                    <span className="font-medium">Ranking:</span>{" "}
                    {university.ranking}
                  </p>
                  {university.description && (
                    <p className="line-clamp-2">
                      <span className="font-medium">Description:</span>{" "}
                      {university.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {editingUniversity ? "Edit University" : "Add New University"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  University Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  University Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  aria-label="Upload university image"
                />
                {previewUrl && (
                  <div className="mt-2 relative h-32 w-full">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake"
                  className="block text-sm font-medium text-gray-700"
                >
                  Intake Information
                </label>
                <input
                  id="intake"
                  type="text"
                  value={formData.intake}
                  onChange={(e) =>
                    setFormData({ ...formData, intake: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                  placeholder="Fall: Sep | Spring: Jan"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="programs"
                  className="block text-sm font-medium text-gray-700"
                >
                  Programs
                </label>
                <input
                  id="programs"
                  type="text"
                  value={formData.programs}
                  onChange={(e) =>
                    setFormData({ ...formData, programs: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                  placeholder="200+ undergraduate programs"
                />
              </div>

              <div>
                <label
                  htmlFor="ranking"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ranking
                </label>
                <input
                  id="ranking"
                  type="text"
                  value={formData.ranking}
                  onChange={(e) =>
                    setFormData({ ...formData, ranking: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                  placeholder="#1 in World University Rankings"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
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
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingUniversity
                    ? "Update"
                    : "Create"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
