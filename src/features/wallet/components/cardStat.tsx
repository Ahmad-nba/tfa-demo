import React from "react";

type StatColor = "blue" | "emerald" | "red" | "yellow" | "purple";

interface CardStatProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: StatColor;
}

const colorClasses: Record<StatColor, { bg: string; border: string; text: string }> = {
  blue:    { bg: "bg-blue-500/5",    border: "border-blue-500/10",    text: "text-blue-400" },
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/10", text: "text-emerald-400" },
  red:     { bg: "bg-red-500/5",     border: "border-red-500/10",     text: "text-red-400" },
  yellow:  { bg: "bg-yellow-500/5",  border: "border-yellow-500/10",  text: "text-yellow-400" },
  purple:  { bg: "bg-purple-500/5",  border: "border-purple-500/10",  text: "text-purple-400" },
};

export function CardStat({ title, value, subtitle, color }: CardStatProps) {
  const styles = colorClasses[color];

  return (
    <div className={`p-4 rounded-lg border ${styles.border} ${styles.bg}`}>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className={`text-xl font-bold ${styles.text}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}
