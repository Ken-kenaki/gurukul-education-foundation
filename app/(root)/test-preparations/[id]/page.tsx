"use client";

import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Target,
  Award,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Type definitions
type SyllabusItem = {
  title: string;
  items: string[];
};

type TestPreparation = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  longDescription: string;
  duration: string;
  students: string;
  rating: number;
  features: string[];
  syllabus: SyllabusItem[];
  image: string;
  color: string;
};

const testPreparations = {
  ielts: {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    description:
      "Master the IELTS exam with our comprehensive preparation program designed to help you achieve your target band score.",
    longDescription:
      "Our IELTS preparation program is meticulously designed to help students achieve their desired band scores. We offer comprehensive training across all four modules: Listening, Reading, Writing, and Speaking. Our expert instructors provide personalized feedback and strategies tailored to your strengths and weaknesses. With regular mock tests and performance analysis, we ensure you're fully prepared for the actual exam.",
    duration: "8-12 weeks",
    students: "500+",
    rating: 4.8,
    features: [
      "Speaking practice with native speakers",
      "Writing task feedback and correction",
      "Listening comprehension exercises",
      "Reading strategies and techniques",
      "Mock tests and score prediction",
      "Flexible online and offline classes",
    ],
    syllabus: [
      {
        title: "Listening Module",
        items: [
          "Understanding different accents",
          "Note-taking techniques",
          "Predicting answers",
          "Time management",
        ],
      },
      {
        title: "Reading Module",
        items: [
          "Skimming and scanning techniques",
          "Understanding complex texts",
          "Time management strategies",
          "Answering different question types",
        ],
      },
      {
        title: "Writing Module",
        items: [
          "Task 1 (Academic/General) structure",
          "Task 2 essay writing",
          "Vocabulary enhancement",
          "Grammar and coherence",
        ],
      },
      {
        title: "Speaking Module",
        items: [
          "Fluency and coherence",
          "Lexical resource",
          "Grammatical range",
          "Pronunciation practice",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
    color: "from-blue-500 to-blue-600",
  },
  pte: {
    id: "pte",
    name: "PTE",
    fullName: "Pearson Test of English",
    description:
      "Excel in PTE Academic with our AI-powered preparation tools and expert guidance for computer-based English testing.",
    longDescription:
      "Our PTE Academic preparation program leverages cutting-edge technology to help you achieve your best possible score. We focus on the unique requirements of this computer-based test, providing specialized training for each question type. Our AI-powered tools give you instant feedback on your speaking and writing responses, while our expert instructors guide you through the most effective test-taking strategies.",
    duration: "6-10 weeks",
    students: "300+",
    rating: 4.7,
    features: [
      "AI-powered speaking practice",
      "Computer-based test simulation",
      "Automated scoring system",
      "Integrated skills training",
      "Real exam environment practice",
      "Personalized study plans",
    ],
    syllabus: [
      {
        title: "Speaking & Writing",
        items: [
          "Read aloud techniques",
          "Repeat sentence strategies",
          "Describe image templates",
          "Essay writing structure",
        ],
      },
      {
        title: "Reading",
        items: [
          "Multiple-choice strategies",
          "Re-order paragraphs",
          "Fill in the blanks",
          "Time management",
        ],
      },
      {
        title: "Listening",
        items: [
          "Summarize spoken text",
          "Multiple-choice answers",
          "Fill in the blanks",
          "Highlight correct summary",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    color: "from-green-500 to-green-600",
  },
  "japanese-language": {
    id: "japanese-language",
    name: "Japanese",
    fullName: "Japanese Language Proficiency Test (JLPT)",
    description:
      "Learn Japanese from basics to advanced levels with our structured curriculum designed for JLPT success.",
    longDescription:
      "Our Japanese language program offers comprehensive preparation for all levels of the JLPT (N5 to N1). We focus on all aspects of language learning including kanji, vocabulary, grammar, reading comprehension, and listening skills. Our native-speaking instructors provide cultural context and practical usage examples to enhance your learning experience. Whether you're starting from scratch or aiming for advanced proficiency, we have the right program for you.",
    duration: "12-24 weeks",
    students: "200+",
    rating: 4.9,
    features: [
      "Hiragana, Katakana, and Kanji training",
      "Grammar and vocabulary building",
      "Conversation practice with native speakers",
      "Cultural context and etiquette",
      "JLPT N5 to N1 level preparation",
      "Interactive learning materials",
    ],
    syllabus: [
      {
        title: "Language Basics",
        items: [
          "Hiragana and Katakana mastery",
          "Basic kanji characters",
          "Pronunciation and intonation",
          "Simple sentence structures",
        ],
      },
      {
        title: "Grammar & Vocabulary",
        items: [
          "Particles and their uses",
          "Verb conjugations",
          "Adjective forms",
          "JLPT-specific vocabulary",
        ],
      },
      {
        title: "Reading & Listening",
        items: [
          "Reading comprehension strategies",
          "Kanji recognition",
          "Listening comprehension",
          "Speed reading techniques",
        ],
      },
      {
        title: "Speaking & Writing",
        items: [
          "Conversation practice",
          "Formal vs informal speech",
          "Composition writing",
          "Presentation skills",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=500&fit=crop",
    color: "from-red-500 to-pink-500",
  },
  "korean-language": {
    id: "korean-language",
    name: "Korean",
    fullName: "Test of Proficiency in Korean (TOPIK)",
    description:
      "Master Korean language skills with our comprehensive program covering all aspects of TOPIK preparation.",
    longDescription:
      "Our Korean language program is designed to help you succeed in the TOPIK exam while developing practical language skills. We cover all aspects of the language including Hangul, grammar, vocabulary, reading, writing, listening, and speaking. Our curriculum is structured according to TOPIK levels (I and II) with special emphasis on exam strategies and time management. Cultural immersion activities enhance your understanding of the language in real-world contexts.",
    duration: "12-20 weeks",
    students: "250+",
    rating: 4.8,
    features: [
      "Hangul writing system mastery",
      "Grammar patterns and structures",
      "Listening and reading comprehension",
      "Speaking and writing practice",
      "TOPIK I and II preparation",
      "K-culture integration",
    ],
    syllabus: [
      {
        title: "Hangul & Basics",
        items: [
          "Hangul reading and writing",
          "Basic pronunciation",
          "Simple greetings",
          "Number systems",
        ],
      },
      {
        title: "Grammar & Vocabulary",
        items: [
          "Sentence structures",
          "Verb conjugations",
          "Particles and their uses",
          "TOPIK-specific vocabulary",
        ],
      },
      {
        title: "Reading & Writing",
        items: [
          "Reading comprehension",
          "Essay writing",
          "Formal vs informal writing",
          "Text analysis",
        ],
      },
      {
        title: "Listening & Speaking",
        items: [
          "Conversation practice",
          "Listening comprehension",
          "Pronunciation refinement",
          "Presentation skills",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=500&fit=crop",
    color: "from-purple-500 to-indigo-500",
  },
} as const;

type TestId = keyof typeof testPreparations;

interface PageProps {
  params: {
    id: string;
  };
}

export default function TestPreparationDetailPage({ params }: PageProps) {
  const test = testPreparations[params.id as TestId];

  if (!test) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2C3C81] mb-4">
            Test preparation not found
          </h1>
          <Link
            href="/test-preparations"
            className="text-[#C73D43] hover:underline"
          >
            Back to Test Preparations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/test-preparations"
            className="flex items-center text-[#2C3C81] hover:text-[#C73D43] transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Test Preparations
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-96 rounded-xl overflow-hidden mb-12"
        >
          <img
            src={test.image}
            alt={test.name}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${test.color} opacity-80`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {test.name} Preparation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                {test.fullName}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#2C3C81] mb-4">
                Overview
              </h2>
              <p className="text-[#2C3C81]/80 mb-6">{test.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#F5F4F5]">
                  <div className="flex items-center mb-2">
                    <Clock size={20} className="text-[#C73D43] mr-2" />
                    <span className="font-medium text-[#2C3C81]">Duration</span>
                  </div>
                  <p className="text-[#2C3C81]/70">{test.duration}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#F5F4F5]">
                  <div className="flex items-center mb-2">
                    <Users size={20} className="text-[#C73D43] mr-2" />
                    <span className="font-medium text-[#2C3C81]">Students</span>
                  </div>
                  <p className="text-[#2C3C81]/70">{test.students}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#F5F4F5]">
                  <div className="flex items-center mb-2">
                    <Star size={20} className="text-[#C73D43] mr-2" />
                    <span className="font-medium text-[#2C3C81]">Rating</span>
                  </div>
                  <p className="text-[#2C3C81]/70">{test.rating}/5</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#2C3C81] mb-4">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {test.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-[#F5F4F5]"
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#C73D43] mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-[#2C3C81]/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#2C3C81] mb-4">
                Course Syllabus
              </h2>
              <div className="space-y-4">
                {test.syllabus.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-[#F5F4F5] overflow-hidden"
                  >
                    <div className="bg-[#2C3C81] text-white px-4 py-3 font-medium">
                      {section.title}
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-[#C73D43] mr-2">•</span>
                            <span className="text-[#2C3C81]/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8 mb-8"
            >
              <h3 className="text-xl font-bold text-[#2C3C81] mb-4">
                Course Details
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <BookOpen size={20} className="text-[#C73D43] mr-3" />
                  <span className="text-[#2C3C81]/80">
                    Comprehensive {test.name} preparation
                  </span>
                </div>
                <div className="flex items-center">
                  <Target size={20} className="text-[#C73D43] mr-3" />
                  <span className="text-[#2C3C81]/80">
                    Exam-focused training
                  </span>
                </div>
                <div className="flex items-center">
                  <Award size={20} className="text-[#C73D43] mr-3" />
                  <span className="text-[#2C3C81]/80">
                    Certified instructors
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#C73D43] text-white py-3 rounded-lg hover:bg-[#2C3C81] transition-colors mb-4">
                <Link href="/contact">Get Consultation</Link>
              </button>

              <button className="w-full border border-[#2C3C81] text-[#2C3C81] py-3 rounded-lg hover:bg-[#2C3C81] hover:text-white transition-colors">
                Download Syllabus
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
