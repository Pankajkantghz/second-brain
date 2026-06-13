import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Button } from "../components/Button";
import Input from "../components/Input";

import { Backend_URL } from "../config";

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /* Redirect if logged in */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  /* Validation */
  const validateForm = (name: string, email: string, password: string) => {
    if (!name.trim()) {
      toast.error("Name is required");

      return false;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");

      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");

      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return false;
    }

    return true;
  };

  /* Signup */
  const signup = async () => {
    const name = nameRef.current?.value.trim() || "";

    const email = emailRef.current?.value.trim() || "";

    const password = passwordRef.current?.value || "";

    const isValid = validateForm(name, email, password);

    if (!isValid) return;

    try {
      setLoading(true);

      const response = await axios.post(`${Backend_URL}/api/v1/signup`, {
        name,
        email,
        password,
      });

      toast.success(
        response.data?.message || "Account created successfully 🎉",
      );

      navigate("/signin");
    } catch (error: any) {
      const status = error.response?.status;

      const message = error.response?.data?.message;

      if (status === 409) {
        toast.error("Email already exists");
      } else if (status === 400) {
        toast.error(message || "Invalid input");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(message || "Signup failed");
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* Enter Key */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signup();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md rounded-[36px] border border-slate-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-8 text-center">
         

          <h1 className="text-4xl font-bold tracking-tight text-slate-800">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join Brainly and organize your knowledge.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Full Name
            </label>

            <Input
              ref={nameRef}
              placeholder="John Doe"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Email
            </label>

            <Input
              ref={emailRef}
              placeholder="john@email.com"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Password
            </label>

            <input
              ref={passwordRef}
              type="password"
              placeholder="Minimum 6 characters"
              onKeyDown={handleKeyDown}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button
            onClick={signup}
            variant="primary"
            text={loading ? "Creating Account..." : "Create Account"}
            fullWidth
            loading={loading}
          />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
