"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterConfig {
  element: React.RefObject<HTMLDivElement>;
  end: number;
  suffix: string;
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const universityRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    students: 0,
    universities: 0,
    countries: 0,
  });

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statistics");
        if (!response.ok) throw new Error("Failed to fetch statistics");
        const data = await response.json();

        // Assuming your API returns an array of stats
        const statsData = data.documents.reduce((acc: any, stat: any) => {
          acc[stat.name] = stat.count;
          return acc;
        }, {});

        setStats({
          students: statsData.students || 10000,
          universities: statsData.universities || 100,
          countries: statsData.countries || 5,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Fallback to default values
        setStats({
          students: 10000,
          universities: 100,
          countries: 5,
        });
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!stats.students || !stats.universities || !stats.countries) return;

    const counters: CounterConfig[] = [
      { element: studentRef, end: stats.students, suffix: "+" },
      { element: universityRef, end: stats.universities, suffix: "+" },
      { element: countryRef, end: stats.countries, suffix: "+" },
    ];

    counters.forEach((counter) => {
      if (!counter.element.current) return;

      gsap.to(counter.element.current, {
        innerText: counter.end,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        snap: { innerText: 1 },
        onUpdate: function () {
          if (counter.element.current) {
            counter.element.current.innerText =
              Math.floor(
                Number(
                  (this.targets()[0] as HTMLDivElement).innerText.replace(
                    /[^0-9]/g,
                    ""
                  )
                )
              ) + counter.suffix;
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stats]); // Re-run animation when stats change

  return (
    <section
      ref={sectionRef}
      className="bg-[#2C3C81] text-[#F5F4F5] py-16 md:py-20 px-4"
      aria-label="Our achievements"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-24">
          {/* Students Counter */}
          <div className="text-center">
            <div
              ref={studentRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-lg md:text-xl lg:text-2xl">Students</div>
          </div>

          {/* Universities Counter */}
          <div className="text-center">
            <div
              ref={universityRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-lg md:text-xl lg:text-2xl">Universities</div>
          </div>

          {/* Countries Counter */}
          <div className="text-center">
            <div
              ref={countryRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-lg md:text-xl lg:text-2xl">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}
