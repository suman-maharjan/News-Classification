import React from "react";
import PageSection from "../section/PageSection";

const Spinner = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Loading Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-600 font-medium">Loading latest news...</p>
      </div>
    </div>
  );
};

export default Spinner;
