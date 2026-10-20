import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function LogoZ2({ className, size = 24, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0", className)}
      {...props}
    >
      <title>janf.dev - Z2 Kinetic Split</title>
      {/* Upper Kinetic Wing */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48 48H208V96L156 148H116L168 96H48V48Z"
        fill="currentColor"
      />
      {/* Lower Kinetic Wing */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M208 208H48V160L100 108H140L88 160H208V208Z"
        fill="currentColor"
      />
      {/* Emerald Core Velocity Pulse */}
      <circle cx="128" cy="128" r="14" fill="#10B981" />
    </svg>
  );
}
