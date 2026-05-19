type Props = {
  size?: number;
  className?: string;
};

export function Ingot({ size = 28, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 16 L20 16 L18 8 L6 8 Z" />
      <path d="M6 8 L8 6 L16 6 L18 8" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  );
}
