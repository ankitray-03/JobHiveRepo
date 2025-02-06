import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Lock, AlertCircle, Check } from "lucide-react";
import axios from "axios";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous states
    setError("");
    setIsSubmitting(true);

    // Validate email
    if (!email) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate password reset request
      const response = await axios.post("/api/auth/forgot-password", {
        email: email,
      });

      const result = response.data;

      // Handle different response scenarios
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || "Failed to send reset link");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
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
            <Lock className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
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
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent a password reset link to {email}. Please check your
                  inbox (and spam folder).
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Another Email
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none 
                        ${
                          error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }
                        transition-all duration-300`}
                    />
                  </div>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center text-red-600 text-sm"
                    >
                      <AlertCircle className="mr-2 w-5 h-5" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 
                    ${
                      isSubmitting
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
                      Sending...
                    </motion.div>
                  ) : (
                    <>
                      <KeyRound className="mr-2" />
                      Send Reset Link
                    </>
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

export default PasswordResetForm;
