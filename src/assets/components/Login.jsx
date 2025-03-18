import React, { useState } from "react";
import Header from "./Header";
import { Link,useNavigate } from "react-router-dom";
import {finduser} from "../../Services/Handleservices"
import Toast from "./Toast"


const Login = () => {
    const [data, setData] = useState({
        Email: "",
        Password: "",
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [name, setName] =useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    try {
      const response = await finduser(data);
      const datas = response.data;
      console.log(datas.msg);
      setName(datas.msg.First)
      if (datas.msg.Password==data.Password) {
        console.log("User Find")
        console.log(response.user)
        setToastMessage(`Welcome ${datas.msg.First}`)
        setShowToast(true)
        setToastType('success')
        setTimeout(() => navigate("/home"), 2000); 
      }
      else{
        alert("Please enter the correct username or password")
    }
} catch (err) {
    console.log(err);
    setToastMessage("Username or password incorrect")
    setShowToast(true)
    setToastType('error')
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="relative pt-32 flex justify-center">
        <div className="flex justify-center">
      <Toast
            message={toastMessage}
            type={toastType}
            showToast={showToast}
            setShowToast={setShowToast}
          />
        </div>
        <div className="rounded-xl shadow-xl border p-6 w-96 flex flex-col gap-4 bg-dgry">
          <h1 className="text-2xl font-bold text-rup justify-center flex">
            Login
          </h1>
          <p className=" text-rup justify-center flex">Login to our website</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={data.Email}
              onChange={handleChange}
              className="border p-4 rounded-lg w-full"
              required
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={data.Password}
              onChange={handleChange}
              className="border p-4 rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 items-center flex justify-center text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <strong>Login</strong>
            </button>
          </form>
          <p className="text-rup flex justify-center">
            New User?{" "}
            <strong>
              <Link to="/">&nbsp;SIGNUP</Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
