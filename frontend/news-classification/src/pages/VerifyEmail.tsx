import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabComponent from "../components/TabComponent";
import { useEventHandler } from "../hooks/useEventHandler";
import { useAuth } from "@/hooks/useAuth";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const navigate = useNavigate();
  const { verifyableEmailPending, verifyableEmailMutate } = useAuth();

  useEffect(() => {
    if (verifyableEmailPending) return;
    verifyableEmailMutate(email, {
      onSuccess: (data) => {
        if (!data) {
          navigate("/");
        }
      },
    });
  }, [email]);

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
  const [otpCode, setOtpCode] = useState("");

  const { handleSuccess, handleError } = useEventHandler();

  const navigate = useNavigate();
  const {
    verifyUserMutate,
    verifyUserPending,
    regenerateEmailMutate,
    regenerateEmailPending,
  } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    try {
      if (verifyUserPending) return;
      e.preventDefault();

      if (!otpCode) {
        throw new Error("OTP Code is required");
      }

      if (otpCode.length !== 6) {
        throw new Error("OTP Code must be 6 digits");
      }

      verifyUserMutate(
        { email, token: otpCode },
        {
          onSuccess: () => {
            handleSuccess("Successfully Verified Email");
            navigate("/");
          },
          onError: (error) => {
            handleError(error);
          },
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleResendEmail = async () => {
    if (regenerateEmailPending) return;
    try {
      regenerateEmailMutate(email, {
        onSuccess: () => handleSuccess("Email sent successfully"),
      });
    } catch (error) {
      console.error(error);
      handleError(error);
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
          aria-disabled={verifyUserPending}
        >
          {verifyUserPending ? "Verifying..." : "Verify Email"}
        </button>
        <label className="label">
          <button
            type="button"
            onClick={handleResendEmail}
            className="label-text-alt  text-white underline hover:cursor-pointer hover:bg-white hover:text-black p-2"
            disabled={regenerateEmailPending}
          >
            {regenerateEmailPending ? "Sending..." : "Re-send Email"}
          </button>
        </label>
      </div>
    </form>
  );
};

export default VerifyEmail;
