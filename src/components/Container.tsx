import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  id,
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-6 md:px-12", className)}
    >
      {children}
    </Component>
  );
}
