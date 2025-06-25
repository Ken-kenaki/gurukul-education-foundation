"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Destination {
  name: string;
  route: string;
  flag: string;
}

interface TestPreparation {
  name: string;
  route: string;
  icon: string;
}

interface Service {
  name: string;
  route: string;
  icon: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const destinations: Destination[] = [
    { name: "South Korea", route: "/south-korea", flag: "🇰🇷" },
    { name: "Australia", route: "/australia", flag: "🇦🇺" },
    { name: "Japan", route: "/japan", flag: "🇯🇵" },
    { name: "UK", route: "/uk", flag: "🇬🇧" },
    { name: "Malta", route: "/malta", flag: "🇲🇹" },
  ];

  const testPreparations: TestPreparation[] = [
    {
      name: "IELTS Preparation",
      route: "/test-preparations/ielts",
      icon: "📝",
    },
    { name: "PTE Preparation", route: "/test-preparations/pte", icon: "💻" },
    {
      name: "Japanese Language",
      route: "/test-preparations/japanese-language",
      icon: "🇯🇵",
    },
    {
      name: "Korean Language",
      route: "/test-preparations/korean-language",
      icon: "🇰🇷",
    },
  ];

  const services: Service[] = [
    { name: "Study Abroad Consultation", route: "/services", icon: "🎓" },
    { name: "Visa Assistance", route: "/services", icon: "📋" },
    { name: "Scholarship Guidance", route: "/services", icon: "💰" },
    { name: "Test Preparations", route: "/services", icon: "📚" },
    { name: "Pre-Departure Briefing", route: "/services", icon: "✈️" },
    { name: "Post-Arrival Support", route: "/services", icon: "🤝" },
  ];

  // Handle click outside mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdown: string) => {
    setMobileDropdown(mobileDropdown === dropdown ? null : dropdown);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const mobileDropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      {/* Top Header Bar - Desktop Only */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : "-100%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:block bg-[#2C3C81] text-[#F5F4F5] py-2 px-4 text-sm fixed w-full z-50"
      >
        <div className="container mx-auto flex justify-end items-center gap-4 md:gap-6">
          <Link
            href="/news-offer"
            className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm whitespace-nowrap"
            aria-label="News and offers"
          >
            NEWS & OFFER
          </Link>
          <Link
            href="/gallery"
            className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm whitespace-nowrap"
            aria-label="Gallery"
          >
            GALLERY
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1 hover:text-[#B2ACCE] transition-colors text-xs md:text-sm whitespace-nowrap"
            aria-label="Login"
          >
            <span>LOGIN</span>
          </Link>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        ref={navbarRef}
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : "-100%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white shadow-lg fixed lg:top-[40px] top-0 z-40 w-full"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <Link
                href="/"
                className="text-2xl md:text-3xl font-bold"
                aria-label="Home"
              >
                <Image
                  alt="Gurukul education"
                  width={82} // Default width (for mobile)
                  height={82} // Default height (for mobile)
                  className="w-16 md:w-20 lg:w-[82px]" // Responsive width classes
                  src="/logo.png"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Study Destinations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("destinations")}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors py-4"
                  aria-label="Study destinations"
                >
                  <Link href="/countries" className="whitespace-nowrap">
                    STUDY DESTINATIONS
                  </Link>
                  <motion.div
                    animate={{
                      rotate: activeDropdown === "destinations" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === "destinations" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-72 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                    >
                      <div className="space-y-1 px-4">
                        {destinations.map((destination, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={destination.route}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F4F5] transition-colors group"
                              aria-label={`Study in ${destination.name}`}
                            >
                              <span className="text-2xl">
                                {destination.flag}
                              </span>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C3C81]">
                                {destination.name}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C73D43] group-hover:translate-x-1 transition-all ml-auto" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/universities"
                  className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors whitespace-nowrap"
                  aria-label="Universities"
                >
                  UNIVERSITIES
                </Link>
              </motion.div>

              {/* Test Preparations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("testprep")}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors py-4"
                  aria-label="Test preparations"
                >
                  <Link href="/test-preparations" className="whitespace-nowrap">
                    TEST PREPARATIONS
                  </Link>
                  <motion.div
                    animate={{
                      rotate: activeDropdown === "testprep" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === "testprep" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-72 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                    >
                      <div className="space-y-1 px-4">
                        {testPreparations.map((prep, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={prep.route}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F4F5] transition-colors group"
                              aria-label={`${prep.name} test preparation`}
                            >
                              <span className="text-xl">{prep.icon}</span>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C3C81]">
                                {prep.name}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C73D43] group-hover:translate-x-1 transition-all ml-auto" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors whitespace-nowrap"
                  aria-label="About us"
                >
                  ABOUT US
                </Link>
              </motion.div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("services")}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors py-4 whitespace-nowrap"
                  aria-label="Services"
                >
                  SERVICES
                  <motion.div
                    animate={{
                      rotate: activeDropdown === "services" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === "services" && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                    >
                      <div className="space-y-1 px-4">
                        {services.map((service, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={service.route}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F4F5] transition-colors group"
                              aria-label={service.name}
                            >
                              <span className="text-xl">{service.icon}</span>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C3C81] flex-1">
                                {service.name}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C73D43] group-hover:translate-x-1 transition-all" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/blog"
                  className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors whitespace-nowrap"
                  aria-label="Blog"
                >
                  BLOG
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-[#C73D43] text-[#F5F4F5] px-4 xl:px-6 py-2 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300 whitespace-nowrap"
                  aria-label="Get consultation"
                >
                  GET CONSULTATION
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              ref={hamburgerButtonRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden hover:scale-110 transition-transform duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                ref={mobileMenuRef}
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="lg:hidden fixed top-0 right-0 w-full max-w-xs bg-white h-screen z-50 shadow-xl overflow-y-auto"
              >
                <div className="p-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 hover:scale-110 transition-transform duration-200"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col space-y-6 mt-12"
                  >
                    {/* Mobile Top Nav Items */}
                    <div className="border-b pb-4 space-y-2">
                      <Link
                        href="/news-offer"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="News and offers"
                      >
                        NEWS & OFFER
                      </Link>
                      <Link
                        href="/gallery"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="Gallery"
                      >
                        GALLERY
                      </Link>
                      <Link
                        href="/login"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="Login"
                      >
                        LOGIN
                      </Link>
                    </div>

                    {/* Mobile Main Nav Items */}
                    <div className="space-y-4">
                      {/* Study Destinations Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href="/countries"
                            className="py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            STUDY DESTINATIONS
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileDropdown("destinations");
                            }}
                            aria-label="Toggle destinations dropdown"
                            className="p-2"
                          >
                            <motion.div
                              animate={{
                                rotate:
                                  mobileDropdown === "destinations" ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>
                        </div>
                        <AnimatePresence>
                          {mobileDropdown === "destinations" && (
                            <motion.div
                              variants={mobileDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {destinations.map((destination, index) => (
                                  <Link
                                    key={index}
                                    href={destination.route}
                                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#2C3C81] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    aria-label={`Study in ${destination.name}`}
                                  >
                                    <span className="text-xl">
                                      {destination.flag}
                                    </span>
                                    <span>{destination.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        href="/universities"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors border-b"
                        onClick={() => setIsOpen(false)}
                        aria-label="Universities"
                      >
                        UNIVERSITIES
                      </Link>

                      {/* Test Preparations Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href="/test-preparations"
                            className="py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            TEST PREPARATIONS
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileDropdown("testprep");
                            }}
                            aria-label="Toggle test preparations dropdown"
                            className="p-2"
                          >
                            <motion.div
                              animate={{
                                rotate: mobileDropdown === "testprep" ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>
                        </div>
                        <AnimatePresence>
                          {mobileDropdown === "testprep" && (
                            <motion.div
                              variants={mobileDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {testPreparations.map((prep, index) => (
                                  <Link
                                    key={index}
                                    href={prep.route}
                                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#2C3C81] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    aria-label={`${prep.name} test preparation`}
                                  >
                                    <span className="text-xl">{prep.icon}</span>
                                    <span>{prep.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        href="/about"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors border-b"
                        onClick={() => setIsOpen(false)}
                        aria-label="About us"
                      >
                        ABOUT US
                      </Link>

                      {/* Services Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href="/services"
                            className="py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            SERVICES
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileDropdown("services");
                            }}
                            aria-label="Toggle services dropdown"
                            className="p-2"
                          >
                            <motion.div
                              animate={{
                                rotate: mobileDropdown === "services" ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>
                        </div>
                        <AnimatePresence>
                          {mobileDropdown === "services" && (
                            <motion.div
                              variants={mobileDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {services.map((service, index) => (
                                  <Link
                                    key={index}
                                    href={service.route}
                                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#2C3C81] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    aria-label={service.name}
                                  >
                                    <span className="text-xl">
                                      {service.icon}
                                    </span>
                                    <span>{service.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        href="/blog"
                        className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium transition-colors border-b"
                        onClick={() => setIsOpen(false)}
                        aria-label="Blog"
                      >
                        BLOG
                      </Link>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/contact"
                        className="w-full bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300 text-center block"
                        onClick={() => setIsOpen(false)}
                        aria-label="Get consultation"
                      >
                        GET CONSULTATION
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
