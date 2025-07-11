// components/VisaRequirements.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface VisaRequirement {
  $id: string;
  title: string;
  requirements: string[];
  ctaText: string;
  ctaLink: string;
}

export default function VisaRequirements({
  countryName,
}: {
  countryName: string;
}) {
  const [requirements, setRequirements] = useState<VisaRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch(
          `/api/visa-requirements?countryName=${encodeURIComponent(
            countryName
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch visa requirements");
        const data = await response.json();
        setRequirements(data.documents);
      } catch (error) {
        console.error("Error fetching visa requirements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [countryName]);

  if (loading) {
    return (
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          Loading visa requirements...
        </div>
      </div>
    );
  }

  if (!requirements.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-white"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] text-center mb-12">
          Visa Requirements for {countryName}
        </h2>

        <div className="max-w-3xl mx-auto">
          {requirements.map((requirement, index) => (
            <motion.div
              key={requirement.$id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[#BC002D]">
                {requirement.title}
              </h3>
              <ul className="space-y-4 mb-6">
                {requirement.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#003580] mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={requirement.ctaLink}
                  className="inline-flex items-center px-6 py-3 bg-[#003580] text-white rounded-lg font-medium hover:bg-[#002562] transition-colors"
                >
                  {requirement.ctaText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
