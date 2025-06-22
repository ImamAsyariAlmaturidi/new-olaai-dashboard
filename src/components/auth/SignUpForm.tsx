"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Building, Phone, ArrowRight } from "lucide-react";
import { doRegister } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name: string;
  businessName: string;
  phoneNumber: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    businessName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setErrors({});
    setGeneralError("");

    try {
      const response = await doRegister({
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
        return;
      }

      if (response.errors && typeof response.errors === "object") {
        const errorMap = response.errors as Record<string, string[]>;
        const formattedErrors: Record<string, string> = {};

        if (errorMap["api"]?.length) {
          setGeneralError(errorMap["api"][0]);
          return;
        }

        Object.keys(errorMap).forEach((field) => {
          if (errorMap[field]?.length) {
            formattedErrors[field] = errorMap[field][0];
          }
        });

        setErrors(formattedErrors);

        const errorFields = Object.keys(formattedErrors);
        let targetStep = currentStep;

        if (
          errorFields.some((field) => ["email", "password"].includes(field))
        ) {
          targetStep = 1;
        } else if (
          errorFields.some((field) => ["name", "businessName"].includes(field))
        ) {
          targetStep = 2;
        } else if (
          errorFields.some((field) => ["phoneNumber"].includes(field))
        ) {
          targetStep = 3;
        }

        if (targetStep !== currentStep) {
          setCurrentStep(targetStep);
        }
        return;
      }

      setGeneralError("Registration failed. Please try again.");
    } catch (error) {
      console.error("Registration error:", error);
      setGeneralError("Internal error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password;
      case 2:
        return formData.name && formData.businessName;
      case 3:
        return formData.phoneNumber;
      default:
        return false;
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (isSuccess) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: "#E6DCE7" }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#7695FF" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            Registration Successful!
          </h2>
          <p className="text-white/80">
            Your account has been created successfully. Welcome aboard!
          </p>
        </motion.div>
      </div>
    );
  }

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

      {/* Signup Card */}
      <motion.div
        className="rounded-3xl p-6 w-full max-w-md border-2 relative z-10"
        style={{
          backgroundColor: "#7695FF",
          borderColor: "#9DBDFF",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-white/80 text-sm">Join us today</p>
        </div>

        {/* Compact Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-3">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step
                      ? "bg-white border-white"
                      : "bg-transparent border-white/50"
                  }`}
                  animate={{
                    backgroundColor:
                      currentStep >= step ? "#FFFFFF" : "transparent",
                    borderColor:
                      currentStep >= step ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <Mail
                      className={`w-4 h-4 ${
                        currentStep >= step
                          ? "text-purple-600"
                          : "text-white/70"
                      }`}
                    />
                  )}
                  {step === 2 && (
                    <Building
                      className={`w-4 h-4 ${
                        currentStep >= step
                          ? "text-purple-600"
                          : "text-white/70"
                      }`}
                    />
                  )}
                  {step === 3 && (
                    <Phone
                      className={`w-4 h-4 ${
                        currentStep >= step
                          ? "text-purple-600"
                          : "text-white/70"
                      }`}
                    />
                  )}
                </motion.div>
                {index < 2 && (
                  <ArrowRight className="w-4 h-4 text-white/50 mx-2" />
                )}
              </div>
            ))}
          </div>
          <div className="w-full rounded-full h-1 bg-white/30">
            <motion.div
              className="h-1 rounded-full bg-white"
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* General Error Display */}
        {generalError && (
          <motion.div
            className="border rounded-xl p-3 mb-4 bg-red-100/90 border-red-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm text-red-600">{generalError}</p>
          </motion.div>
        )}

        {/* Form Steps */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Email and Password */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-white font-semibold block text-sm">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-black/70" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleInputChange("email", e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                      style={{
                        backgroundColor: "#FFD7C4",
                        borderColor: errors.email ? "#DC2626" : "#9DBDFF",
                      }}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      className="text-sm text-red-200 bg-red-500/20 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold block text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-black/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => {
                        handleInputChange("password", e.target.value);
                        if (errors.password) {
                          setErrors((prev) => ({ ...prev, password: "" }));
                        }
                      }}
                      className="w-full pl-11 pr-11 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                      style={{
                        backgroundColor: "#FFD7C4",
                        borderColor: errors.password ? "#DC2626" : "#9DBDFF",
                      }}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      className="text-sm text-red-200 bg-red-500/20 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-white font-semibold block text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      handleInputChange("name", e.target.value);
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                    style={{
                      backgroundColor: "#FFD7C4",
                      borderColor: errors.name ? "#DC2626" : "#9DBDFF",
                    }}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <motion.p
                      className="text-sm text-red-200 bg-red-500/20 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold block text-sm">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => {
                      handleInputChange("businessName", e.target.value);
                      if (errors.businessName) {
                        setErrors((prev) => ({ ...prev, businessName: "" }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                    style={{
                      backgroundColor: "#FFD7C4",
                      borderColor: errors.businessName ? "#DC2626" : "#9DBDFF",
                    }}
                    placeholder="Enter your business name"
                    required
                  />
                  {errors.businessName && (
                    <motion.p
                      className="text-sm text-red-200 bg-red-500/20 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.businessName}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-white font-semibold block text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      handleInputChange("phoneNumber", e.target.value);
                      if (errors.phoneNumber) {
                        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                      }
                    }}
                    className="w-full px-4 py-3 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 border-2"
                    style={{
                      backgroundColor: "#FFD7C4",
                      borderColor: errors.phoneNumber ? "#DC2626" : "#9DBDFF",
                    }}
                    placeholder="Enter your phone number"
                    required
                  />
                  {errors.phoneNumber && (
                    <motion.p
                      className="text-sm text-red-200 bg-red-500/20 px-2 py-1 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {errors.phoneNumber}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-2xl font-medium transition-all duration-200 text-sm"
              style={{
                backgroundColor:
                  currentStep === 1
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.9)",
                color: currentStep === 1 ? "rgba(255,255,255,0.5)" : "#7695FF",
                cursor: currentStep === 1 ? "not-allowed" : "pointer",
                opacity: currentStep === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 rounded-2xl font-medium transition-all duration-200 text-sm"
                style={{
                  backgroundColor: isStepValid()
                    ? "#FF9874"
                    : "rgba(255,255,255,0.2)",
                  borderColor: "#FFD7C4",
                  color: "white",
                  cursor: isStepValid() ? "pointer" : "not-allowed",
                  opacity: isStepValid() ? 1 : 0.5,
                }}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRegister}
                disabled={!isStepValid() || isLoading}
                className="px-6 py-2 rounded-2xl font-medium transition-all duration-200 text-sm"
                style={{
                  backgroundColor:
                    isStepValid() && !isLoading
                      ? "#FF9874"
                      : "rgba(255,255,255,0.2)",
                  color: "white",
                  cursor:
                    isStepValid() && !isLoading ? "pointer" : "not-allowed",
                  opacity: isStepValid() && !isLoading ? 1 : 0.5,
                }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/signin")} // or your signin route
              className="font-medium transition-colors hover:underline"
              style={{ color: "#FFD7C4" }}
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>

      {/* Marketing Text - Outside the card */}
      <motion.div
        className="mt-6 text-center max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-black/100 text-sm leading-relaxed">
          Serve your customers 24/7 with AI agents that work automatically.
          Increase sales, improve support, and grow your business faster. All in
          one powerful AI + CRM Omnichannel platform.
        </p>
      </motion.div>
    </div>
  );
}
