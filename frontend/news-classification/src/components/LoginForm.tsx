import { useAuth } from "@/hooks/useAuth";
import { _setIsUserLoggedIn } from "@/redux/auth/authSlice";
import { ILoginUser } from "@/utils/types/authTypes";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { useEventHandler } from "../hooks/useEventHandler";
import { validateRegister, ValidationEnum } from "../utils/login";

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
        onSuccess: () => {
          dispatch(_setIsUserLoggedIn({ isUserLoggedIn: true }));

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
      <div className="flex flex-col gap-2 text-white">
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
