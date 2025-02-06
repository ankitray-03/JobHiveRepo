import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import { Link, useParams } from "react-router";
import axios from "axios";

const NewPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();

  // Password validation checks
  const passwordValidations = [
    {
      check: (pw) => pw.length >= 8,
      message: "At least 8 characters long",
    },
    {
      check: (pw) => /[A-Z]/.test(pw),
      message: "Contains an uppercase letter",
    },
    {
      check: (pw) => /[a-z]/.test(pw),
      message: "Contains a lowercase letter",
    },
    {
      check: (pw) => /[0-9]/.test(pw),
      message: "Contains a number",
    },
    {
      check: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
      message: "Contains a special character",
    },
  ];

  // Validate password on change
  useEffect(() => {
    const errors = passwordValidations
      .filter((validation) => !validation.check(password))
      .map((validation) => validation.message);

    setValidationErrors(errors);

    // Calculate password strength
    const strength = passwordValidations.filter((validation) =>
      validation.check(password)
    ).length;
    setPasswordStrength(strength);
  }, [password]);

  // Password strength color
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
      case 3:
        return "bg-yellow-500";
      case 4:
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (validationErrors.length > 0) {
      alert("Please resolve password validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate backend password reset call
      const response = await axios.post(
        `/api/auth/reset-password/${params.resetToken}`,
        {
          password: password,
        }
      );

      const result = response.data;

      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.message || "Password reset failed");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center mb-6"
          >
            <ShieldCheck className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Set New Password
            </h2>
          </motion.div>

          {/* Success State */}
          <AnimatePresence>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center mb-4">
                  <Check className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Password Reset Successful
                </h3>
                <p className="text-gray-600">
                  You can now log in with your new password.
                </p>
                <Link to="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Login
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password Input */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3 border-2 rounded-lg 
                        focus:outline-none focus:border-blue-500 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="mt-2 flex space-x-1">
                    {[1, 2, 3, 4, 5].map((segment) => (
                      <div
                        key={segment}
                        className={`h-1 flex-1 rounded-full ${
                          segment <= passwordStrength
                            ? getStrengthColor()
                            : "bg-gray-300"
                        } transition-colors`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="confirm-password"
                    className="block text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg 
                        focus:outline-none transition-all duration-300
                        ${
                          password !== confirmPassword && confirmPassword
                            ? "border-red-500"
                            : "focus:border-blue-500"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Validation Errors */}
                <AnimatePresence>
                  {validationErrors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                      <div className="flex items-center text-red-600 mb-2">
                        <AlertCircle className="mr-2 w-5 h-5" />
                        <span>Password must:</span>
                      </div>
                      <ul className="list-disc pl-6 text-red-600 text-sm">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || validationErrors.length > 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 
                    ${
                      isSubmitting || validationErrors.length > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      Resetting...
                    </motion.div>
                  ) : (
                    "Reset Password"
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NewPasswordForm;
