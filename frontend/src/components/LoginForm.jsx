import { useNavigate } from "react-router-dom";
import EmailSVG from "../assets/svg/EmailSVG";
import PasswordSVG from "../assets/svg/PasswordSVG";
import { useState } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import ErrorComponent from "./ErrorComponent";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!signIn?.email || !signIn?.password) {
        setError("Email and password is required");
        setLoading(false);
        return;
      }
      const { data } = await instance.post(`${URLS.AUTH}/login`, signIn);

      const { token } = data.data;
      setToken(token);
      navigate("/dashboard");
    } catch (e) {
      const errMsg = e?.response ? e.response.data.msg : "Something went wrong";
      setError(errMsg);
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      setSignIn({ email: "", password: "" });
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
          type="password"
          className="grow"
          placeholder="Password"
        />
      </label>
      <label
        onClick={handleSubmit}
        htmlFor="my_modal_7"
        className="btn btn-primary"
        aria-disabled={loading}
      >
        Login
      </label>
      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
};

export default LoginForm;
