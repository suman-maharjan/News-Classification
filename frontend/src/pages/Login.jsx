import { useState } from "react";
import { Button, Tab, Tabs, Form, Alert } from "react-bootstrap";
import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/sessions";
import { useNavigate } from "react-router-dom";

function Login() {
  const [key, setKey] = useState("login");

  return (
    <div className="container w-50">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 "
      >
        <Tab eventKey="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Login;

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
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      setSignIn({ email: "", password: "" });
    }
  };
  return (
    <Form
      className="d-grid gap-2"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={signIn?.email}
          onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={signIn?.password}
          onChange={(e) =>
            setSignIn((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </Form.Group>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Button variant="primary" type="submit" disabled={loading ? true : false}>
        Submit
      </Button>
    </Form>
  );
};

const SignUpForm = () => {
  return "This is SignUp";
};
