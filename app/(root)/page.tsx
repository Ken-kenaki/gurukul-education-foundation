import HeroSection from "@/Components/Hero";
import CareerChoicesSection from "@/Components/CarrierChoicesSection";
import WhyUs from "@/Components/WhyUs";
import React from "react";
import NewsEventsCarousel from "@/Components/NewsEvents";
import StatsCounter from "@/Components/StatsCounter";
import UniversitiesCarousel from "@/Components/Universities";
import StudentSuccessCarousel from "@/Components/StudentSuccess";
import CountriesCarousel from "@/Components/Countries";
import AboutSection from "@/Components/About";
import ContactSection from "@/Components/ContactSection";
import FindUsSection from "@/Components/FindUs";

export default async function page() {
  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw]">
        <HeroSection />
        <CareerChoicesSection />
        <AboutSection />
        <WhyUs />
        <NewsEventsCarousel />
        <StatsCounter />
        <UniversitiesCarousel />
        <StudentSuccessCarousel />
        <CountriesCarousel />
        <ContactSection />
        <FindUsSection />
      </div>
    </main>
  );
}
