import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function FormInput({
  label,
  error,
  icon,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500' : 'border-border'
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
