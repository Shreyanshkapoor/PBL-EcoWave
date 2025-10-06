// src/components/ui/Card.jsx
import React from "react";

const Card = ({ children, className = "", variant = "default", ...props }) => {
  const baseClasses = "rounded-xl shadow-card bg-white";
  
  const variants = {
    default: "bg-white",
    muted: "bg-slate-100 text-slate-800"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`px-6 py-4 border-b border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`px-6 py-4 border-t border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter };