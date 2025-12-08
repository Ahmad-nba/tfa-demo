// src/app/(auth)/layout.tsx
import Image from "next/image";
import hero2 from "../../features/auth/assets/background.jpg"; 

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen md:flex-row">
      {/* Hero Section */}
      <div className="md:w-[45%] flex flex-col justify-between w-full bg-accent2">
        <div className="relative h-full">
          {/* Background Image */}
          <Image
            src={hero2}
            alt="Auth Hero Background"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70 z-10"></div>

          {/* Text */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-10 lg:px-14 space-y-6 md:space-y-10 text-white">
            <h2 className="text-[clamp(1.25rem,3.5vw,2.5rem)] md:text-[clamp(1.6rem,4.2vw,2.8rem)] text-center font-extrabold leading-tight max-w-3xl drop-shadow-2xl">
              Where Savings Build Trust, <br /> and Trust Builds Wealth.
            </h2>

            <div className="grid grid-cols-1 gap-y-3 w-full max-w-xl">
              <p className="text-[clamp(1rem,2vw,1.25rem)] text-center font-medium bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm shadow-md">
                * Safe, secure, and community-driven investments.
              </p>
              <p className="text-[clamp(1rem,2vw,1.25rem)] text-center font-medium bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm shadow-md">
                * Grow your future with trust and accountability.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center py-3 text-white/70 bg-base-BG hidden md:block text-sm z-20 relative">
          © {new Date().getFullYear()} TFA. All rights reserved.
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full md:h-screen overflow-y-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}
