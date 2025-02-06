import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { verificationSuccess } from "../../store/user/UserSlice.js";

const OTPInput = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    // Only allow numeric input
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Clear any previous errors
    setError("");
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // Allow only numeric and control keys
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
      )
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP (all fields must be filled)
    if (otp.some((digit) => !digit)) {
      setError("Please fill in all OTP digits");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate backend call
      const code = Number(otp.join(""));

      const response = await axios.post("/api/auth/verify-email", {
        code: code,
        email: currentUser.email,
      });

      if (response.data.success) {
        setIsSuccess(true);
        dispatch(verificationSuccess());
        // Additional success handling (e.g., redirect)
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").map(Number);
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  // Reset form
  const handleReset = () => {
    setOtp(new Array(6).fill(""));
    setError("");
    setIsSuccess(false);
    inputRefs.current[0].focus();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-16 text-center text-2xl border-2 rounded-lg focus:outline-none focus:ring-2 
                ${
                  error
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
                }
                transition-all duration-300`}
            />
          ))}
        </div>

        {/* Error Message Animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-red-600 text-sm mt-2"
            >
              <AlertCircle className="mr-2 w-5 h-5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button with Loading and Success States */}
        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={isSubmitting || isSuccess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : isSuccess
                  ? "bg-green-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              flex items-center justify-center`}
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                <Check className="mr-2" />
                Verified
              </motion.div>
            ) : isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              >
                Verifying...
              </motion.div>
            ) : (
              "Verify OTP"
            )}
          </motion.button>
        </div>
      </form>

      {/* Reset Button */}
      {/* {(error || isSuccess) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleReset}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 mx-auto block"
        >
          Reset

        </motion.button>
      )} */}
    </div>
  );
};

export default OTPInput;
