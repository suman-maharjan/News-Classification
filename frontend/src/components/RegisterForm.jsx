import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import ProfileSVG from "../assets/svg/ProfileSVG";
import { useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import ErrorComponent from "./ErrorComponent";
import { validateRegister } from "../utils/login";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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
    e.preventDefault();
    setLoading(true);
    try {
      validateRegister({ ...register, type: "Register" });

      const { data } = await instance.post(`${URLS.AUTH}/register`, register);

      const { token } = data.data;
      setToken(token);
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
          type="password"
          name="password"
          className="grow"
          placeholder="password"
          onChange={handleInputChange}
          value={register.password}
        />
      </label>
      <label
        htmlFor="my_modal_7"
        onClick={handleSubmit}
        className="btn btn-primary"
        aria-disabled={loading}
      >
        Register
      </label>
      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
};

export default RegisterForm;
