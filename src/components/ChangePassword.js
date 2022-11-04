import { useState, useEffect, Fragment } from "react";
import "../css/signup.css";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../Global";

export default function ChangePassword() {
  const [credential, setCredential] = useState({
    password: "",
    confirmP: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verifiedUrl, setVerifiedUrl] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
    try {
      fetch(`${API}/users/reset-password?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setVerifiedUrl(true);
          } else {
            setVerifiedUrl(false);
            setError(data.message);
            return;
          }
        });
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  } else {
    navigate("/");
  }
  }, []);

  function handleChange(e) {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (credential.password !== credential.confirmP) {
      setError("Password not matching");
      return;
    } else {
      try {
        fetch(`${API}/users/reset-password?token=${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: credential.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setSuccess(data.message);
              setError("");
              setTimeout(() => {
                navigate('/')
              }, 1000);
              return;
            } else {
              setError(data.message);
              setSuccess("");
              return;
            }
          });
      } catch (error) {
        setError(error.message);
        return;
      }
    }
  }

  return (
    <Fragment>

      {verifiedUrl ? (

        <div>
          {error && (
            <Alert className="message" color="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert className="message" color="success">
              {success}
            </Alert>
          )}
          <Form className="signup_form">
            <h2 className="text-center">Reset Password</h2>
            <FormGroup>
              <Label>
                Password<sup className="required">*</sup>
              </Label>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Confirm Password<sup className="required">*</sup>
              </Label>
              <Input
                type="password"
                placeholder="Password"
                name="confirmP"
                required
                onChange={handleChange}
              />
            </FormGroup>
            <Button
              type="submit"
              block
              color="dark"
              size="lg"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Form>
        </div>

      ) : (
        error && (
          <Alert className="message" color="danger">
            {error}
          </Alert>
        )
      )}
    </Fragment>
  );
}
