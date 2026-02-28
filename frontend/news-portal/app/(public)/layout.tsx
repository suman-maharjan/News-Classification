import PublicNavbar from "@/components/navbar/PublicNavbar";
import React from "react";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main>
      <PublicNavbar />
      {children}
    </main>
  );
};

export default PublicLayout;
