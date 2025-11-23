"use client";

import { Button } from "@/components/ui/button";

// Newsletter Subscription Section
export const NewsletterSection = () => {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">Never Miss a Story</h2>
          <p className="text-xl text-blue-100">
            Subscribe to our newsletter and get the latest news delivered
            straight to your inbox every morning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
            >
              Subscribe Now
            </Button>
          </div>

          <p className="text-sm text-blue-200">
            Join 100,000+ readers who trust us for daily updates
          </p>
        </div>
      </div>
    </section>
  );
};
