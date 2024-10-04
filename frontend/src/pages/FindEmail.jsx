import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { URLS } from "../constants";
import TabComponent from "../components/TabComponent";
import ErrorComponent from "../components/ErrorComponent";

const FindEmail = () => {
  const tabs = ["Find Email"];

  const [activeIndex, setActiveIndex] = useState(tabs[0]);
  const handleTabChange = (tab) => {
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
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleError = (e) => {
    const errMsg = e?.response
      ? e.response.data.msg
      : e?.message ?? "Something went wrong";
    setError(errMsg);
  };

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        setError("Email is required");
        return;
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
        onClick={handleSubmit}
        className="btn btn-primary"
        aria-disabled={loading}
      >
        {loading ? "Sending..." : "Send otp in Email"}
      </label>

      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
};

export default FindEmail;
