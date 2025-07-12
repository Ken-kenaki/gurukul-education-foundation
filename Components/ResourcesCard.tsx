// components/ResourceCard.tsx
"use client";

import { Resource } from "@/types"; // Define your Resource type

export default function ResourceCard({ resource }: { resource: Resource }) {
  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/resources/download/${fileId}`);

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{resource.name}</h2>
        {resource.description && (
          <p className="text-gray-600 mt-2">{resource.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {resource.type} • {(resource.size / 1024).toFixed(2)} KB
        </p>
      </div>
      <button
        onClick={() => handleDownload(resource.fileId, resource.name)}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Download
      </button>
    </div>
  );
}
