"use client";
import React, { useEffect, useState, useMemo } from "react";
import { X, Search, Grid, List, Eye } from "lucide-react";
import { getImageUrl, appwriteConfig } from "@/utils/appwrite";
import Image from "next/image";

interface GalleryImage {
  name: string;
  url: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  const galleryBucketId = appwriteConfig.buckets.gallery;

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();

        // Map the data adding bucketId explicitly to getImageUrl
        const formatted = data.map((img: any) => ({
          name: img.title || "Untitled",
          url: getImageUrl(img.imageId, galleryBucketId),
        }));
        setImages(formatted);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [galleryBucketId]);

  // Memoize filtered images for performance
  const filteredImages = useMemo(() => {
    if (searchTerm.trim() === "") return images;
    return images.filter((img) =>
      img.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [images, searchTerm]);

  const openModal = (url: string) => setSelectedImage(url);
  const closeModal = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    setSelectedImage(null);
  };

  // Keyboard accessibility: close modal on ESC
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    if (selectedImage) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 rounded-full border-4 border-red-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] min-h-screen pt-40 bg-gradient-to-br from-red-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Photo Gallery
            </h1>
            <p className="text-gray-600 text-lg">
              Discover and explore your beautiful memories.
            </p>
          </header>

          {/* Stats and View Mode */}
          <section className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-6 items-center text-gray-700">
              <div className="flex gap-1 items-center">
                <Eye className="w-4 h-4 text-red-600" />
                <span>Total:</span>
                <strong>{images.length}</strong>
              </div>
              <div className="flex gap-1 items-center">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Filtered:</span>
                <strong>{filteredImages.length}</strong>
              </div>
            </div>
            <div
              className="flex gap-2 bg-gray-100 p-1 rounded-lg"
              role="group"
              aria-label="View mode toggle"
            >
              <button
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-white shadow text-red-600"
                    : "text-gray-500"
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-white shadow text-red-600"
                    : "text-gray-500"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto relative">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search images"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl focus:border-red-500 focus:ring-red-500 outline-none shadow-sm"
            />
          </div>

          {/* Images Display */}
          {filteredImages.length === 0 ? (
            <div
              className="text-center py-20 bg-white rounded-xl shadow"
              role="status"
              aria-live="polite"
            >
              <Search
                className="w-10 h-10 text-gray-300 mx-auto mb-2"
                aria-hidden="true"
              />
              <p className="text-lg text-gray-500">
                No images found. Try a different search.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  : "space-y-4"
              }
            >
              {filteredImages.map((img) => (
                <article
                  key={img.url}
                  tabIndex={0}
                  role="button"
                  onClick={() => openModal(img.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(img.url);
                    }
                  }}
                  className={`cursor-pointer group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    viewMode === "grid"
                      ? "bg-white rounded-xl overflow-hidden shadow hover:scale-105"
                      : "bg-white rounded-xl shadow p-4 flex items-center gap-4"
                  }`}
                  aria-label={`View image ${img.name}`}
                >
                  {viewMode === "grid" ? (
                    <>
                      <Image
                        src={img.url}
                        alt={img.name}
                        width={300}
                        height={200}
                        className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.jpg";
                        }}
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium truncate">
                          {img.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={img.url}
                        alt={img.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {img.name}
                        </p>
                        <p className="text-xs text-gray-500">Click to view</p>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedImage && (
          <aside
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Selected image preview"
            tabIndex={-1}
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close image preview"
                className="absolute top-4 right-4 bg-black/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <X className="text-white" />
              </button>
              <Image
                src={selectedImage}
                alt="Selected"
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[80vh] rounded-xl shadow-lg"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
              />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
