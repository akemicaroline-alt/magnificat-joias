"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  height?: number;
  priority?: boolean;
  className?: string;
};

const NATURAL_RATIO = 695 / 238;

const SIZES: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 28,
  md: 40,
  lg: 48,
};

export function Logo({
  variant = "light",
  size = "md",
  height,
  priority = false,
  className,
}: LogoProps) {
  const [errored, setErrored] = useState(false);
  const h = height ?? SIZES[size];
  const w = Math.round(h * NATURAL_RATIO);
  const src = errored ? "/logo-fallback.svg" : "/logo.png";

  return (
    <span
      data-testid="logo-root"
      data-variant={variant}
      className={cn(
        "inline-flex items-center select-none",
        variant === "dark" && "[filter:invert(1)_brightness(0.85)]",
        className,
      )}
    >
      <Image
        src={src}
        alt="Magnificat Joias"
        width={w}
        height={h}
        priority={priority}
        onError={() => setErrored(true)}
        sizes={`${w}px`}
        style={{ width: "auto", height: h }}
      />
    </span>
  );
}
