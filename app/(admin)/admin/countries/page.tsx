"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Country } from "@/lib/appwrite/database";

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    flag: "",
    intake: "",
    programs: "",
    ranking: "",
    description: "",
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/countries");
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data.documents || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = editingCountry
        ? `/api/countries/${editingCountry.$id}`
        : "/api/countries";
      const method = editingCountry ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save country");

      await fetchCountries();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this country?")) return;

    try {
      const response = await fetch(`/api/countries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete country");
      await fetchCountries();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditing = (country: Country) => {
    setEditingCountry(country);
    setFormData({
      name: country.name,
      flag: country.flag,
      intake: country.intake,
      programs: country.programs,
      ranking: country.ranking,
      description: country.description || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingCountry(null);
    setFormData({
      name: "",
      flag: "",
      intake: "",
      programs: "",
      ranking: "",
      description: "",
    });
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Countries Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Country
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.$id}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{country.flag}</span>
                <h3 className="text-lg font-semibold">{country.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(country)}
                  className="text-green-600 hover:text-green-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(country.$id!)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Intake:</span> {country.intake}
              </p>
              <p>
                <span className="font-medium">Programs:</span>{" "}
                {country.programs}
              </p>
              <p>
                <span className="font-medium">Ranking:</span> {country.ranking}
              </p>
              {country.description && (
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {country.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingCountry ? "Edit Country" : "Add New Country"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Country Name", key: "name", placeholder: "Nepal" },
                { label: "Flag Emoji", key: "flag", placeholder: "🇳🇵" },
                {
                  label: "Intake Information",
                  key: "intake",
                  placeholder: "Fall: Sep | Spring: Jan",
                },
                {
                  label: "Programs",
                  key: "programs",
                  placeholder: "4,000+ institutions",
                },
                {
                  label: "Ranking/Top Destinations",
                  key: "ranking",
                  placeholder: "Top destinations: MIT",
                },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingCountry ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
