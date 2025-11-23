import React from "react";
import CreateAccountLayout from "./CreateAccountLayout";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

const CreateAccountWelcomeForm = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const form = useFormContext();
  const formData = form.getValues();
  return (
    <CreateAccountLayout
      title="You're All Set!"
      description={`Welcome to NewsHub, ${formData.name}! Get ready to discover personalized news tailored to your interests.`}
    >
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Explore Your Feed</h4>
              <p className="text-gray-600 text-sm">
                Personalized news based on your interests
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Get Breaking Alerts
              </h4>
              <p className="text-gray-600 text-sm">
                Stay updated with real-time notifications
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Save & Share</h4>
              <p className="text-gray-600 text-sm">
                Bookmark articles and share with friends
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onNext}
          className="w-full h-14 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        >
          Start Reading News
        </Button>
        <Button
          onClick={onPrev}
          variant="ghost"
          className="w-full text-gray-600 hover:text-gray-900"
        >
          Adjust My Interests
        </Button>
      </div>
    </CreateAccountLayout>
  );
};

export default CreateAccountWelcomeForm;
