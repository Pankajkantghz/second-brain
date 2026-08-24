import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-gray-300
          bg-gray-50
          px-4
          py-3
          text-gray-700
          outline-none
          transition-all
          duration-200

          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-200

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-100
          dark:focus:border-indigo-500
          dark:focus:ring-indigo-500/20

          ${className}
        `}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
