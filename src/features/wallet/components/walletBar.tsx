import { WalletBarProps } from "../type-safety/walletCardTypes";

export function WalletBar({ label, amount, percentage, color }: WalletBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">          <div className={`h-3 w-3 rounded-full ${color}`} />
          <span className="text-sm font-medium">{label}</span>
        </div>

        <span className="text-sm font-medium">
          UGX {amount.toLocaleString()}
        </span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
