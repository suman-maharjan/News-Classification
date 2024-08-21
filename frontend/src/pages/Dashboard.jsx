import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import instance from "../utils/api";
import { URLS } from "../constants";

const Dashboard = () => {
  const [result, setResult] = useState("");
  const [newsValue, setNewsValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await instance.post(`${URLS.NEWS}/classify`, {
        news: newsValue,
      });
      setResult(response.data.data.prediction);
    } catch (e) {
      const errMsg = e?.response ? e.response.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    // setNewsValue("");
  };
  return (
    <>
      <h1>NewsClassification</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingTextarea2" label="Enter News">
            <Form.Control
              as="textarea"
              placeholder="Leave a News here"
              style={{ height: "100px" }}
              value={newsValue}
              onChange={(e) => setNewsValue(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          Submit
        </Button>
      </Form>
      {result}
      {/* <div>{result ? { result } : null}</div> */}
    </>
  );
};

export default Dashboard;
