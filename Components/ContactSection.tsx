"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+977-9844162726",
      link: "tel:+9779844162726",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@gurukuleducation.com",
      link: "mailto:info@gurukuleducation.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Kathmandu, Nepal",
      link: "#",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon-Fri: 9AM - 6PM",
      link: "#",
    },
  ];

  return (
    <section className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-[#2C3C81]/80 max-w-2xl mx-auto">
            Ready to start your international education journey? Contact us today 
            for a free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#2C3C81] mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-[#C73D43] rounded-full p-3">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2C3C81] mb-1">
                        {info.title}
                      </h4>
                      {info.link !== "#" ? (
                        <a
                          href={info.link}
                          className="text-[#2C3C81]/80 hover:text-[#C73D43] transition-colors"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-[#2C3C81]/80">{info.details}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#2C3C81] rounded-xl p-6 text-white"
            >
              <h4 className="text-xl font-bold mb-4">Need Immediate Help?</h4>
              <p className="mb-4 opacity-90">
                Call us directly for urgent inquiries or to schedule an immediate consultation.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+9779844162726"
                className="inline-flex items-center bg-[#C73D43] text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2C3C81] transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-[#2C3C81] mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C3C81] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3C81] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C3C81] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3C81] mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Study Abroad Consultation">Study Abroad Consultation</option>
                    <option value="Test Preparation">Test Preparation</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Scholarship Information">Scholarship Information</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3C81] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent transition-all"
                  placeholder="Tell us about your study abroad goals..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C73D43] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}