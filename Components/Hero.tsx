"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StatData {
  value: string;
  label: string;
}

interface FloatingCard {
  position: string;
  bg: string;
  text: string;
  title: string;
  value: string;
}

export default function HeroSection(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const addToRefs = useCallback(
    (
        refsArray: React.MutableRefObject<(HTMLElement | null)[]>,
        index: number
      ) =>
      (el: HTMLElement | null): void => {
        refsArray.current[index] = el;
      },
    []
  );

  const addToFloatingRefs = useCallback(
    (index: number) =>
      (el: HTMLDivElement | null): void => {
        floatingCardsRef.current[index] = el;
      },
    []
  );

  useEffect(() => {
    const animateElements = (): void => {
      // Animate text elements
      textElementsRef.current.forEach((el, index) => {
        if (el) {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          setTimeout(() => {
            el.style.transition = "all 0.8s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 100);
        }
      });

      // Animate image container
      if (imageContainerRef.current) {
        imageContainerRef.current.style.opacity = "0";
        imageContainerRef.current.style.transform = "scale(0.9)";
        setTimeout(() => {
          if (imageContainerRef.current) {
            imageContainerRef.current.style.transition = "all 1s ease-out";
            imageContainerRef.current.style.opacity = "1";
            imageContainerRef.current.style.transform = "scale(1)";
          }
        }, 400);
      }

      // Animate buttons
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        Array.from(buttons).forEach((button, index) => {
          const buttonElement = button as HTMLElement;
          buttonElement.style.opacity = "0";
          buttonElement.style.transform = "translateY(20px)";
          setTimeout(() => {
            buttonElement.style.transition = "all 0.6s ease-out";
            buttonElement.style.opacity = "1";
            buttonElement.style.transform = "translateY(0)";
          }, 600 + index * 100);
        });
      }

      // Animate floating cards
      floatingCardsRef.current.forEach((card, index) => {
        if (card) {
          card.style.opacity = "0";
          card.style.transform = `translateY(50px) translateX(${
            index % 2 === 0 ? "30px" : "-30px"
          }) scale(0.8)`;
          setTimeout(() => {
            if (card) {
              card.style.transition =
                "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0) translateX(0) scale(1)";
            }
          }, 800 + index * 150);
        }
      });
    };

    animateElements();
  }, []);

  const statsData: StatData[] = [
    { value: "98%", label: "Success Rate" },
    { value: "50+", label: "Universities" },
    { value: "15+", label: "Countries" },
  ];

  const floatingCardsData: FloatingCard[] = [
    {
      position: "top-4 right-0",
      bg: "bg-[#2C3C81]",
      text: "text-[#F5F4F5]",
      title: "IELTS/TOEFL",
      value: "Expert Prep",
    },
    {
      position: "top-1/2 left-0",
      bg: "bg-[#C73D43]",
      text: "text-[#F5F4F5]",
      title: "Scholarships",
      value: "$2M+ Secured",
    },
    {
      position: "bottom-1/3 right-0",
      bg: "bg-[#B2ACCE]",
      text: "text-[#2C3C81]",
      title: "Visa Success",
      value: "98% Rate",
    },
    {
      position: "bottom-4 left-0",
      bg: "bg-[#2C3C81]",
      text: "text-[#F5F4F5]",
      title: "Since",
      value: "2010",
    },
  ];

  return (
    <div
      ref={heroRef}
      className="bg-[#F5F4F5] min-h-screen lg:pt-50 pt-24 pb-8 md:pb-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <div
                ref={addToRefs(textElementsRef, 0)}
                className="inline-block bg-[#B2ACCE]/30 text-[#2C3C81] px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium"
              >
                Trusted by 10,000+ Students Worldwide
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span
                  ref={addToRefs(textElementsRef, 1)}
                  className="text-[#2C3C81] block"
                >
                  Your Gateway to{" "}
                </span>
                <span
                  ref={addToRefs(textElementsRef, 2)}
                  className="text-[#C73D43] block"
                >
                  Global
                </span>
                <span
                  ref={addToRefs(textElementsRef, 3)}
                  className="text-[#C73D43] block"
                >
                  Education{" "}
                </span>
                <span
                  ref={addToRefs(textElementsRef, 4)}
                  className="text-[#2C3C81] block"
                >
                  Excellence
                </span>
              </h1>

              <p
                ref={addToRefs(textElementsRef, 5)}
                className="text-[#2C3C81]/80 text-base md:text-lg max-w-lg leading-relaxed"
              >
                At Gurukul Education Foundation, we transform dreams into
                reality. Expert guidance, comprehensive test prep, and
                personalized support for your international education journey.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+1234567890" // Replace with your actual phone number
                className="group flex items-center justify-center space-x-2 bg-[#C73D43] text-[#F5F4F5] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:shadow-lg transition-all duration-300 shadow-md"
                aria-label="Call us to start your education journey"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/contact"
                className="group flex items-center justify-center space-x-2 bg-transparent border-2 border-[#2C3C81] text-[#2C3C81] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:text-[#F5F4F5] hover:shadow-lg transition-all duration-300"
                aria-label="Go to contact page for free consultation"
              >
                <span>📞</span>
                <span className="text-sm md:text-base">
                  BOOK FREE CONSULTATION
                </span>
              </Link>
            </div>

            {/* Success Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#B2ACCE]/30">
              {statsData.map((stat, index) => (
                <div
                  key={`stat-${index}`}
                  ref={addToRefs(textElementsRef, 6 + index)}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#C73D43]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-[#2C3C81]/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image with Floating Elements */}
          <div className="relative mt-8 lg:mt-0">
            <div
              ref={imageContainerRef}
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden flex items-center justify-center"
            >
              {/* Hero Image */}
              <Image
                src="/girl.png"
                alt="Students studying abroad - Gurukul Education Foundation"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Enhanced Floating Cards */}
              {floatingCardsData.map((card, index) => (
                <div
                  key={`card-${index}`}
                  ref={addToFloatingRefs(index)}
                  className={`absolute ${card.position} ${card.bg} ${card.text} px-4 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer z-10 hover:z-20 hover:scale-110 hover:-translate-y-1 hover:shadow-xl`}
                  aria-label={`${card.title}: ${card.value}`}
                >
                  <div className="text-xs opacity-80">{card.title}</div>
                  <div className="font-bold text-sm">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
