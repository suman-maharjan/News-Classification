"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogoSVG from "@/public/svg/LogoSVG";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/services/authService";

const PublicNavbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <LogoSVG />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NewsHub
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Stay Informed</p>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/latest"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Latest
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Action Buttons */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/login");
                }}
                variant="ghost"
                className="hidden sm:inline-flex text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all"
              >
                Sign In
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  router.push("/get-started");
                }}
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Register</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                onClick={() => {
                  handleLogout();
                }}
                variant="ghost"
                className="hidden sm:inline-flex text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Progress Bar (optional) */}
      <div
        className={`h-1 bg-linear-to-r from-blue-600 to-indigo-600 transform origin-left transition-transform duration-300 ${
          scrolled ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </nav>
  );
};

export default PublicNavbar;
