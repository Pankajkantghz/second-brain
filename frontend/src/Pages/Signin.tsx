import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import Input from "../components/Input";

import { Backend_URL } from "../config";

export default function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin() {
    try {
      const email = emailRef.current?.value;

      const password = passwordRef.current?.value;

      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const response = await axios.post(`${Backend_URL}/api/v1/signin`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success("Welcome back");

      navigate("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";

      toast.error(message);

      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">Welcome Back</h1>

          <p className="mt-2 text-slate-500">
            Sign in to access your second brain.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Email
            </label>

            <Input ref={emailRef} placeholder="john@email.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Password
            </label>

            <Input ref={passwordRef} placeholder="Enter password" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button
            onClick={signin}
            variant="primary"
            text="Sign In"
            fullWidth
            loading={false}
          />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
