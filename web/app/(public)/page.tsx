"use client";
import { CategoriesSection } from "./(_components)/CategoriesSection";
import { FeaturedHeroSection } from "./(_components)/FeaturedHeroSection";
import HeroSection from "./(_components)/HeroSection";
import { NewsletterSection } from "./(_components)/NewsletterSection";
import { TrendingSection } from "./(_components)/TrendingSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedHeroSection />
      <CategoriesSection />
      {/* <TrendingSection /> */}
      <NewsletterSection />
    </main>
  );
}
