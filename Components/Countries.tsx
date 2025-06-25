"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface Country {
  name: string;
  flag: string;
  image: string;
  intake: string;
  programs: string;
  ranking: string;
}

export default function CountriesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const countries: Country[] = [
    {
      name: "United States",
      flag: "🇺🇸",
      image: "/usa.jpg",
      intake: "Fall: Aug-Sep | Spring: Jan | Summer: May-Jun",
      programs: "4,000+ institutions offering diverse programs",
      ranking: "Top universities: Harvard, Stanford, MIT, Caltech, Columbia",
    },
    {
      name: "Malta",
      flag: "🇲🇹",
      image: "/malta.jpg",
      intake: "Fall: October | Spring: February",
      programs: "English-taught programs at universities and colleges",
      ranking:
        "Top institutions: University of Malta, Malta College of Arts, Science & Technology",
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      image: "/uk.jpg",
      intake: "Fall: Sep-Oct | Spring: Jan (limited programs)",
      programs: "160+ universities with 50,000+ courses",
      ranking: "Top universities: Oxford, Cambridge, Imperial, LSE, UCL",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      image: "/australia.jpg",
      intake: "Semester 1: February | Semester 2: July",
      programs: "43 universities with strong research programs",
      ranking: "Top universities: Melbourne, Sydney, ANU, Queensland, Monash",
    },
    {
      name: "South Korea",
      flag: "🇰🇷",
      image: "/korea.jpg",
      intake: "Spring: March | Fall: September",
      programs: "400+ universities with global partnerships",
      ranking:
        "Top universities: Seoul National, KAIST, POSTECH, Yonsei, Korea University",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      image: "/japan.jpg",
      intake: "Spring: April | Fall: September/October",
      programs: "800+ universities including national, public and private",
      ranking: "Top universities: Tokyo, Kyoto, Osaka, Tohoku, Keio",
    },
  ];

  return (
    <div className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Explore Study Destinations
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Discover countries offering world-class education and exceptional
            opportunities for international students.
          </p>
        </div>

        {/* Country Carousel */}
        <div className="relative">
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
            onSlideChange={(swiper: SwiperType) =>
              setActiveIndex(swiper.activeIndex)
            }
            className="!pb-12"
          >
            {countries.map((country, index) => (
              <SwiperSlide key={country.name}>
                <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg">
                  {/* Country Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <Image
                      src={country.image}
                      alt={country.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/70">
                    {/* Always Visible Info */}
                    <div className="mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{country.flag}</span>
                        <h3 className="text-xl font-bold text-white">
                          {country.name}
                        </h3>
                      </div>
                    </div>

                    {/* Hidden Details - Reveals on Hover */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500">
                      <div className="pt-4 border-t border-[#B2ACCE]/30 space-y-3">
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Intake:</span>
                          {country.intake}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">
                            Institutions:
                          </span>
                          {country.programs}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">
                            Top Schools:
                          </span>
                          {country.ranking}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-4 group flex items-center text-[#B2ACCE] hover:text-white transition-colors"
                      >
                        <span>Explore {country.name}</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="group inline-flex items-center bg-[#C73D43] text-[#F5F4F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors"
          >
            View All Countries
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
