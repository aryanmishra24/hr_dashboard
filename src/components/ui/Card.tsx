import React from "react";

interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Card({ header, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 ${className}`}>
      {header && <div className="mb-4 font-semibold text-lg">{header}</div>}
      {children}
    </div>
  );
} 