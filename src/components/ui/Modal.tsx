import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full relative ${className}`}
        role="dialog" aria-modal="true">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>
        {title && <div className="mb-4 text-lg font-bold">{title}</div>}
        {children}
      </div>
    </div>
  );
} 