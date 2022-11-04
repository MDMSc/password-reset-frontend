import React, { useState } from "react";
import "../css/login.css";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { API } from "../Global";

export default function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credential),
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
  }

  return (
    <div className="my-5">
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
      <h2 className="text-center">Welcome</h2>
      <Form className="login_form">
        <h2 className="text-center">Login</h2>
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
        <Button block color="dark" size="lg" onClick={handleSubmit}>
          Log In
        </Button>
        <div className="text-center my-4">
          <a href="/signup">Sign Up</a>
          <span className="p-2">|</span>
          <a href="/forgot-password">Forgot Password ?</a>
        </div>
      </Form>
    </div>
  );
}
