"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Castle,
  PoundSterling,
  GraduationCap,
  Globe,
  Briefcase,
} from "lucide-react";

export default function UKPage() {
  const stats = [
    { value: "£10,000-£38,000", label: "Annual Tuition Fees" },
    { value: "£12,000-£15,000", label: "Living Costs (Outside London)" },
    { value: "96%", label: "Graduate Employment Rate" },
    { value: "#2", label: "World University Rankings" },
  ];

  const reasons = [
    {
      icon: <Castle className="w-8 h-8" />,
      title: "World-Class Institutions",
      description:
        "Home to Oxford, Cambridge, and 4 of top 10 global universities with centuries of academic excellence.",
    },
    {
      icon: <PoundSterling className="w-8 h-8" />,
      title: "Post-Study Work Visa",
      description:
        "Graduate Route allows 2-3 years to work after studies, with potential path to settlement.",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Short Duration Degrees",
      description:
        "Bachelor's in 3 years, Master's in 1 year - save time and money compared to other countries.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Recognition",
      description:
        "UK degrees are respected worldwide, with strong alumni networks across industries.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Work While Studying",
      description:
        "Students can work 20 hours/week during term and full-time during vacations.",
    },
  ];

  return (
    <div className="bg-white pt-15">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#012169] to-[#C8102E] text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Study in the <span className="text-yellow-300">United Kingdom</span>{" "}
            🇬🇧
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            Join the legacy of academic excellence in the world's education
            capital
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#why-uk"
              className="px-6 py-3 bg-white text-[#012169] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Why Choose UK
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#C8102E] text-white rounded-lg font-medium hover:bg-[#A00D26] transition-colors"
            >
              Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats - Card Layout */}
      <div className="container mx-auto px-4 py-12 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#012169]"
            >
              <p className="text-2xl font-bold text-[#C8102E]">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why UK Section - Alternating Layout */}
      <section id="why-uk" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#012169]"
          >
            Benefits of Studying in the UK
          </motion.h2>

          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-[#012169] p-4 rounded-full text-white">
                    {reason.icon}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3 text-[#C8102E]">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education System - Timeline Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-[#012169]"
          >
            UK Education Pathway
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-[#C8102E] transform -translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {[
                {
                  title: "Undergraduate",
                  duration: "3 Years (4 in Scotland)",
                  description:
                    "Bachelor's degrees (BA, BSc, BEng) with options for placement years",
                },
                {
                  title: "Postgraduate",
                  duration: "1 Year",
                  description:
                    "Master's degrees (MA, MSc, MBA) with taught or research options",
                },
                {
                  title: "Doctoral",
                  duration: "3-4 Years",
                  description:
                    "PhD programs with world-leading research supervision",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } items-center`}
                >
                  <div
                    className={`w-1/2 p-6 ${
                      index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-[#C8102E]">
                      {item.title}
                    </h3>
                    <p className="font-semibold text-[#012169]">
                      {item.duration}
                    </p>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#012169] absolute left-1/2 transform -translate-x-1/2 border-4 border-white"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#012169] to-[#C8102E] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Begin Your UK Education Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Our UCAS-certified advisors can help you craft the perfect
            application for top UK universities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#012169] rounded-lg font-medium hover:bg-gray-100 transition-colors text-lg"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/uk-university-finder"
              className="px-8 py-4 bg-transparent text-white rounded-lg font-medium hover:bg-white/10 border-2 border-white transition-colors text-lg"
            >
              Find Your University
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
