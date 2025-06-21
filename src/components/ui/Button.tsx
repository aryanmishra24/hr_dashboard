import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const base = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button"; 