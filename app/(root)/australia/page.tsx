"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sun,
  Award,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";

export default function AustraliaPage() {
  const highlights = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Top Ranked Universities",
      value: "7 in Top 100 Worldwide",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Post-Study Work Rights",
      value: "2-6 Years After Graduation",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multicultural Society",
      value: "30% International Students",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Best Student Cities",
      value: "Melbourne & Sydney Top 10",
    },
  ];

  const studyOptions = [
    {
      title: "Vocational Education",
      description:
        "Practical courses at TAFE institutes leading to diplomas and advanced diplomas",
      duration: "1-2 Years",
      path: "/vocational",
    },
    {
      title: "Undergraduate",
      description:
        "Bachelor's degrees with options for double majors and honors",
      duration: "3-4 Years",
      path: "/undergraduate",
    },
    {
      title: "Postgraduate",
      description: "Master's by coursework or research, including MBA programs",
      duration: "1-2 Years",
      path: "/postgraduate",
    },
    {
      title: "Research Degrees",
      description: "PhD and research master's with world-class facilities",
      duration: "3-4 Years",
      path: "/research",
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] bg-white pt-15">
        {/* Hero Section with Australian Theme */}
        <div className="relative bg-gradient-to-b from-[#012169] to-[#E4002B] text-white py-20 md:py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/australia-pattern.svg')] bg-repeat opacity-50"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Study in <span className="text-yellow-300">Australia</span> 🇦🇺
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            >
              World-class education with unbeatable lifestyle and work
              opportunities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="#highlights"
                className="px-6 py-3 bg-white text-[#012169] rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Why Australia
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#E4002B] text-white rounded-lg font-medium hover:bg-[#C40025] transition-colors"
              >
                Free Assessment
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Highlights Grid */}
        <section id="highlights" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#012169]"
            >
              Australia at a Glance
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="bg-[#012169]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#E4002B]">
                    {item.title}
                  </h3>
                  <p className="text-xl font-bold text-[#012169]">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Options - Card Deck */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center text-[#012169]"
            >
              Study Pathways in Australia
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-[#012169] to-[#012169]/90 text-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="mb-4 opacity-90">{option.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-[#E4002B] px-3 py-1 rounded-full text-sm font-medium">
                        {option.duration}
                      </span>
                      <Link
                        href={option.path}
                        className="text-white hover:text-yellow-200 transition-colors flex items-center"
                      >
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Living in Australia - Split Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold mb-6 text-[#E4002B]">
                  Student Life Down Under
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#012169]">
                      Work Rights
                    </h3>
                    <p className="text-gray-700">
                      International students can work up to 48 hours per
                      fortnight during studies and unlimited during holidays.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#012169]">
                      Cost of Living
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                        <span>Accommodation: AUD$300-600/week</span>
                      </li>
                      <li className="flex items-start">
                        <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                        <span>Food: AUD$150-300/week</span>
                      </li>
                      <li className="flex items-start">
                        <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                        <span>Transport: AUD$30-60/week</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:w-1/2 bg-white p-8 rounded-xl shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#012169]">
                  Visa Requirements
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#E4002B] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      1
                    </div>
                    <span>
                      Confirmation of Enrollment (CoE) from Australian
                      institution
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#E4002B] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      2
                    </div>
                    <span>Proof of financial capacity (AUD$21,041/year)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#E4002B] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      3
                    </div>
                    <span>Overseas Student Health Cover (OSHC)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#E4002B] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      4
                    </div>
                    <span>English proficiency (IELTS/TOEFL/PTE)</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services/visa-assistance"
                    className="inline-flex items-center px-6 py-3 bg-[#012169] text-white rounded-lg font-medium hover:bg-[#011155] transition-colors"
                  >
                    Get Visa Help
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#012169] to-[#E4002B] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Ready for an Australian Adventure?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Our MARA-registered agents can help you find the perfect course
              and navigate the visa process.
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
                href="/australia-university-finder"
                className="px-8 py-4 bg-transparent text-white rounded-lg font-medium hover:bg-white/10 border-2 border-white transition-colors text-lg"
              >
                Find Courses
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
