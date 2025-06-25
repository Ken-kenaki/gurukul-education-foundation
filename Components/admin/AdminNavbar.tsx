"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Image,
  FileText,
  Calendar,
  Globe,
  GraduationCap,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface User {
  email: string;
  name: string;
  $id: string;
}

interface AdminNavbarProps {
  user: User;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Stories", href: "/admin/stories", icon: BookOpen },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Forms", href: "/admin/forms", icon: FileText },
    { name: "Events & News", href: "/admin/events-news", icon: Calendar },
    { name: "Countries", href: "/admin/countries", icon: Globe },
    { name: "Universities", href: "/admin/universities", icon: GraduationCap },
  ];

  const sidebarVariants = {
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      width: "280px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    collapsed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "-100%",
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

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="hidden lg:flex fixed left-0 top-0 h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white z-40 flex-col shadow-lg border-r border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <motion.div
                variants={contentVariants}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-white" />
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <h2 className="text-lg font-bold">Admin Panel</h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={20} />
                </motion.div>
              </motion.button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  className="text-gray-500 dark:text-gray-300 text-sm mt-1"
                >
                  {user.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-300"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300"
                        }`}
                      >
                        <Icon size={20} />
                      </motion.div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="font-medium"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form action="/api/auth/signout" method="POST">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 w-full text-left group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-red-500"
                >
                  <LogOut size={20} />
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="font-medium"
                    >
                      Sign Out
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden fixed left-0 top-0 w-72 h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Home size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold">Admin Panel</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  {user.name}
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navigation.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 shadow-sm"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Icon size={20} className="flex-shrink-0" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form action="/api/auth/signout" method="POST">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 w-full text-left"
                  >
                    <LogOut size={20} className="text-red-500" />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar;
