import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { URLS } from "../constants";
import TabComponent from "../components/TabComponent";
import { useEventHandler } from "../hooks/useEventHandler";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyableEmail = async () => {
      try {
        const { data } = await instance.post(URLS.AUTH + "/verifyable-email", {
          email,
        });

        const verifyableEmail = data.data;
        if (!verifyableEmail) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    verifyableEmail();
  }, []);

  const tabs = ["Verify Email"];

  const [activeIndex, setActiveIndex] = useState(tabs[0]);
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
            {activeIndex === "Verify Email" && (
              <VerifyEmailComponent email={email.toString()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyEmailComponent = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const { handleSuccess, handleError } = useEventHandler();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!otpCode) {
        throw new Error("OTP Code is required");
      }

      if (otpCode.length !== 6) {
        throw new Error("OTP Code must be 6 digits");
      }
      const response = await instance.post(`${URLS.AUTH}/verify`, {
        email,
        token: otpCode,
      });
      if (response.data.message === "success") {
        handleSuccess("Successfully Verified Email");
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (loading || resendLoading) return;
    try {
      setResendLoading(true);
      const res = await instance.post(`${URLS.AUTH}/regenerate`, {
        email,
      });
      if (res.status === 200) {
        handleSuccess("Email sent successfully");
      }
    } catch (error) {
      console.error(error);
      handleError(error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 text-black">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder="6 digit Code"
            name="otpCode"
            maxLength={6}
            onChange={(e) => setOtpCode(e.target.value)}
            value={otpCode}
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
          aria-disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
        <label className="label">
          <a
            onClick={handleResendEmail}
            className="label-text-alt link link-hover text-white underline hover:bg-white p-2"
          >
            {resendLoading ? "Sending..." : "Re-send Email"}
          </a>
        </label>
      </div>
    </form>
  );
};

export default VerifyEmail;
