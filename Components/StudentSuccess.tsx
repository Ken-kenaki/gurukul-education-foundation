"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X, Star, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  $id: string;
  name: string;
  program: string;
  university: string;
  content: string;
  rating: number;
  imageUrl?: string;
  status: string;
}

export default function StudentSuccessCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    university: "",
    content: "",
    rating: 5,
    file: null as File | null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials?status=approved");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.documents || []);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('program', formData.program);
      formDataToSend.append('university', formData.university);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('rating', formData.rating.toString());
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsPopupOpen(false);
        setFormData({
          name: "",
          program: "",
          university: "",
          content: "",
          rating: 5,
          file: null,
        });
        alert("Thank you! Your testimonial has been submitted for review.");
      } else {
        throw new Error("Failed to submit testimonial");
      }
    } catch (error) {
      alert("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F5F4F5] py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C73D43] mx-auto"></div>
            <p className="mt-4 text-[#2C3C81]">Loading success stories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Student Success Stories
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Hear from our students who achieved their international education dreams
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {testimonials.map((story, index) => (
              <SwiperSlide key={story.$id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      {story.imageUrl ? (
                        <img
                          src={story.imageUrl}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3C81]">{story.name}</h3>
                      <p className="text-sm text-[#2C3C81]/80">{story.program}</p>
                      <p className="text-xs text-[#2C3C81]/60">{story.university}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < story.rating ? "text-[#C73D43] fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-[#2C3C81]/90 mb-6 flex-grow line-clamp-4">
                    "{story.content}"
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="group flex items-center text-[#C73D43] hover:text-[#2C3C81] transition-colors mt-auto"
                  >
                    <span>Read full story</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform" />
                  </motion.button>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Add Your Story Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPopupOpen(true)}
            className="group inline-flex items-center bg-[#C73D43] text-[#F5F4F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors"
          >
            Add Your Story Too
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Popup Form */}
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-[#2C3C81] hover:text-[#C73D43] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold text-[#2C3C81] mb-6">
                Share Your Success Story
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">Program</label>
                  <input
                    type="text"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    placeholder="e.g., MSc Computer Science"
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">University</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="e.g., University of Toronto"
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">Your Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">Your Story</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Share your experience with us..."
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2C3C81] mb-2 font-medium">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81] transition-all"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Your Story"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}