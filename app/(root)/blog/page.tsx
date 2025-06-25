// app/why-choose-gurukul/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const COUNTRIES = {
  southKorea: {
    name: "South Korea",
    universities: [
      "Jeju Tourism University",
      "Baekseok University",
      "Sunmoon University",
      "Daeshin University",
      "Sungkyul University",
    ],
  },
  australia: {
    name: "Australia",
    universities: [
      "The University of Melbourne",
      "Monash University",
      "University of New South Wales (UNSW Sydney)",
      "University of Queensland (UQ)",
      "Deakin University",
      "Hitech Institute Australia",
    ],
  },
  malta: {
    name: "Malta",
    universities: ["University of Central Lancashire (UCLan Malta)"],
  },
  japan: {
    name: "Japan",
    universities: ["Coming Soon"],
  },
  uk: {
    name: "United Kingdom",
    universities: ["Coming Soon"],
  },
};

const SERVICES = [
  "Study Abroad Consulting (Korea, Japan, UK, Australia, Malta)",
  "Test Preparation (IELTS, PTE, Japanese, Korean)",
  "Visa Application Assistance",
  "Pre-Departure Orientation",
  "Post-Arrival Support",
];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Gurukul helped me secure admission at Monash University with a 30% scholarship. Their visa guidance was impeccable!",
    author: "Ramesh S.",
    location: "Australia",
  },
  {
    id: 2,
    quote:
      "The Japanese language course prepared me perfectly for JLPT N3. The teachers are so patient and knowledgeable.",
    author: "Anjali M.",
    location: "Japan",
  },
];

const PROCESS_STEPS = [
  {
    title: "Career Counseling",
    description: "Personalized session to understand your goals",
  },
  {
    title: "University Matching",
    description: "Find the perfect institution for your needs",
  },
  {
    title: "Application Support",
    description: "Document preparation and verification",
  },
];

export default function WhyChooseGurukul() {
  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] bg-white">
        {/* Enhanced Hero Section */}
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/why-us-1.jpeg"
              alt="Students studying abroad with Gurukul Education Foundation"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-600/30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl text-center mx-auto"
              >
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="block">Unlock Your Global</span>
                  <span className="block text-blue-300">
                    Education Potential
                  </span>
                </h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto"
                >
                  Trusted by hundreds of students for premium study abroad
                  consulting and language training
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300"
                  >
                    Explore Our Services
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 shadow-xl transition-all duration-300"
                  >
                    Free Consultation
                  </motion.button>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-4xl mx-auto border border-white/20"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm opacity-80">Students Helped</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">20+</div>
                      <div className="text-sm opacity-80">
                        Partner Universities
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">95%</div>
                      <div className="text-sm opacity-80">
                        Visa Success Rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">5</div>
                      <div className="text-sm opacity-80">Countries</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce flex flex-col items-center">
              <span className="text-white text-sm mb-2">Scroll Down</span>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="py-16 container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
            Why Choose Gurukul Education Foundation?
          </h2>
          <p className="text-lg text-center max-w-4xl mx-auto">
            Established in 2022 with offices in Kumaripati, Lalitpur and
            Kawasoti, Nawalparasi, Gurukul Education Foundation is your trusted
            partner for international education. We specialize in helping
            Nepalese students achieve their dreams of studying abroad.
          </p>
        </motion.section>

        {/* University Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-8 text-blue-800"
            >
              Our Partner Universities
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(COUNTRIES).map(([key, country]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-700">
                    {country.name}
                  </h3>
                  <ul className="space-y-2">
                    {country.universities.map((uni, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span>{uni}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Test Preparation */}
        <section className="py-16 container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-blue-800"
          >
            Test Preparation Services
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "IELTS", color: "bg-red-100 text-red-800" },
              { name: "PTE", color: "bg-blue-100 text-blue-800" },
              {
                name: "Japanese Language",
                color: "bg-yellow-100 text-yellow-800",
              },
              { name: "Korean Language", color: "bg-green-100 text-green-800" },
            ].map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-lg shadow-md text-center ${test.color} hover:shadow-lg transition-transform hover:-translate-y-1`}
              >
                <h3 className="text-xl font-bold">{test.name}</h3>
                <p className="mt-2">
                  High success rate with expert instructors
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-8 text-blue-800"
            >
              Our Simple 3-Step Process
            </motion.h2>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>
              <div className="space-y-8 md:space-y-0">
                {PROCESS_STEPS.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`md:w-1/2 p-4 ${
                        index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold text-blue-700">
                          {step.title}
                        </h3>
                        <p className="mt-2">{step.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-blue-800"
          >
            Success Stories
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="italic text-lg mb-4">"{testimonial.quote}"</p>
                <p className="font-bold text-blue-700">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.location}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Start Your Journey Today
            </motion.h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit our offices in Kumaripati or Kawasoti, or contact us online
              to schedule your free consultation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Contact Us Now
            </motion.button>
          </div>
        </section>
      </div>
    </main>
  );
}
