import { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function FormTextarea({
  label,
  error,
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>
      <textarea
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
          error ? 'border-red-500' : 'border-border'
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
