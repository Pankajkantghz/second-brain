import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { Backend_URL } from "../config";

export default function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const signin = async () => {
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!email) {
      toast.error("Email is required");
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      toast.error("Password is required");
      passwordRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Backend_URL}/api/v1/signin`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Welcome back");
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to sign in. Please try again."
        : "Unable to sign in. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Your personal notebook"
      title="Welcome back"
      description="Sign in to pick up where your ideas left off."
      note="Secure sign-in to your account"
      footer={
        <>
          New to Second Brain?{" "}
          <Link to="/signup" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void signin();
        }}
      >
        <div>
          <label htmlFor="signin-email" className="mb-2 block text-xs font-medium text-slate-300">
            Email address
          </label>
          <Input
            ref={emailRef}
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20"
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="mb-2 block text-xs font-medium text-slate-300">
            Password
          </label>
          <div className="relative">
            <Input
              ref={passwordRef}
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="border-slate-700 bg-slate-900 pr-12 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          text={loading ? "Signing in…" : "Sign in with email"}
          fullWidth
          loading={loading}
        />
      </form>
    </AuthLayout>
  );
}
