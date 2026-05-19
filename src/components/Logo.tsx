"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  className?: string;
};

const SIZES: Record<NonNullable<LogoProps["size"]>, { w: number; h: number }> = {
  sm: { w: 120, h: 30 },
  md: { w: 180, h: 45 },
  lg: { w: 260, h: 65 },
};

export function Logo({
  variant = "light",
  size = "md",
  priority = false,
  className,
}: LogoProps) {
  const [errored, setErrored] = useState(false);
  const dims = SIZES[size];
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
        width={dims.w}
        height={dims.h}
        priority={priority}
        onError={() => setErrored(true)}
        sizes={`${dims.w}px`}
        style={{ width: "auto", height: dims.h }}
      />
    </span>
  );
}
