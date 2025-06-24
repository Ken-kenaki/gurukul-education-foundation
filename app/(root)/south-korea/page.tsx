"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Home,
  Landmark,
  Plane,
  ScrollText,
} from "lucide-react";

export default function SouthKoreaPage() {
  const stats = [
    { value: "$4,000-15,000", label: "Annual Tuition Fees" },
    { value: "$800-1,500", label: "Monthly Living Costs" },
    { value: "90+", label: "English Taught Programs" },
    { value: "Top 10", label: "Internet Speed Worldwide" },
  ];

  const reasons = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "World-Class Education",
      description:
        "South Korea boasts top-ranked universities with cutting-edge research facilities and globally recognized degrees.",
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Government Scholarships",
      description:
        "KGSP and other scholarship programs cover tuition, living expenses, and even airfare for international students.",
    },
    {
      icon: <ScrollText className="w-8 h-8" />,
      title: "Tech & Innovation Hub",
      description:
        "Study in the heart of global tech giants like Samsung, Hyundai, and LG with excellent internship opportunities.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Safe & Modern",
      description:
        "Enjoy one of the world's safest countries with ultra-modern infrastructure and efficient public transport.",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Cultural Experience",
      description:
        "Immerse yourself in unique blend of traditional culture and hyper-modern K-pop/K-drama trends.",
    },
  ];

  const otherCountries = [
    { name: "Japan", flag: "🇯🇵", link: "/japan" },
    { name: "Malta", flag: "🇲🇹", link: "/malta" },
    { name: "Australia", flag: "🇦🇺", link: "/australia" },
    { name: "UK", flag: "🇬🇧", link: "/uk" },
  ];

  return (
    <div className="bg-white pt-15">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#003580] to-[#CD0E2D] text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Study in <span className="text-yellow-300">South Korea</span> 🇰🇷
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            Experience cutting-edge education in Asia's technological powerhouse
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#why-korea"
              className="px-6 py-3 bg-white text-[#003580] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Why Choose Korea
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#CD0E2D] text-white rounded-lg font-medium hover:bg-[#a00b24] transition-colors"
            >
              Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-12 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <p className="text-2xl font-bold text-[#003580]">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Korea Section */}
      <section id="why-korea" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#003580]"
          >
            Why Study in South Korea?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-[#CD0E2D] mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#003580]">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#003580]">
                Education System in Korea
              </h2>
              <p className="text-gray-600 mb-4">
                South Korea's education system is renowned for its rigor and
                excellence. The academic year runs from March to February, with
                summer break (July-August) and winter break (December-February).
                Most undergraduate programs take 4 years to complete.
              </p>
              <p className="text-gray-600 mb-6">
                Many universities now offer English-taught programs, especially
                at graduate levels. The Korean government actively supports
                international students through various initiatives and
                scholarships.
              </p>
              <Link
                href="/universities?country=south-korea"
                className="inline-flex items-center px-6 py-3 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#002562] transition-colors"
              >
                View Programs in Korea
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="md:w-1/2 bg-gray-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#CD0E2D]">
                Key Features:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#003580] mr-2">✓</span>
                  <span>Semester system (Spring & Fall intake)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#003580] mr-2">✓</span>
                  <span>Strong focus on STEM fields</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#003580] mr-2">✓</span>
                  <span>State-of-the-art research facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#003580] mr-2">✓</span>
                  <span>Industry-academia collaboration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#003580] mr-2">✓</span>
                  <span>
                    Korean language courses for international students
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Living in Korea */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6 text-[#003580]"
              >
                Student Life in Korea
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-4"
              >
                South Korea offers an exciting blend of traditional culture and
                ultra-modern living. From ancient palaces to K-pop concerts,
                there's always something to explore.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#CD0E2D]">
                  Cost of Living
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Accommodation: $300-700/month (dormitory)</li>
                  <li>• Food: $250-400/month</li>
                  <li>• Transportation: $50/month (subway/bus)</li>
                  <li>• Mobile: $30/month</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2 text-[#CD0E2D]">
                  Student Benefits
                </h3>
                <p className="text-gray-600">
                  International students can work part-time (up to 20 hrs/week
                  during semester). Many universities offer buddy programs,
                  cultural excursions, and Korean language partners to help you
                  adjust.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 text-[#003580]">
                Visa Requirements (D-2 Visa)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#CD0E2D] mr-2">•</span>
                  <span>University admission letter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#CD0E2D] mr-2">•</span>
                  <span>Proof of financial stability ($10,000+ in bank)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#CD0E2D] mr-2">•</span>
                  <span>Clean criminal record</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#CD0E2D] mr-2">•</span>
                  <span>Health insurance coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#CD0E2D] mr-2">•</span>
                  <span>Completed visa application form</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/services/visa-assistance"
                  className="inline-flex items-center px-6 py-3 bg-[#CD0E2D] text-white rounded-lg font-medium hover:bg-[#a00b24] transition-colors"
                >
                  Get Visa Assistance
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Other Countries */}
      <section className="py-16 bg-[#003580] text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Explore Other Study Destinations
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCountries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-6 text-center backdrop-blur-sm"
              >
                <span className="text-4xl mb-3 inline-block">
                  {country.flag}
                </span>
                <h3 className="text-xl font-bold mb-2">{country.name}</h3>
                <Link
                  href={country.link}
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  View details
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/countries"
              className="inline-flex items-center px-6 py-3 bg-white text-[#003580] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View All Countries
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F5F4F5]">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-[#003580]"
          >
            Ready to Study in South Korea?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Our specialists can guide you through university selection,
            applications, scholarships, and visa process for South Korea.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#CD0E2D] text-white rounded-lg font-medium hover:bg-[#a00b24] transition-colors text-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/scholarships?country=south-korea"
              className="px-8 py-4 bg-white text-[#003580] rounded-lg font-medium hover:bg-gray-100 border border-gray-300 transition-colors text-lg"
            >
              View Scholarships
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
