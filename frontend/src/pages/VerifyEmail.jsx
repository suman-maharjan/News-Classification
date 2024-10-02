import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { URLS } from "../constants";
import TabComponent from "../components/TabComponent";
import ErrorComponent from "../components/ErrorComponent";
import PropTypes from "prop-types";
import { setToken } from "../utils/sessions";

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
            {" "}
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

const VerifyEmailComponent = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
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
      if (!otpCode) {
        setError("OTP Code is required");
        return;
      }

      if (otpCode.length !== 6) {
        setError("OTP Code must be 6 digits");
        return;
      }
      const { data } = await instance.post(`${URLS.AUTH}/verify`, {
        email,
        token: otpCode,
      });

      const { token } = data.data;
      setToken(token);

      navigate("/");
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
          type="number"
          className="grow"
          placeholder="6 digit Code"
          name="otpCode"
          maxLength={6}
          onChange={(e) => setOtpCode(e.target.value)}
          value={otpCode}
        />
      </label>

      <label
        htmlFor="my_modal_7"
        onClick={handleSubmit}
        className="btn btn-primary"
        aria-disabled={loading}
      >
        Verify Email
      </label>
      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
};

VerifyEmailComponent.propTypes = {
  email: PropTypes.string,
};

export default VerifyEmail;
