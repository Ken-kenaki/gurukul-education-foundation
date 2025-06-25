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

export default function MaltaPage() {
  const stats = [
    { value: "€7,000-12,000", label: "Annual Tuition Fees" },
    { value: "€800-1,200", label: "Monthly Living Costs" },
    { value: "90%", label: "English Speaking Population" },
    { value: "300+", label: "Sunny Days Per Year" },
  ];

  const reasons = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "High-Quality Education",
      description:
        "Malta's education system follows the British model with internationally recognized degrees and English as the primary language of instruction.",
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Affordable Costs",
      description:
        "Compared to other European destinations, Malta offers relatively low tuition fees and living expenses without compromising quality.",
    },
    {
      icon: <ScrollText className="w-8 h-8" />,
      title: "Simple Visa Process",
      description:
        "Malta has a straightforward student visa application process with high approval rates for international students.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Safe Environment",
      description:
        "Ranked as one of the safest countries in the world, Malta offers a secure environment for international students.",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Strategic Location",
      description:
        "Located in the heart of the Mediterranean, Malta serves as a gateway to Europe, Africa, and the Middle East.",
    },
  ];

  const otherCountries = [
    { name: "South Korea", flag: "🇰🇷", link: "/south-korea" },
    { name: "Australia", flag: "🇦🇺", link: "/australia" },
    { name: "Japan", flag: "🇯🇵", link: "/japan" },
    { name: "UK", flag: "🇬🇧", link: "/uk" },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] bg-white pt-15">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#2C3C81] to-[#C73D43] text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Study in <span className="text-yellow-300">Malta</span> 🇲🇹
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            >
              Discover world-class education in the heart of the Mediterranean
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="#why-malta"
                className="px-6 py-3 bg-white text-[#2C3C81] rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Why Choose Malta
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#C73D43] text-white rounded-lg font-medium hover:bg-[#B2ACCE] transition-colors"
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
                <p className="text-2xl font-bold text-[#2C3C81]">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Malta Section */}
        <section id="why-malta" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#2C3C81]"
            >
              Why Study in Malta?
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
                  <div className="text-[#C73D43] mb-4">{reason.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-[#2C3C81]">
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
                <h2 className="text-3xl font-bold mb-6 text-[#2C3C81]">
                  Education System in Malta
                </h2>
                <p className="text-gray-600 mb-4">
                  Malta's education system is based on the British model,
                  offering internationally recognized qualifications. Higher
                  education is divided between the University of Malta and the
                  Malta College of Arts, Science and Technology (MCAST).
                </p>
                <p className="text-gray-600 mb-6">
                  Most undergraduate programs take 3 years to complete
                  (Bachelor's degrees), while postgraduate programs typically
                  take 1-2 years. The academic year runs from October to June.
                </p>
                <Link
                  href="/universities?country=malta"
                  className="inline-flex items-center px-6 py-3 bg-[#2C3C81] text-white rounded-lg font-medium hover:bg-[#1E2A5E] transition-colors"
                >
                  View Universities in Malta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-100 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-[#C73D43]">
                  Key Features:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#2C3C81] mr-2">✓</span>
                    <span>English as the primary language of instruction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2C3C81] mr-2">✓</span>
                    <span>
                      EU-compliant qualifications recognized worldwide
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2C3C81] mr-2">✓</span>
                    <span>Small class sizes with personalized attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2C3C81] mr-2">✓</span>
                    <span>
                      Strong emphasis on research and practical skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2C3C81] mr-2">✓</span>
                    <span>
                      Opportunities for internships with local and international
                      companies
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Living in Malta */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-[#2C3C81]"
                >
                  Living in Malta as a Student
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-4"
                >
                  Malta offers an exceptional quality of life for international
                  students with its Mediterranean climate, rich history, and
                  vibrant multicultural environment.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#C73D43]">
                    Cost of Living
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accommodation: €300-600/month (shared apartment)</li>
                    <li>• Food: €200-300/month</li>
                    <li>• Transportation: €25/month (student bus pass)</li>
                    <li>• Entertainment: €100-200/month</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#C73D43]">
                    Student Life
                  </h3>
                  <p className="text-gray-600">
                    With students from over 90 countries, Malta offers a truly
                    international experience. The islands provide numerous
                    cultural activities, water sports, and historical sites to
                    explore during your free time.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:w-1/2 bg-gray-100 p-8 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-4 text-[#2C3C81]">
                  Student Visa Requirements
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#C73D43] mr-2">•</span>
                    <span>
                      Letter of acceptance from a Maltese educational
                      institution
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C73D43] mr-2">•</span>
                    <span>Proof of sufficient funds (€75 per day of stay)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C73D43] mr-2">•</span>
                    <span>Valid health insurance coverage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C73D43] mr-2">•</span>
                    <span>Clean criminal record certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C73D43] mr-2">•</span>
                    <span>Medical certificate</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services/visa-assistance"
                    className="inline-flex items-center px-6 py-3 bg-[#C73D43] text-white rounded-lg font-medium hover:bg-[#B2ACCE] transition-colors"
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
        <section className="py-16 bg-[#2C3C81] text-white">
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
                className="inline-flex items-center px-6 py-3 bg-white text-[#2C3C81] rounded-lg font-medium hover:bg-gray-100 transition-colors"
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
              className="text-3xl font-bold mb-6 text-[#2C3C81]"
            >
              Ready to Start Your Study Journey in Malta?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Our education consultants are ready to help you with university
              applications, visa processes, and everything you need to study in
              Malta.
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
                className="px-8 py-4 bg-[#C73D43] text-white rounded-lg font-medium hover:bg-[#B2ACCE] transition-colors text-lg"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/universities?country=malta"
                className="px-8 py-4 bg-white text-[#2C3C81] rounded-lg font-medium hover:bg-gray-100 border border-gray-300 transition-colors text-lg"
              >
                Browse Universities
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
