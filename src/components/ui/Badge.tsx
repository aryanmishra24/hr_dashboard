import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const colorVariants = {
  default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  success: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
  danger: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100",
};

export function Badge({ children, color = "default", className = "" }: BadgeProps) {
  // Ensure children is always a valid string without any formatting issues
  let displayValue = "";
  if (children != null) {
    if (typeof children === 'number') {
      displayValue = children.toString();
    } else {
      displayValue = String(children);
    }
  }
  
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${colorVariants[color]} ${className}`}>
      {displayValue}
    </span>
  );
} 