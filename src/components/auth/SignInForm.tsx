"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { doLogin } from "@/app/actions/auth";

export default function ModernLoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setGeneralError("");

    try {
      const response = await doLogin(email, password);

      if (response?.success) {
        // delay sedikit untuk memastikan cookie tersimpan
        setTimeout(() => {
          router.push("/");
        }, 200);
      } else {
        // Handle different types of errors
        if (response?.error && typeof response.error === "object") {
          const errorMap = response.error as Record<string, string[]>;
          const formattedErrors: Record<string, string> = {};

          // Global / API error
          if (errorMap["api"]?.length) {
            setGeneralError(errorMap["api"][0]);
          } else {
            // Field-specific errors
            Object.keys(errorMap).forEach((field) => {
              if (errorMap[field]?.length) {
                formattedErrors[field] = errorMap[field][0];
              }
            });
            setErrors(formattedErrors);
          }
        } else {
          // Fallback error message
          setGeneralError(
            response?.error || "Login failed. Please check your credentials."
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setGeneralError("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#E6DCE7" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "#7695FF40" }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#9DBDFF30" }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        className="rounded-3xl p-8 w-full max-w-md border-2 relative z-10"
        style={{
          backgroundColor: "#7695FF",
          borderColor: "#9DBDFF",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-white/80 text-sm">Silakan masuk ke akun Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-white font-semibold block">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-black/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                  if (generalError) {
                    setGeneralError("");
                  }
                }}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                style={{
                  backgroundColor: "#FFD7C4",
                  borderColor: errors.email ? "#DC2626" : "#9DBDFF",
                }}
                placeholder="Masukkan email Anda"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-white font-semibold block">Kata Sandi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-black/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 01-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }
                  if (generalError) {
                    setGeneralError("");
                  }
                }}
                className="w-full pl-12 pr-12 py-4 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                style={{
                  backgroundColor: "#FFD7C4",
                  borderColor: errors.password ? "#DC2626" : "#9DBDFF",
                }}
                placeholder="Masukkan kata sandi Anda"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 text-white font-bold rounded-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 border-2"
            style={{
              backgroundColor: "#FF9874",
              borderColor: "#FFD7C4",
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Masuk...</span>
              </div>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Error Display */}
        {generalError && (
          <motion.div
            className="border rounded-xl p-4 mt-4 bg-red-100/90 border-red-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-600">{generalError}</p>
            </div>
          </motion.div>
        )}

        {/* Field-specific errors */}
        {errors.email && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <p className="text-sm text-red-200 bg-red-500/20 px-3 py-2 rounded-lg">
              Email: {errors.email}
            </p>
          </motion.div>
        )}

        {errors.password && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <p className="text-sm text-red-200 bg-red-500/20 px-3 py-2 rounded-lg">
              Password: {errors.password}
            </p>
          </motion.div>
        )}

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <a
            href="#"
            className="font-medium transition-colors hover:underline"
            style={{ color: "#FFD7C4" }}
          >
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")} // or your signup route
              className="font-medium transition-colors hover:underline"
              style={{ color: "#FFD7C4" }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>

      {/* Marketing Text - Outside the card */}
      <motion.div
        className="mt-8 text-center max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-black/100 text-sm leading-relaxed">
          Layani pelanggan Anda 24/7 dengan agen AI yang bekerja otomatis.
          Tingkatkan penjualan, perbaiki dukungan, dan kembangkan bisnis Anda
          lebih cepat. Semua dalam satu platform AI + CRM Omnichannel yang
          powerful.
        </p>
      </motion.div>
    </div>
  );
}
