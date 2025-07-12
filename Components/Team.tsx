"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/utils/appwrite";

interface TeamMember {
  $id: string;
  name: string;
  position: string;
  description: string;
  imageId?: string;
  socialLinks?: string;
  skills?: string;
}

export default function TeamCarousel() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team");
        if (!response.ok) throw new Error("Failed to fetch team");
        const data = await response.json();

        // Add image URLs to team members
        const teamWithImages = data.map((member: TeamMember) => ({
          ...member,
          imageUrl: member.imageId
            ? getImageUrl(
                member.imageId,
                process.env.NEXT_PUBLIC_APPWRITE_TEAMS_BUCKET!,
                300,
                300
              )
            : "/default-avatar.jpg",
        }));

        setTeam(teamWithImages);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          Loading team members...
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-white"
    >
      <div id="team" className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
          Meet Our Team
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="pb-12"
        >
          {team.map((member, index) => (
            <SwiperSlide key={member.$id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center bg-[#F5F4F5] rounded-xl p-8 hover:shadow-lg transition-all duration-300 h-full"
              >
                <Link href={`/about/${member.$id}`}>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-avatar.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3C81] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#C73D43] font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-[#2C3C81]/80 line-clamp-3">
                    {member.description}
                  </p>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}
