"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsEvent {
  $id: string;
  title: string;
  type: "news" | "event";
  content: string;
  date: string;
  status: "draft" | "published";
  imageId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

function getImageUrl(imageId?: string | null) {
  if (!imageId) return null;
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_NEWS_BUCKET}/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
}

export default function NewsOfferPage() {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "news" | "events">("all");

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/news-events?limit=50&offset=0");
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await res.json();
        setNewsEvents(data.documents || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredItems = newsEvents.filter((item) => {
    if (activeTab === "all") return item.status === "published";
    return item.type === activeTab && item.status === "published";
  });

  // Get only events for the events section
  const events = newsEvents.filter(
    (item) => item.type === "event" && item.status === "published"
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C73D43] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news and events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading content
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden min-h-screen pt-52 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          News & Events
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with our latest announcements, offers, and upcoming
          events
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-[#C73D43] text-[#C73D43]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "news"
                  ? "border-[#C73D43] text-[#C73D43]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              News & Offers
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "events"
                  ? "border-[#C73D43] text-[#C73D43]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Events
            </button>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      {filteredItems.length === 0 ? (
        <section className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No {activeTab === "all" ? "content" : activeTab} available
          </h3>
          <p className="mt-1 text-gray-500">
            {activeTab === "all"
              ? "Check back later for updates"
              : activeTab === "news"
              ? "We'll post news and offers here soon"
              : "No events scheduled yet"}
          </p>
        </section>
      ) : (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {activeTab === "all"
              ? "Latest Updates"
              : activeTab === "news"
              ? "News & Offers"
              : "Our Events"}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.$id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {item.imageId && (
                  <div className="flex-shrink-0 h-48 overflow-hidden">
                    <img
                      src={getImageUrl(item.imageId) || undefined}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#C73D43] mb-2">
                      {item.type === "news" ? "News" : "Event"}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Events Section - Always shown but only if there are events */}
      {events.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Events
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.$id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {event.imageId && (
                  <div className="flex-shrink-0 h-48 overflow-hidden">
                    <img
                      src={getImageUrl(event.imageId) || undefined}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#C73D43] mb-2">
                      Event
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {event.content}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gray-50 rounded-lg p-8 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to get the latest news and offers
            directly to your inbox.
          </p>
          <form className="sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 placeholder-gray-500 focus:ring-[#C73D43] focus:border-[#C73D43] sm:max-w-xs border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#C73D43] hover:bg-[#A53237] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C73D43]"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
