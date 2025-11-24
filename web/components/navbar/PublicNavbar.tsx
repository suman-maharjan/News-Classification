"use client";
import { useLogout } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold">Text Classification</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-600 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300" />
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
                className="hidden sm:inline-flex text-gray-700 hover:text-gray-600 hover:bg-blue-50 font-medium transition-all"
              >
                Sign In
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  router.push("/get-started");
                }}
                className="shadow-md hover:shadow-xl transition-all transform hover:scale-105"
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
                className="hidden sm:inline-flex text-gray-700 hover:text-gray-600 hover:bg-blue-50 font-medium transition-all"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
