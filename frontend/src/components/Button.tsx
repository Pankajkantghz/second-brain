import { ReactElement } from "react";

interface ButtonsProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]",

  secondary:
    "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:shadow-md",
};

const defaultStyles =
  "px-5 py-3 rounded-2xl font-medium flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonsProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${variantClasses[variant]}
        ${defaultStyles}
        ${fullWidth ? "w-full" : ""}
        ${loading ? "opacity-70" : ""}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {startIcon && (
            <span className="mr-2 flex items-center">
              {startIcon}
            </span>
          )}
          {text}
        </>
      )}
    </button>
  );
}