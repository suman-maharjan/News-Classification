import ProfileSVG from "@/public/svg/ProfileSVG";
import { PropsWithChildren } from "react";

const CreateAccountLayout = ({
  children,
  title,
  description,
}: PropsWithChildren & {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
          <ProfileSVG />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">{children}</div>
    </div>
  );
};

export default CreateAccountLayout;
