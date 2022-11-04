import "../css/signup.css";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import { API } from "../Global";

export default function Signup() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmP: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        fetch(`${API}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: credential.name,
            email: credential.email,
            password: credential.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setSuccess(data.message);
              setError("");
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
        <h2 className="text-center">Sign Up</h2>
        <FormGroup>
          <Label>
            Name<sup className="required">*</sup>
          </Label>
          <Input
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            Email<sup className="required">*</sup>
          </Label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
          />
        </FormGroup>
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
  );
}
