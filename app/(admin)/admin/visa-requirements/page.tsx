// app/admin/visa-requirements/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";

interface VisaRequirement {
  $id?: string;
  countryName: string;
  title: string;
  requirements: string[];
  ctaText: string;
  ctaLink: string;
  createdAt?: string;
}

export default function VisaRequirementsAdminPage() {
  const [requirements, setRequirements] = useState<VisaRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReq, setEditingReq] = useState<VisaRequirement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequirement, setNewRequirement] = useState("");

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/visa-requirements");
      if (!response.ok) throw new Error("Failed to fetch requirements");
      const data = await response.json();
      setRequirements(data.documents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!editingReq) {
        throw new Error("No requirement data to submit");
      }

      // Validate all required fields
      const requiredFields = {
        countryName: editingReq.countryName,
        title: editingReq.title,
        requirements: editingReq.requirements,
        ctaText: editingReq.ctaText,
        ctaLink: editingReq.ctaLink,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(
          ([_, value]) => !value || (Array.isArray(value) && value.length === 0)
        )
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Prepare the payload
      const payload = {
        countryName: editingReq.countryName,
        title: editingReq.title,
        requirements: editingReq.requirements, // This will be stringified in DatabaseService
        ctaText: editingReq.ctaText,
        ctaLink: editingReq.ctaLink,
      };

      console.log("Submitting payload:", payload); // Debug log

      const endpoint = editingReq.$id
        ? `/api/visa-requirements/${editingReq.$id}`
        : "/api/visa-requirements";

      const method = editingReq.$id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData); // Debug log
        throw new Error(
          errorData.error || "Request failed with status " + response.status
        );
      }

      const result = await response.json();
      console.log("Success:", result); // Debug log

      fetchRequirements();
      resetForm();
    } catch (err) {
      console.error("Submission error details:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this visa requirement?"))
      return;

    setLoading(true);
    try {
      const response = await fetch(`/api/visa-requirements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setRequirements(requirements.filter((req) => req.$id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingReq(null);
    setNewRequirement("");
  };

  const addRequirement = () => {
    if (!newRequirement.trim()) return;
    setEditingReq((prev) => ({
      ...prev!,
      requirements: [...prev!.requirements, newRequirement.trim()],
    }));
    setNewRequirement("");
  };

  const removeRequirement = (index: number) => {
    setEditingReq((prev) => ({
      ...prev!,
      requirements: prev!.requirements.filter((_, i) => i !== index),
    }));
  };

  if (loading && !isModalOpen)
    return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Visa Requirements Management
            </h1>
            <button
              onClick={() => {
                setEditingReq({
                  countryName: "",
                  title: "",
                  requirements: [],
                  ctaText: "Get Visa Assistance",
                  ctaLink: "/services/visa-assistance",
                });
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus className="inline mr-1" size={18} />
              Add New Requirement
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirements Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requirements.map((req) => (
                  <tr key={req.$id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {req.countryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {req.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.requirements.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingReq(req);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="inline mr-1" size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => req.$id && handleDelete(req.$id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="inline mr-1" size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingReq?.$id
                    ? "Edit Visa Requirement"
                    : "Add New Visa Requirement"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country Name *
                    </label>
                    <input
                      type="text"
                      value={editingReq?.countryName || ""}
                      onChange={(e) =>
                        setEditingReq((prev) => ({
                          ...prev!,
                          countryName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editingReq?.title || ""}
                      onChange={(e) =>
                        setEditingReq((prev) => ({
                          ...prev!,
                          title: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements *
                    </label>
                    <div className="space-y-2 mb-2">
                      {editingReq?.requirements.map((req, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-[#003580] mr-2">•</span>
                          <span className="flex-grow">{req}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add new requirement"
                      />
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CTA Text *
                      </label>
                      <input
                        type="text"
                        value={editingReq?.ctaText || ""}
                        onChange={(e) =>
                          setEditingReq((prev) => ({
                            ...prev!,
                            ctaText: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CTA Link *
                      </label>
                      <input
                        type="text"
                        value={editingReq?.ctaLink || ""}
                        onChange={(e) =>
                          setEditingReq((prev) => ({
                            ...prev!,
                            ctaLink: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
