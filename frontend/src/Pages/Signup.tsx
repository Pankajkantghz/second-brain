import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, EyeOff, Brain } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

import { toast } from "react-toastify";

import { Button } from "../components/Button";
import Input from "../components/Input";

import { Backend_URL } from "../config";

import {
  fadeUp,
  staggerContainer,
  scaleFade,
} from "../animations";

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /\d/.test(password) },
    { label: "One symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  /* Redirect if logged in */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  /* Validation */
  const validateForm = (
    name: string,
    email: string,
    password: string,
  ) => {
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

    if (!passwordRules.every((rule) => rule.valid)) {
      toast.error("Please meet all password requirements");
      return false;
    }

    return true;
  };

  /* Signup */
  const signup = async () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!validateForm(name, email, password)) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${Backend_URL}/api/v1/signup`,
        {
          name,
          email,
          password,
        },
      );

      toast.success(
        response.data?.message ||
          "Account created successfully 🎉",
      );

      navigate("/signin");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          toast.error("Email already exists");
        } else if (status === 400) {
          toast.error(message || "Invalid input");
        } else if (status === 500) {
          toast.error(
            "Server error. Please try again later.",
          );
        } else {
          toast.error(message || "Signup failed");
        }
      } else {
        toast.error("Signup failed");
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
      signup();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-indigo-100
        via-white
        to-purple-100
        px-4
        transition-colors

        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      {/* Theme Toggle */}
      <motion.div
        variants={fadeUp}
        className="absolute right-5 top-5"
      >
        <ThemeToggle />
      </motion.div>

      {/* Signup Card */}
      <motion.div
        variants={scaleFade}
        className="
          w-full
          max-w-lg
          rounded-[36px]
          border
          border-slate-100
          bg-white
          p-7
          sm:p-10
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          transition-colors

          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
            <Brain size={28} />
          </div>
          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-slate-800
              dark:text-white
            "
          >
            Create Account
          </h1>

          <p
            className="
              mt-2
              text-slate-500
              dark:text-slate-300
            "
          >
            Join Brainly and organize your knowledge.
          </p>
        </motion.div>

        {/* Inputs */}
        <motion.div
          variants={staggerContainer}
          className="space-y-5"
        >
          {/* Name */}
          <motion.div variants={fadeUp}>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              Full Name
            </label>

            <Input
              ref={nameRef}
              placeholder="John Doe"
              onKeyDown={handleKeyDown}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp}>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              Email
            </label>

            <Input
              ref={emailRef}
              placeholder="john@email.com"
              onKeyDown={handleKeyDown}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeUp}>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              Password
            </label>

            <div className="relative">
              <Input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-12"
              />
              <button type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-indigo-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              {passwordRules.map((rule) => (
                <div key={rule.label} className={`flex items-center gap-1.5 ${rule.valid ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                  <Check size={14} className={rule.valid ? "opacity-100" : "opacity-30"} />
                  {rule.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Button */}
        <motion.div
          variants={fadeUp}
          className="mt-6"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={signup}
            variant="primary"
            text={
              loading
                ? "Creating Account..."
                : "Create Account"
            }
            fullWidth
            loading={loading}
            disabled={!passwordRules.every((rule) => rule.valid)}
          />
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="
            mt-6
            text-center
            text-sm
            text-slate-500
            dark:text-slate-300
          "
        >
          Already have an account?{" "}

          <Link
            to="/signin"
            className="
              font-semibold
              text-indigo-600
              transition
              hover:text-indigo-700
              hover:underline
            "
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
