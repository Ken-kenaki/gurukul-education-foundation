"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatsAdminPage() {
  const [stats, setStats] = useState({
    students: 0,
    universities: 0,
    countries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statistics");
        if (!response.ok) throw new Error("Failed to fetch statistics");
        const data = await response.json();

        const statsData = data.documents.reduce((acc: any, stat: any) => {
          acc[stat.name] = stat.count;
          return acc;
        }, {});

        setStats({
          students: statsData.students || 0,
          universities: statsData.universities || 0,
          countries: statsData.countries || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updates = [
        { name: "students", count: stats.students },
        { name: "universities", count: stats.universities },
        { name: "countries", count: stats.countries },
      ];

      const results = await Promise.all(
        updates.map((stat) =>
          fetch("/api/statistics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stat),
          })
        )
      );

      const errors = results.filter((r) => !r.ok);
      if (errors.length > 0) {
        throw new Error("Some updates failed");
      }

      setError("Stats updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Statistics Management
          </h1>

          {error && (
            <div
              className={`mb-4 p-3 rounded ${
                error.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Count
                </label>
                <input
                  type="number"
                  value={stats.students}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      students: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Universities Count
                </label>
                <input
                  type="number"
                  value={stats.universities}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      universities: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Countries Count
                </label>
                <input
                  type="number"
                  value={stats.countries}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      countries: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
