import React, { useState } from "react";
import "../css/forgetpassword.css";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { API } from "../Global";

export default function Password() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (email === "") {
      setError("Email is Required!");
      return;
    } else {
      try {
        fetch(`${API}/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
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
      <Form className="fp_form">
        <h2 className="text-center">Forgot Password</h2>
        <FormGroup>
          <Label>
            Email<sup className="required">*</sup>
          </Label>
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </FormGroup>
        <Button block color="dark" size="lg" onClick={handleSubmit}>
          Send Mail
        </Button>
      </Form>
    </div>
  );
}
