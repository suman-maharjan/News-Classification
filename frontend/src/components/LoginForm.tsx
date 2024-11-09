import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { FormEvent, useState } from "react";
import { setToken } from "../utils/sessions";
import { validateRegister, ValidationEnum } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import { useEventHandler } from "../hooks/useEventHandler";
import { _updateUserPreference } from "@/redux/userPreference/userPreferenceSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { ILoginUser } from "@/utils/types/authTypes";

const LoginForm = () => {
  const { loginMutate, loginPending } = useAuth();

  const [password, setPassword] = useState(true);
  const [signIn, setSignIn] = useState<ILoginUser>({ email: "", password: "" });

  const { handleError, handleSuccess } = useEventHandler();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    try {
      if (loginPending) return;
      e.preventDefault();

      validateRegister({ ...signIn, type: ValidationEnum.LOGIN });

      loginMutate(signIn, {
        onSuccess: (response) => {
          const { token } = response.data;
          setToken(token);
          dispatch(_updateUserPreference({ loggedIn: true }));
          handleSuccess("Successfully Logged In");
          navigate("/dashboard");
        },
        onError: (error) => {
          handleError(error);
        },
      });
    } catch (e) {
      handleError(e);
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
        <button className="btn btn-primary" aria-disabled={loginPending}>
          {loginPending ? "Loading..." : "Login"}
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
