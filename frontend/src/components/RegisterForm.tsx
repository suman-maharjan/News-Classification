import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import ProfileSVG from "../assets/svg/ProfileSVG";
import { FormEvent, useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import ErrorComponent from "./ErrorComponent";
import { validateRegister } from "../utils/login";
import EyeIcon, { EyeCrossIcon } from "../assets/svg/EyeIconSVG";
import { useErrorHandler } from "../hooks/useErrorHandler";

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { error, handleError, clearError } = useErrorHandler();
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      validateRegister({ ...register, type: "Register" });
      await instance.post(`${URLS.AUTH}/register`, register);

      navigate(`/verify-email?email=${encodeURIComponent(register.email)}`);
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
          aria-disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error ? <ErrorComponent message={error} /> : null}
      </div>
    </form>
  );
};

export default RegisterForm;
