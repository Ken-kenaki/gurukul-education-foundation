"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  ArrowRight,
  Filter,
  Heart,
  Share2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  website?: string;
  tuition?: string;
  scholarship?: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const countries = [
    "all",
    "South Korea",
    "United States",
    "Australia",
    "Japan",
    "UK",
    "Malta",
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "ranking-asc", label: "Ranking (Low to High)" },
    { value: "ranking-desc", label: "Ranking (High to Low)" },
  ];

  useEffect(() => {
    fetchUniversities();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("universityFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    filterAndSortUniversities();
  }, [universities, searchTerm, selectedCountry, sortOption]);

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem("universityFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/universities");
      if (response.ok) {
        const data = await response.json();
        setUniversities(data.documents || []);
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUniversities = () => {
    let filtered = [...universities];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.programs.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (selectedCountry !== "all") {
      filtered = filtered.filter(
        (uni) => uni.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    // Sort universities
    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "ranking-asc":
        filtered.sort((a, b) => parseInt(a.ranking) - parseInt(b.ranking));
        break;
      case "ranking-desc":
        filtered.sort((a, b) => parseInt(b.ranking) - parseInt(a.ranking));
        break;
      default:
        // Default sorting (original order)
        break;
    }

    setFilteredUniversities(filtered);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const shareUniversity = (university: University) => {
    if (navigator.share) {
      navigator.share({
        title: university.name,
        text: `Check out ${university.name} in ${university.country}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `${university.name} - ${window.location.href}`
      );
      alert("University link copied to clipboard!");
    }
  };

  const getUniversityImageUrl = (imageId?: string) => {
    if (!imageId) return "/university-placeholder.jpg";
    return getImageUrl(imageId, appwriteConfig.buckets.universities, 400, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C73D43]"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <div className="w-full min-w-[100vw] min-h-screen pt-52 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3C81] mb-3 sm:mb-4">
              Discover Top Universities
            </h1>
            <p className="text-base sm:text-lg text-[#2C3C81]/80 max-w-3xl mx-auto px-2">
              Explore world-class institutions across South Korea, Australia,
              Japan, UK, and Malta
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B2ACCE]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden sm:flex gap-4">
                <div className="relative flex-1">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B2ACCE]"
                    size={20}
                  />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 sm:py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent bg-white"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country === "all" ? "All Countries" : country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full pl-4 pr-8 py-2 sm:py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="sm:hidden flex items-center justify-center gap-2 bg-[#2C3C81] text-white py-2 rounded-lg"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>
          </motion.div>

          {/* Mobile Filter Modal */}
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 sm:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#2C3C81]">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={24} className="text-[#2C3C81]" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3C81] mb-1">
                      Country
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-2 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent bg-white"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country === "all" ? "All Countries" : country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C3C81] mb-1">
                      Sort By
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full p-2 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent bg-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-[#C73D43] text-white py-2 rounded-lg mt-4"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Universities Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUniversities.map((university) => (
              <motion.div
                key={university.$id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group relative transition-all duration-300"
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(university.$id);
                  }}
                  className="absolute top-3 left-3 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  aria-label={
                    favorites.includes(university.$id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(university.$id)
                        ? "fill-[#C73D43] text-[#C73D43]"
                        : "text-[#2C3C81]"
                    }
                  />
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    shareUniversity(university);
                  }}
                  className="absolute top-3 right-12 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  aria-label="Share this university"
                >
                  <Share2 size={18} className="text-[#2C3C81]" />
                </button>

                <div
                  className="relative h-40 sm:h-48 overflow-hidden"
                  onClick={() => setSelectedUniversity(university)}
                >
                  <Image
                    src={getUniversityImageUrl(university.imageId)}
                    alt={university.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/university-placeholder.jpg";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#C73D43] text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {university.country}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C3C81] mb-2 group-hover:text-[#C73D43] transition-colors line-clamp-2">
                    {university.name}
                  </h3>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center text-[#2C3C81]/70">
                      <MapPin
                        size={14}
                        className="mr-2 text-[#C73D43] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {university.country}
                      </span>
                    </div>
                    <div className="flex items-center text-[#2C3C81]/70">
                      <Calendar
                        size={14}
                        className="mr-2 text-[#C73D43] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {university.intake}
                      </span>
                    </div>
                    <div className="flex items-center text-[#2C3C81]/70">
                      <BookOpen
                        size={14}
                        className="mr-2 text-[#C73D43] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {university.programs}
                      </span>
                    </div>
                    <div className="flex items-center text-[#2C3C81]/70">
                      <Star
                        size={14}
                        className="mr-2 text-[#C73D43] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm truncate">
                        {university.ranking}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUniversity(university)}
                    className="w-full bg-[#2C3C81] text-white py-2 rounded-lg hover:bg-[#C73D43] transition-colors group flex items-center justify-center text-sm sm:text-base"
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredUniversities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-[#B2ACCE] text-base sm:text-lg mb-4">
                No universities found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("all");
                  setSortOption("default");
                }}
                className="bg-[#C73D43] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#2C3C81] transition-colors text-sm sm:text-base"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* University Detail Modal */}
          {selectedUniversity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedUniversity(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-48 sm:h-64">
                  <Image
                    src={getUniversityImageUrl(selectedUniversity.imageId)}
                    alt={selectedUniversity.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/university-placeholder.jpg";
                    }}
                  />
                  <button
                    onClick={() => setSelectedUniversity(null)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#2C3C81] rounded-full p-1 sm:p-2 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2C3C81]">
                      {selectedUniversity.name}
                    </h2>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => toggleFavorite(selectedUniversity.$id)}
                        className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
                        aria-label={
                          favorites.includes(selectedUniversity.$id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <Heart
                          size={18}
                          className={
                            favorites.includes(selectedUniversity.$id)
                              ? "fill-[#C73D43] text-[#C73D43]"
                              : "text-[#2C3C81]"
                          }
                        />
                      </button>
                      <button
                        onClick={() => shareUniversity(selectedUniversity)}
                        className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Share this university"
                      >
                        <Share2 size={18} className="text-[#2C3C81]" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start">
                        <MapPin
                          size={16}
                          className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                            Location
                          </div>
                          <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                            {selectedUniversity.country}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar
                          size={16}
                          className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                            Intake
                          </div>
                          <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                            {selectedUniversity.intake}
                          </div>
                        </div>
                      </div>
                      {selectedUniversity.tuition && (
                        <div className="flex items-start">
                          <BookOpen
                            size={16}
                            className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                          />
                          <div>
                            <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                              Tuition Fees
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                              {selectedUniversity.tuition}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start">
                        <BookOpen
                          size={16}
                          className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                            Programs
                          </div>
                          <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                            {selectedUniversity.programs}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Star
                          size={16}
                          className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                            Ranking
                          </div>
                          <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                            {selectedUniversity.ranking}
                          </div>
                        </div>
                      </div>
                      {selectedUniversity.scholarship && (
                        <div className="flex items-start">
                          <Star
                            size={16}
                            className="mr-2 mt-1 text-[#C73D43] flex-shrink-0"
                          />
                          <div>
                            <div className="font-medium text-sm sm:text-base text-[#2C3C81]">
                              Scholarships
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C3C81]/70">
                              {selectedUniversity.scholarship}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedUniversity.description && (
                    <div className="mb-4 sm:mb-6">
                      <h3 className="font-medium text-sm sm:text-base text-[#2C3C81] mb-2">
                        About
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2C3C81]/70">
                        {selectedUniversity.description}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {selectedUniversity.website && (
                      <a
                        href={selectedUniversity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#C73D43] text-white py-2 sm:py-3 rounded-lg hover:bg-[#2C3C81] transition-colors text-center text-sm sm:text-base"
                      >
                        Visit Website
                      </a>
                    )}
                    <Link
                      href="/contact"
                      className="flex-1 border border-[#2C3C81] text-[#2C3C81] py-2 sm:py-3 rounded-lg hover:bg-[#2C3C81] hover:text-white transition-colors text-center text-sm sm:text-base"
                    >
                      Get Consultation
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
