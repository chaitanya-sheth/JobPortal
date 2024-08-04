import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <form className="card p-4" onSubmit={handleSubmit}>
          <InputForm
            htmlFor="email"
            labelText={"Email"}
            inputType={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <InputForm
            htmlFor="password"
            labelText={"Password"}
            inputType={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary">
              <Link to="/register"></Link>Register
            </button>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
