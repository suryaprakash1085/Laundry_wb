import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border-2 border-primary text-primary hover:bg-primary/10"
  }[variant];

  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  }[size];

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${variantClass} ${sizeClass} rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        icon && icon
      )}
      {children}
    </button>
  );
}
