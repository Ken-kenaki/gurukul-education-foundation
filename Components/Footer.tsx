import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

interface FooterLink {
  name: string;
  url: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  text: string;
  url?: string;
  isLink?: boolean;
}

export default function Footer() {
  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={20} />, url: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, url: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, url: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" },
    { icon: <Youtube size={20} />, url: "#", label: "YouTube" },
  ];

  const quickLinks: FooterLink[] = [
    { name: "Home", url: "/" },
    { name: "Study Destinations", url: "/countries" },
    { name: "Universities", url: "/universities" },
    { name: "Test Preparations", url: "/test-preparations" },
    { name: "About Us", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" },
  ];

  const destinations: FooterLink[] = [
    { name: "South Korea", url: "/south-korea" },
    { name: "Australia", url: "/australia" },
    { name: "Japan", url: "/japan" },
    { name: "UK", url: "/uk" },
    { name: "Malta", url: "/malta" },
  ];

  const testPreparations: FooterLink[] = [
    { name: "IELTS Preparation", url: "/test-preparations/ielts" },
    { name: "PTE Preparation", url: "/test-preparations/pte" },
    { name: "Japanese Language", url: "/test-preparations/japanese-language" },
    { name: "Korean Language", url: "/test-preparations/korean-language" },
  ];

  const contactInfo: ContactInfo[] = [
    {
      icon: <MapPin className="flex-shrink-0 mt-1 text-[#C73D43]" size={18} />,
      text: "Gurukul Education Foundation, Kathmandu, Nepal",
    },
    {
      icon: <Phone className="text-[#C73D43]" size={18} />,
      text: "+977-9844162726",
      url: "tel:+9779844162726",
      isLink: true,
    },
    {
      icon: <Mail className="text-[#C73D43]" size={18} />,
      text: "info@gurukuleducation.com",
      url: "mailto:info@gurukuleducation.com",
      isLink: true,
    },
    {
      icon: <Clock className="text-[#C73D43]" size={18} />,
      text: "Mon-Fri: 9:00 AM - 6:00 PM",
    },
    {
      icon: <Clock className="text-[#C73D43]" size={18} />,
      text: "Sat: 10:00 AM - 4:00 PM",
    },
    {
      icon: <Clock className="text-[#C73D43]" size={18} />,
      text: "Sun: Closed",
    },
  ];

  const legalLinks: FooterLink[] = [
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Sitemap", url: "/sitemap" },
  ];

  return (
    <footer className="bg-[#2C3C81] text-[#F5F4F5] pt-12 pb-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="text-[#F5F4F5]">Gurukul</span>
              <span className="text-[#C73D43]">Education</span>
            </h2>
            <p className="text-[#B2ACCE] text-sm sm:text-base">
              Transforming dreams into global education realities.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className="text-[#B2ACCE] hover:text-[#C73D43] transition-colors duration-200"
                  aria-label={`Visit our ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-[#B2ACCE]">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="hover:text-[#C73D43] transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">
              Study Destinations
            </h3>
            <ul className="space-y-2 text-[#B2ACCE]">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <Link
                    href={destination.url}
                    className="hover:text-[#C73D43] transition-colors duration-200 text-sm sm:text-base"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">Contact Us</h3>
            <ul className="space-y-3 text-[#B2ACCE]">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span aria-hidden="true">{info.icon}</span>
                  {info.isLink && info.url ? (
                    <Link
                      href={info.url}
                      className="hover:text-[#C73D43] transition-colors duration-200 text-sm sm:text-base"
                    >
                      {info.text}
                    </Link>
                  ) : (
                    <span className="text-sm sm:text-base">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#B2ACCE]/30 my-6 sm:my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#B2ACCE] text-xs sm:text-sm">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Gurukul Education. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="hover:text-[#C73D43] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
