import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabComponent from "../components/TabComponent";
import { useEventHandler } from "../hooks/useEventHandler";
import { useAuth } from "@/hooks/useAuth";

const FindEmail = () => {
  const tabs = ["Find Email"];

  const [activeIndex, setActiveIndex] = useState<string>(tabs[0]);
  const handleTabChange = (tab: string) => {
    setActiveIndex(tab);
  };

  return (
    <div
      className="h-full hero"
      style={{
        backgroundImage: "url(/heroImage.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome there</h1>
          <p className="mb-5">
            Discover a world of possibilities with our platform.
          </p>
          <TabComponent
            tabs={tabs}
            activeTab={activeIndex}
            onTabChange={handleTabChange}
          />
          <div className="p-4">
            {activeIndex === "Find Email" && <FindEmailComponent />}
          </div>
        </div>
      </div>
    </div>
  );
};

const FindEmailComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { handleSuccess, handleError } = useEventHandler();
  const { findEmailPending, findEmailMutate } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (findEmailPending) return;
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      findEmailMutate(email, {
        onSuccess: () => {
          handleSuccess("OTP sent to your email");
          navigate(`/forgot-password?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          handleError(error);
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 text-black">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          aria-disabled={findEmailPending}
        >
          {findEmailPending ? "Sending..." : "Send otp in Email"}
        </button>
      </div>
    </form>
  );
};

export default FindEmail;
