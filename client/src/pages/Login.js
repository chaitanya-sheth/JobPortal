import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading} = useSelector(state => state.alerts)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading())
      const {data} = await axios.post("/api/v1/auth/login",{email,password})
      if(data.success){
        dispatch(hideLoading())
        localStorage.setItem('token',data.token)
        toast.success("login successfully")
        navigate("/dashboard")
      }
      // console.log(email, password);
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Invalid credenetials")
      console.log(error);
      
    }
  };
  return (
    <>
      {loading? (<Spinner />) : (
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
      )}
    </>
  );
};

export default Login;
