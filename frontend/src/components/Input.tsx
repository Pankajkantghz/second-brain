import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text" }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
