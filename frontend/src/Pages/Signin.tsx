import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ThemeToggle from "../components/ThemeToggle";
import { Button } from "../components/Button";
import Input from "../components/Input";

import { Backend_URL } from "../config";

export default function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /* Redirect if already logged in */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const signin = async () => {
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    /* Validation */
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${Backend_URL}/api/v1/signin`,
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);

      toast.success("Welcome back 👋");

      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Login failed";

        toast.error(message);
      } else {
        toast.error("Login failed");
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* Enter Key */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      signin();
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Theme Toggle */}
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-[36px] border border-slate-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-colors dark:border-slate-700 dark:bg-slate-800">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Sign in to access your second brain.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Email
            </label>

            <Input
              ref={emailRef}
              type="email"
              placeholder="john@email.com"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Password
            </label>

            <Input
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button
            onClick={signin}
            variant="primary"
            text={loading ? "Signing In..." : "Sign In"}
            fullWidth
            loading={loading}
          />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}