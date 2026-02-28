import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import CreateAccountLayout from "./CreateAccountLayout";

const interests = [
  {
    id: "politics",
    label: "Politics",
    icon: "🏛️",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "technology",
    label: "Technology",
    icon: "💻",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "business",
    label: "Business",
    icon: "💼",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: "🎬",
    color: "from-yellow-500 to-orange-600",
  },
];
const ChooseInterestForm = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const form = useFormContext();
  const formData = form.watch();

  const toggleInterest = (id: string) => {
    let interests = formData.interests;
    console.log({ formData });

    const newInterest = interests?.includes(id)
      ? interests.filter((i: string) => i !== id)
      : [...interests, id];
    console.log({ interests, newInterest });

    form.setValue("interests", newInterest);
  };

  return (
    <CreateAccountLayout
      title="Choose Your Interests"
      description="Select topics you'd like to follow (pick at least 3)"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
              formData.interests?.includes(interest.id)
                ? "shadow-xl scale-105"
                : "shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${interest.color} 
              ${
                formData.interests?.includes(interest.id)
                  ? "opacity-100"
                  : "opacity-20"
              } 
              transition-opacity`}
            />

            <div className="relative z-10">
              <div className="text-4xl mb-3">{interest.icon}</div>
              <div
                className={`font-bold ${
                  formData.interests.includes(interest.id)
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {interest.label}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4 max-w-md mx-auto">
        <Button
          onClick={onPrev}
          //   onClick={() => setStep(1)}
          variant="outline"
          className="flex-1 h-12 border-2 border-gray-300 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>
        <Button
          onClick={onNext}
          //   disabled={formData.interests.length < 3}
          className="flex-1 h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </div>
    </CreateAccountLayout>
  );
};

export default ChooseInterestForm;
