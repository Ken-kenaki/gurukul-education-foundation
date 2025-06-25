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

export default function JapanPage() {
  const stats = [
    { value: "¥535,800-1,500,000", label: "Annual Tuition Fees" },
    { value: "¥80,000-120,000", label: "Monthly Living Costs" },
    { value: "700+", label: "English Taught Programs" },
    { value: "#3", label: "Safest Country Worldwide" },
  ];

  const reasons = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Academic Excellence",
      description:
        "Japan boasts world-renowned universities like University of Tokyo and Kyoto University with cutting-edge research facilities.",
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Scholarship Options",
      description:
        "MEXT and JASSO scholarships available for international students covering tuition and living expenses.",
    },
    {
      icon: <ScrollText className="w-8 h-8" />,
      title: "Work While Studying",
      description:
        "Students can work up to 28 hours/week with proper permission, great for gaining experience.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Safe & Clean",
      description:
        "Japan consistently ranks as one of the safest countries with impeccable public cleanliness.",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Cultural Experience",
      description:
        "Unique opportunity to experience traditional and modern Japanese culture firsthand.",
    },
  ];

  const otherCountries = [
    { name: "South Korea", flag: "🇰🇷", link: "/south-korea" },
    { name: "Malta", flag: "🇲🇹", link: "/malta" },
    { name: "Australia", flag: "🇦🇺", link: "/australia" },
    { name: "UK", flag: "🇬🇧", link: "/uk" },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] bg-white pt-15">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#BC002D] to-[#003580] text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Study in <span className="text-yellow-300">Japan</span> 🇯🇵
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            >
              Discover world-class education in the land of innovation and
              tradition
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="#why-japan"
                className="px-6 py-3 bg-white text-[#BC002D] rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Why Choose Japan
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#002562] transition-colors"
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
                <p className="text-2xl font-bold text-[#BC002D]">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Japan Section */}
        <section id="why-japan" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#BC002D]"
            >
              Why Study in Japan?
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
                  <div className="text-[#003580] mb-4">{reason.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-[#BC002D]">
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
                <h2 className="text-3xl font-bold mb-6 text-[#BC002D]">
                  Education System in Japan
                </h2>
                <p className="text-gray-600 mb-4">
                  Japan's higher education system includes national, public, and
                  private universities. The academic year typically runs from
                  April to March, with two semesters (April-September and
                  October-March).
                </p>
                <p className="text-gray-600 mb-6">
                  Many universities now offer English-taught degree programs,
                  especially at graduate level. Japanese language proficiency is
                  not always required but is highly beneficial for daily life.
                </p>
                <Link
                  href="/universities?country=japan"
                  className="inline-flex items-center px-6 py-3 bg-[#BC002D] text-white rounded-lg font-medium hover:bg-[#9a0025] transition-colors"
                >
                  View Programs in Japan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-100 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-[#003580]">
                  Key Features:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#BC002D] mr-2">✓</span>
                    <span>Bachelor's: 4 years (6 for medicine)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#BC002D] mr-2">✓</span>
                    <span>Master's: 2 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#BC002D] mr-2">✓</span>
                    <span>Doctorate: 3-5 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#BC002D] mr-2">✓</span>
                    <span>Strong focus on research and innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#BC002D] mr-2">✓</span>
                    <span>Internship opportunities with leading companies</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Living in Japan */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-[#BC002D]"
                >
                  Student Life in Japan
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-4"
                >
                  Japan offers an exceptional quality of life with its efficient
                  public transport, rich culture, and blend of traditional and
                  modern lifestyles.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#003580]">
                    Cost of Living
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accommodation: ¥30,000-80,000/month</li>
                    <li>• Food: ¥30,000-50,000/month</li>
                    <li>• Transportation: ¥5,000-10,000/month</li>
                    <li>• Health Insurance: ¥2,000/month</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#003580]">
                    Student Support
                  </h3>
                  <p className="text-gray-600">
                    Universities provide extensive support for international
                    students including orientation programs, Japanese language
                    courses, housing assistance, and career counseling.
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
                <h3 className="text-xl font-bold mb-4 text-[#BC002D]">
                  Student Visa Requirements
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>Certificate of Eligibility (COE) from school</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>Valid passport</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>Proof of financial support (¥1.5-2M/year)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>Completed visa application form</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>Passport-sized photos</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services/visa-assistance"
                    className="inline-flex items-center px-6 py-3 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#002562] transition-colors"
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
        <section className="py-16 bg-[#BC002D] text-white">
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
                className="inline-flex items-center px-6 py-3 bg-white text-[#BC002D] rounded-lg font-medium hover:bg-gray-100 transition-colors"
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
              className="text-3xl font-bold mb-6 text-[#BC002D]"
            >
              Ready to Study in Japan?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Our Japan education specialists can guide you through university
              selection, applications, scholarships, and visa process.
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
                className="px-8 py-4 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#002562] transition-colors text-lg"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/scholarships?country=japan"
                className="px-8 py-4 bg-white text-[#BC002D] rounded-lg font-medium hover:bg-gray-100 border border-gray-300 transition-colors text-lg"
              >
                View Scholarships
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
