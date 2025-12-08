import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


export default function OAuthButton({
  provider,
  onClick,
  disabled,
}: {
  provider: "google" | "apple";
  onClick: () => void;
  disabled?: boolean;
}) {
  const icons = {
    google: <FcGoogle className="w-5 h-5" />,
    apple: <FaApple className="w-5 h-5" />,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-[clamp(0.95rem,1.7vw,1.1rem)] font-medium hover:bg-gray-50 transition disabled:opacity-50"
    >
      {icons[provider]}
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );
}