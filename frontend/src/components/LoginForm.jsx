import { useLocation, useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { useEffect, useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import ErrorComponent, { AlertType } from "./ErrorComponent";
import { validateRegister, ValidationEnum } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";

const LoginForm = () => {
  const location = useLocation();
  const locationMessage = location.state?.message;
  console.log(locationMessage);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (locationMessage) {
      setMessage(locationMessage);

      const timerId = setTimeout(() => {
        setMessage(""); // Clear the message after 5 seconds
      }, 5000);

      // Clean up the timeout when the component unmounts or when `locationMessage` changes
      return () => clearTimeout(timerId);
    }
  }, [locationMessage]);

  const [password, setPassword] = useState(true);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });

  const handleError = (e) => {
    const errMsg = e?.response
      ? e.response.data.msg
      : e?.message ?? "Something went wrong";
    setError(errMsg);
  };

  // Clear Error Logic
  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      validateRegister({ ...signIn, type: ValidationEnum.LOGIN });
      const { data } = await instance.post(`${URLS.AUTH}/login`, signIn);

      const { token } = data.data;
      setToken(token);
      setSignIn({ email: "", password: "" });
      navigate("/dashboard");
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
      clearError();
    }
  };
  return (
    <div className="flex flex-col gap-2 text-black">
      <label className="input input-bordered flex items-center gap-2">
        <EmailSVG />
        <input
          value={signIn.email}
          onChange={(e) =>
            setSignIn((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          type="text"
          className="grow"
          placeholder="Email"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <PasswordSVG />
        <input
          value={signIn.password}
          onChange={(e) =>
            setSignIn((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          type={password ? "password" : "text"}
          className="grow"
          placeholder="Password"
        />
        <div
          className="hover:cursor-pointer"
          onClick={() => setPassword(!password)}
        >
          {password ? <EyeCrossIcon /> : <EyeIcon />}
        </div>
      </label>
      <label
        onClick={handleSubmit}
        htmlFor="my_modal_7"
        className="btn btn-primary"
        aria-disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </label>
      <label className="label">
        <a
          href="/find-email"
          className="label-text-alt link link-hover text-white underline hover:bg-white p-2"
        >
          Forgot password?
        </a>
      </label>

      {message && <ErrorComponent message={message} type={AlertType.SUCCESS} />}
      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
};

export default LoginForm;
