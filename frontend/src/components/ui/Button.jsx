// src/components/ui/Button.jsx
import React from "react";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false, 
  className = "", 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-blue hover:bg-blue-600 text-white shadow-card focus:ring-brand-blue",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900 focus:ring-slate-500",
    ghost: "text-white/90 hover:text-white focus:ring-white",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;
  
  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;