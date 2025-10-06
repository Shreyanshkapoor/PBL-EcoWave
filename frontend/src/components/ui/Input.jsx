// src/components/ui/Input.jsx
import React from "react";

const Input = ({ 
  label, 
  error, 
  className = "", 
  ...props 
}) => {
  const inputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent ${
    error ? "border-red-500" : "border-slate-300"
  } ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;