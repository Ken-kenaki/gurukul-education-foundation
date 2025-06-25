"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { appwriteConfig, getImageUrl } from "@/utils/appwrite";
import "swiper/css";
import "swiper/css/navigation";

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

export default function UniversitiesCarousel() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F5F4F5] py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C73D43] mx-auto"></div>
            <p className="mt-4 text-[#2C3C81]">Loading universities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!universities.length) {
    return (
      <div className="bg-[#F5F4F5] py-16 px-4">
        <div className="container mx-auto text-center">
          <p className="text-[#2C3C81]">No universities found</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="bg-[#F5F4F5] py-16 px-4"
      aria-label="Featured universities"
    >
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Discover Top Courses and Universities
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Explore our partner institutions across the globe offering
            world-class education and exceptional opportunities for
            international students.
          </p>
        </motion.div>

        {/* University Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="!pb-12"
          >
            {universities.map((uni) => (
              <SwiperSlide key={uni.$id}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-80 rounded-xl overflow-hidden shadow-lg"
                >
                  {/* University Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <Image
                      src={
                        uni.imageId
                          ? getImageUrl(
                              uni.imageId,
                              appwriteConfig.buckets.universities,
                              800,
                              600
                            )
                          : "/university-placeholder.jpg"
                      }
                      alt={`${uni.name} in ${uni.country}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/university-placeholder.jpg";
                      }}
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/70">
                    {/* Always Visible Info */}
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {uni.name}
                      </h3>
                      <p className="text-[#B2ACCE]">{uni.country}</p>
                    </div>

                    {/* Hidden Details - Reveals on Hover */}
                    <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      whileHover={{ maxHeight: 200, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-[#B2ACCE]/30 space-y-3">
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Intake:</span>
                          {uni.intake}
                        </div>
                        {uni.programs && (
                          <div className="flex items-center text-white/90">
                            <span className="text-[#B2ACCE] mr-2">
                              Programs:
                            </span>
                            {uni.programs}
                          </div>
                        )}
                        {uni.ranking && (
                          <div className="flex items-center text-white/90">
                            <span className="text-[#B2ACCE] mr-2">
                              Ranking:
                            </span>
                            {uni.ranking}
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/universities/${uni.$id}`}
                        className="mt-4 group flex items-center text-[#B2ACCE] hover:text-white transition-colors"
                        aria-label={`Explore programs at ${uni.name}`}
                      >
                        <span>Explore Programs</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/universities"
            className="group inline-flex items-center bg-[#C73D43] text-[#F5F4F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors"
            aria-label="View all universities"
          >
            View All Universities
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
