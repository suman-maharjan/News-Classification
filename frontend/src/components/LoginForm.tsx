import { useLocation, useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { FormEvent, useEffect, useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import ErrorComponent, { AlertTypeEnum } from "./ErrorComponent";
import { validateRegister, ValidationEnum } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import { useErrorHandler } from "../hooks/useErrorHandler";

interface IUserLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const location = useLocation();
  const locationMessage = location.state?.message;
  const [message, setMessage] = useState("");

  const { error, handleError, clearError } = useErrorHandler();

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
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState<IUserLogin>({ email: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
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
    <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary" aria-disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <label className="label">
          <a
            href="/find-email"
            className="label-text-alt link link-hover text-white underline hover:bg-white p-2"
          >
            Forgot password?
          </a>
        </label>

        {message && (
          <ErrorComponent message={message} type={AlertTypeEnum.SUCCESS} />
        )}
        {error ? <ErrorComponent message={error} /> : null}
      </div>
    </form>
  );
};

export default LoginForm;
