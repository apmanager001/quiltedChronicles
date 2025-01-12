'use client'
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../comps/utility/axios";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { name, password } = data;
    try {
      const response = await axiosInstance.post("/login", { name, password });

      if (response.data.error) {
        console.error(response.data.error);
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Login Successful");
        window.location.href = "/account";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect username/email or password");
      } else {
        toast.error("Login failed");
      }
    }
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col gap-14 lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">
            Login here to start being able to interact with our community!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-r-xl">
          <form className="card-body" onSubmit={loginUser}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email or Username</span>
              </label>
              <input
                type="text"
                name="email"
                className="input input-bordered"
                placeholder="Email or Username"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary " value="Login" />
            </div>
            <div className="form-control mt-6 text-center">
              <p>Don't have an account yet?</p>
              <p>
                <Link href="/register" className="link link-hover underline">
                  Click here
                </Link>{' '}
                to register.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
