import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(name, lastName, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <form className="card p-4" onSubmit={handleSubmit}>
          <InputForm
            htmlFor="name"
            labelText={"Name"}
            inputType={"text"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            name="name"
          />

          <InputForm
            htmlFor="lastName"
            labelText={"Last name"}
            inputType={"text"}
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            name="lastName"
          />

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

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
