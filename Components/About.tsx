"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe, BookOpen, Target, Heart } from "lucide-react";
import Image from "next/image";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
}

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export default function AboutSection() {
  const stats: StatItem[] = [
    { icon: Users, number: "10,000+", label: "Students Guided" },
    { icon: Globe, number: "15+", label: "Countries" },
    { icon: BookOpen, number: "500+", label: "Universities" },
    { icon: Award, number: "98%", label: "Success Rate" },
  ];

  const values: ValueItem[] = [
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

  return (
    <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3C81] mb-3 sm:mb-4">
            About Gurukul Education Foundation
          </h2>
          <p className="text-base sm:text-lg text-[#2C3C81]/80 max-w-3xl mx-auto">
            For over a decade, we've been transforming dreams into reality,
            helping students achieve their international education goals with
            expert guidance and unwavering support.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 sm:p-0"
            >
              <div className="bg-[#F5F4F5] rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#C73D43]" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C3C81] mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-[#2C3C81]/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16"
        >
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C3C81] mb-4 sm:mb-6">
              Our Story
            </h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#2C3C81]/80">
              <p>
                Founded in 2010, Gurukul Education Foundation began with a
                simple mission: to make international education accessible to
                every deserving student. What started as a small consultancy has
                grown into Nepal's most trusted education partner.
              </p>
              <p>
                Our founders, having experienced the challenges of studying
                abroad firsthand, understood the need for comprehensive support
                that goes beyond just application assistance. Today, we provide
                end-to-end services that ensure our students not only get
                admitted to their dream universities but also thrive in their
                new academic environment.
              </p>
              <p>
                With partnerships across 15+ countries and relationships with
                over 500 universities worldwide, we continue to expand
                opportunities for our students while maintaining the
                personalized touch that sets us apart.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                alt="Students studying"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3C81]/20 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C3C81] text-center mb-8 sm:mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-[#F5F4F5] hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <value.icon className="w-5 h-5 sm:w-8 sm:h-8 text-[#C73D43]" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#2C3C81] mb-2 sm:mb-3">
                  {value.title}
                </h4>
                <p className="text-sm sm:text-base text-[#2C3C81]/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
