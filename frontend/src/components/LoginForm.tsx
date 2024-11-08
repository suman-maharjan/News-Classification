import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { FormEvent, useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import { validateRegister, ValidationEnum } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import { useEventHandler } from "../hooks/useEventHandler";
import { _updateUserPreference } from "@/redux/userPreference/userPreferenceSlice";
import { useDispatch } from "react-redux";

interface IUserLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [password, setPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState<IUserLogin>({ email: "", password: "" });

  const { handleError, handleSuccess } = useEventHandler();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      validateRegister({ ...signIn, type: ValidationEnum.LOGIN });
      const { data } = await instance.post(`${URLS.AUTH}/login`, signIn);

      const { token } = data.data;
      setToken(token);
      setSignIn({ email: "", password: "" });
      dispatch(_updateUserPreference({ loggedIn: true }));
      handleSuccess("Successfully Logged In");
      navigate("/dashboard");
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
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
      </div>
    </form>
  );
};

export default LoginForm;
