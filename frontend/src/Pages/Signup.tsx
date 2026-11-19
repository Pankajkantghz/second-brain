import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Check, Circle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { Backend_URL } from "../config";

const passwordRules = [
  { label: "At least 8 characters", matches: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", matches: (value: string) => /[A-Z]/.test(value) },
  { label: "One number", matches: (value: string) => /\d/.test(value) },
  { label: "One symbol", matches: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

const meetsPasswordRequirements = (value: string) =>
  passwordRules.every((rule) => rule.matches(value));

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const signup = async () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const passwordValue = passwordRef.current?.value || "";

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      nameRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      emailRef.current?.focus();
      return;
    }

    if (!meetsPasswordRequirements(passwordValue)) {
      toast.error("Please meet all password requirements");
      passwordRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Backend_URL}/api/v1/signup`, {
        name,
        email,
        password: passwordValue,
      });

      toast.success(response.data?.message || "Account created successfully");
      navigate("/signin", { replace: true });
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to create your account. Please try again."
        : "Unable to create your account. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Your personal notebook"
      title="Create your account"
      description="Start collecting the ideas and resources you want to keep."
      note="Your account is protected with a password"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void signup();
        }}
      >
        <div>
          <label htmlFor="signup-name" className="mb-2 block text-xs font-medium text-slate-300">
            Full name
          </label>
          <Input
            ref={nameRef}
            id="signup-name"
            placeholder="Your name"
            autoComplete="name"
            className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20"
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-2 block text-xs font-medium text-slate-300">
            Email address
          </label>
          <Input
            ref={emailRef}
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-2 block text-xs font-medium text-slate-300">
            Password
          </label>
          <div className="relative">
            <Input
              ref={passwordRef}
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
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

          <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2" aria-live="polite">
            {passwordRules.map((rule) => {
              const valid = rule.matches(password);
              const RuleIcon = valid ? Check : Circle;

              return (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 text-[11px] ${valid ? "text-emerald-300" : "text-slate-500"}`}
                >
                  <RuleIcon size={13} className="shrink-0" />
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        <Button
          type="submit"
          variant="primary"
          text={loading ? "Creating account…" : "Create account"}
          fullWidth
          loading={loading}
          disabled={!meetsPasswordRequirements(password)}
        />
      </form>
    </AuthLayout>
  );
}
