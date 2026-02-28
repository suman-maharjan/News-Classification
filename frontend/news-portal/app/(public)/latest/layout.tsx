import Spinner from "@/components/spinner/Spinner";
import React, { PropsWithChildren, Suspense } from "react";

const LatestLayout = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<Spinner></Spinner>}>{children}</Suspense>;
};

export default LatestLayout;
