// src/app/auth/page.tsx -> this page only simulates the login cause the onboarding is not connected to a backend yet
"use client";

import { useState } from "react";
import Link from "next/link";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import OAuthButton from "../../features/auth/components/oauthButton";
import {
  handleAppleOAuth,
  handleGoogleOAuth,
} from "@/features/auth/utils/handleOauth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ emailphone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    const test_email = "johndoe@gmail.com";
    const test_phone = "+256700000000";
    const test_password = "password123";
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (
        (formData.emailphone === test_email ||
          formData.emailphone === test_phone) &&
        formData.password === test_password
      ) {
        // Simulate successful login
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center px-4 w-full overflow-hidden">
      <section className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white overflow-hidden">
        <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] text-center font-extrabold mb-6 text-gray-900">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Use demo credentials johndoe@gmail.com or +256700000000 with password
          password123
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Phone */}
          <div>
            <label
              htmlFor="emailphone"
              className="block text-base font-medium mb-1"
            >
              <span className="text-red-300">*</span>Email / Phone
            </label>
            <input
              required
              id="emailphone"
              type="text"
              value={formData.emailphone}
              onChange={(e) =>
                setFormData({ ...formData, emailphone: e.target.value })
              }
              placeholder="eg +256 000000000 / johndoe@gmail.com"
              className="w-full px-4 py-2 border text-[clamp(0.95rem,1.7vw,1.1rem)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium mb-1"
            >
              <span className="text-red-300">*</span>Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password123"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.currentTarget.value })
                }
                required
                className="w-full px-4 py-2 border text-[clamp(0.95rem,1.7vw,1.1rem)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-base text-center text-red-500">{error}</p>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="font-light text-sm underline text-gray-600 hover:text-green-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="mt-2 w-full bg-card text-white text-lg font-semibold hover:bg-accent2 transition py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex my-6 items-center">
          <span className="grow border-t border-gray-300"></span>
          <span className="px-4 text-sm text-gray-500">Or Login with</span>
          <span className="grow border-t border-gray-300"></span>
        </div>

        {/* OAuth */}
        <div className="flex flex-col space-y-3">
          <OAuthButton
            provider="google"
            disabled={loading}
            onClick={handleGoogleOAuth}
          />
          <OAuthButton
            provider="apple"
            disabled={loading}
            onClick={handleAppleOAuth}
          />
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm mt-6 text-gray-700">
          New Customer?{" "}
          <Link href="/" className="font-medium underline hover:text-green-700">
            Start here
          </Link>
        </p>
      </section>
    </section>
  );
}
