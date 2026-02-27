import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import ProfileSVG from "../assets/svg/ProfileSVG";
import { FormEvent, useState } from "react";
import { validateRegister } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import { useEventHandler } from "../hooks/useEventHandler";
import { IRegisterUser } from "@/utils/types/authTypes";
import { useAuth } from "@/hooks/useAuth";

const RegisterForm = () => {
  const [password, setPassword] = useState(true);
  const [register, setRegister] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { registerMutate, registerPending } = useAuth();

  const { handleSuccess, handleError } = useEventHandler();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    if (registerPending) return;
    e.preventDefault();
    try {
      validateRegister({ ...register, type: "Register" });

      registerMutate(register, {
        onSuccess: () => {
          handleSuccess("Successfully Registered! Please verify your email");
          navigate(`/verify-email?email=${encodeURIComponent(register.email)}`);
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
      <div className="flex flex-col gap-2">
        <label className="input input-bordered flex items-center gap-2">
          <ProfileSVG />
          <input
            type="text"
            className="grow"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
            value={register.name}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <EmailSVG />
          <input
            type="text"
            name="email"
            className="grow"
            placeholder="Email"
            onChange={handleInputChange}
            value={register.email}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <PasswordSVG />
          <input
            type={password ? "password" : "text"}
            name="password"
            className="grow"
            placeholder="Password"
            onChange={handleInputChange}
            value={register.password}
          />
          <div
            className="hover:cursor-pointer"
            onClick={() => setPassword(!password)}
          >
            {password ? <EyeCrossIcon /> : <EyeIcon />}
          </div>
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          aria-disabled={registerPending}
        >
          {registerPending ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
