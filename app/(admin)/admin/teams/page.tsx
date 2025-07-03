"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/appwrite";

interface SocialLink {
  platform: string;
  url: string;
}

interface TeamMember {
  $id?: string;
  name: string;
  position: string;
  description: string;
  bio?: string;
  imageId?: string;
  socialLinks?: string | SocialLink[];
  skills?: string | string[];
  createdAt?: string;
}

export default function TeamAdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Safe JSON parsing with fallback
  const safeJsonParse = <T,>(
    str: string | undefined | null,
    fallback: T
  ): T => {
    if (!str) return fallback;
    try {
      const parsed = JSON.parse(str);
      return parsed || fallback;
    } catch {
      return fallback;
    }
  };

  // Get image URL for team members
  const getTeamImageUrl = (imageId?: string) => {
    if (!imageId) return null;
    return getImageUrl(
      imageId,
      process.env.NEXT_PUBLIC_APPWRITE_TEAMS_BUCKET!,
      200,
      200
    );
  };

  // Fetch team members
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team");
        if (!response.ok) throw new Error("Failed to fetch team");
        const data = await response.json();

        const teamWithImages = data.map((member: TeamMember) => ({
          ...member,
          imageUrl: getTeamImageUrl(member.imageId),
          socialLinks: safeJsonParse<SocialLink[]>(member.socialLinks, []),
          skills: safeJsonParse<string[]>(member.skills, []),
        }));

        setTeam(teamWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Create or update team member
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!editingMember) throw new Error("No member data to submit");

      const formData = new FormData();
      formData.append("name", editingMember.name);
      formData.append("position", editingMember.position);
      formData.append("description", editingMember.description);

      if (editingMember.bio) formData.append("bio", editingMember.bio);

      // Ensure proper JSON stringification
      const socialLinks = Array.isArray(editingMember.socialLinks)
        ? editingMember.socialLinks
        : [];
      formData.append("socialLinks", JSON.stringify(socialLinks));

      const skills = Array.isArray(editingMember.skills)
        ? editingMember.skills
        : [];
      formData.append("skills", JSON.stringify(skills));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const endpoint = editingMember.$id
        ? `/api/team/${editingMember.$id}`
        : "/api/team";

      const method = editingMember.$id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      // Refresh the team list
      const updatedTeam = await fetch("/api/team");
      const updatedData = await updatedTeam.json();
      setTeam(
        updatedData.map((member: TeamMember) => ({
          ...member,
          imageUrl: getTeamImageUrl(member.imageId),
          socialLinks: safeJsonParse<SocialLink[]>(member.socialLinks, []),
          skills: safeJsonParse<string[]>(member.skills, []),
        }))
      );

      resetForm();
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete team member
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setTeam(team.filter((member) => member.$id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setImageFile(null);
    setPreviewImage(null);
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
              Team Management
            </h1>
            <button
              onClick={() => {
                setEditingMember({
                  name: "",
                  position: "",
                  description: "",
                  bio: "",
                  socialLinks: [],
                  skills: [],
                });
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus className="inline mr-1" size={18} />
              Add New Member
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
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {team.map((member) => (
                  <tr key={member.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.imageUrl && (
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/default-avatar.jpg";
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingMember({
                            ...member,
                            socialLinks: Array.isArray(member.socialLinks)
                              ? member.socialLinks
                              : [],
                            skills: Array.isArray(member.skills)
                              ? member.skills
                              : [],
                          });
                          setPreviewImage(member.imageUrl || null);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="inline mr-1" size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => member.$id && handleDelete(member.$id)}
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
                  {editingMember?.$id
                    ? "Edit Team Member"
                    : "Add New Team Member"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editingMember?.name || ""}
                      onChange={(e) =>
                        setEditingMember((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={editingMember?.position || ""}
                      onChange={(e) =>
                        setEditingMember((prev) => ({
                          ...prev!,
                          position: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      value={editingMember?.description || ""}
                      onChange={(e) =>
                        setEditingMember((prev) => ({
                          ...prev!,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editingMember?.bio || ""}
                      onChange={(e) =>
                        setEditingMember((prev) => ({
                          ...prev!,
                          bio: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={5}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden bg-gray-200">
                        {previewImage ? (
                          <Image
                            src={previewImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        ) : editingMember?.imageUrl ? (
                          <Image
                            src={editingMember.imageUrl}
                            alt="Current"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
