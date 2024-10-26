import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { URLS } from "../constants";
import TabComponent from "../components/TabComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useErrorHandler } from "../hooks/useErrorHandler";

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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { error, handleError, clearError } = useErrorHandler();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }
      const { data } = await instance.post(
        `${URLS.AUTH}/forgot-password-generator`,
        {
          email,
        }
      );
      if (data.message === "success") {
        navigate(`/forgot-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      clearError();
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

        <label
          htmlFor="my_modal_7"
          className="btn btn-primary"
          aria-disabled={loading}
        >
          {loading ? "Sending..." : "Send otp in Email"}
        </label>

        {error ? <ErrorComponent message={error} /> : null}
      </div>
    </form>
  );
};

export default FindEmail;
