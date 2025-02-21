import React from "react";
import { cn } from "../../lib/utils";

export const Card = ({ className, children }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow p-2", className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return <div className={cn("p-2", className)}>{children}</div>;
};
