import React from "react";

interface IPageSectionProps extends React.PropsWithChildren {
  className?: string;
}

const PageSection = ({ children, className = "" }: IPageSectionProps) => {
  return (
    <section className={`w-full p-6`}>
      <div className={`container mx-auto  ${className ?? ""}`}>{children}</div>
    </section>
  );
};

export default PageSection;
