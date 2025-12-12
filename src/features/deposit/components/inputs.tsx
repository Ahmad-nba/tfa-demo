import React from "react";

export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function LabeledInput({
  label,
  ...props
}: LabeledInputProps) {
  return (
    <section className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        className="p-3 rounded-lg border bg-card border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent1"
        {...props}
      />
    </section>
  );
}
