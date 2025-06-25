"use client";

import { motion } from "framer-motion";
import { section } from "framer-motion/client";
import {
  Award,
  Users,
  Globe,
  BookOpen,
  Target,
  Heart,
  Star,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { icon: Users, number: "10,000+", label: "Students Guided" },
    { icon: Globe, number: "15+", label: "Countries" },
    { icon: BookOpen, number: "500+", label: "Universities" },
    { icon: Award, number: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, ensuring the highest quality of service for our students.",
    },
    {
      icon: Heart,
      title: "Care",
      description:
        "We genuinely care about each student's success and provide personalized support throughout their journey.",
    },
    {
      icon: Globe,
      title: "Global Vision",
      description:
        "We help students think globally and prepare them for success in an interconnected world.",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description:
        "Gurukul Education Foundation was established with a vision to make international education accessible.",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Expanded services to include test preparation and visa assistance.",
    },
    {
      year: "2018",
      title: "Recognition",
      description:
        "Received recognition as Nepal's leading education consultancy.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online services and virtual consultations.",
    },
    {
      year: "2023",
      title: "Global Partnerships",
      description: "Established partnerships with 500+ universities worldwide.",
    },
  ];

  const team = [
    {
      name: "Dr. Rajesh Sharma",
      position: "Founder & CEO",
      image: "/logo.png",
      description:
        "With over 15 years of experience in international education, Dr. Sharma has guided thousands of students to achieve their dreams.",
    },
    {
      name: "Ms. Priya Patel",
      position: "Director of Operations",
      image: "/logo.png",
      description:
        "Priya oversees all operational aspects and ensures seamless service delivery to our students.",
    },
    {
      name: "Mr. Arjun Singh",
      position: "Head of Counseling",
      image: "/logo.png",
      description:
        "Arjun leads our counseling team and specializes in university selection and application strategies.",
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="w-full max-w-[100vw] min-h-screen pt-32 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 px-4"
        >
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2C3C81] mb-6">
              About Gurukul Education Foundation
            </h1>
            <p className="text-xl text-[#2C3C81]/80 max-w-3xl mx-auto">
              Transforming dreams into reality through expert guidance and
              unwavering support in international education since 2010.
            </p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-white"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-[#F5F4F5] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-10 h-10 text-[#C73D43]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#2C3C81]/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-[#2C3C81]/80">
                  <p className="text-lg">
                    Founded in 2010, Gurukul Education Foundation began with a
                    simple mission: to make international education accessible
                    to every deserving student. What started as a small
                    consultancy has grown into Nepal's most trusted education
                    partner.
                  </p>
                  <p>
                    Our founders, having experienced the challenges of studying
                    abroad firsthand, understood the need for comprehensive
                    support that goes beyond just application assistance. Today,
                    we provide end-to-end services that ensure our students not
                    only get admitted to their dream universities but also
                    thrive in their new academic environment.
                  </p>
                  <p>
                    With partnerships across 15+ countries and relationships
                    with over 500 universities worldwide, we continue to expand
                    opportunities for our students while maintaining the
                    personalized touch that sets us apart.
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    fill
                    src="/why-us-3.jpeg"
                    alt="Students studying"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C3C81]/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-white"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#B2ACCE]/30"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                      }`}
                    >
                      <div className="bg-[#F5F4F5] rounded-xl p-6 shadow-lg">
                        <div className="text-2xl font-bold text-[#C73D43] mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-[#2C3C81] mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-[#2C3C81]/80">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-[#C73D43] rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-8 rounded-xl bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-[#F5F4F5] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-10 h-10 text-[#C73D43]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3C81] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#2C3C81]/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-white"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center bg-[#F5F4F5] rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3C81] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#C73D43] font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-[#2C3C81]/80">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
              Why Choose Gurukul Education Foundation?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Personalized counseling for each student",
                "Expert guidance from experienced counselors",
                "Comprehensive test preparation programs",
                "Strong university partnerships worldwide",
                "High visa success rate (98%)",
                "Post-arrival support and assistance",
                "Scholarship guidance and application support",
                "Regular workshops and seminars",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-[#C73D43] flex-shrink-0" />
                  <span className="text-[#2C3C81]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-[#2C3C81]"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their
              international education dreams with our guidance.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C73D43] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#2C3C81] transition-colors"
            >
              Get Free Consultation
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
