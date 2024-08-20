import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import InputForm from "../components/shared/InputForm";
import {useDispatch, useSelector} from "react-redux"
import {hideLoading, showLoading} from "../redux/features/alertSlice"
import axios from 'axios'
import Spinner from "../components/shared/Spinner";
import {toast} from 'react-toastify'
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading} = useSelector(state => state.alerts)
  //hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        if(!name || !lastName || !email || !password){
          toast.error('Please provide all fields')
        }
      // console.log(name, lastName, email, password);
      dispatch(showLoading())
      const {data} = await axios.post('/api/v1/auth/register',{name,lastName,email,password})
      dispatch(hideLoading())
      if(data.success){
        toast.success('Register Successfully');
        navigate('/login')
      }

    } catch (error) {
      dispatch(hideLoading())
      toast.error('Invalid Form Details Please try again')
      console.log(error);
    }
  };
  return (
    <>
    {loading ? (<Spinner />):(
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
      </div>)}
    </>
  );
};

export default Register;
