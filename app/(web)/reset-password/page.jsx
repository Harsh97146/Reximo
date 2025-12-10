"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, CheckCircle, XCircle, Check, X } from "lucide-react";
import CommonButton from "../../components/ul/Button";

const ToastNotification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg transition-all duration-300 transform translate-y-0 min-w-[300px] ${
      type === 'success' ? 'bg-[#4CAF50] text-white' : 'bg-[#F44336] text-white'
    }`}>
      <div className="mr-3 bg-white rounded-full p-0.5">
        {type === 'success' ? <CheckCircle className="w-5 h-5 text-[#4CAF50]" fill="white" /> : <XCircle className="w-5 h-5 text-[#F44336]" fill="white" />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-white text-base">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "", visible: false });
  const [token, setToken] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      showToast("error", "Invalid or missing reset token");
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router]);

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidation(validatePassword(newPassword));
  };

  const showToast = (type, text) => {
    setToast({ type, text, visible: true });
    if (type === 'error') {
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password requirements
    const allPasswordRequirementsMet = Object.values(passwordValidation).every(val => val === true);
    if (!allPasswordRequirementsMet) {
      showToast("error", "Please ensure your password meets all the requirements.");
      return;
    }

    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    setLoading(true);
    setToast({ text: "", type: "", visible: false });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", "Password reset successful! Redirecting to login...");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        showToast("error", data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-dm-sans relative">
      {toast.visible && (
        <ToastNotification 
          message={toast.text} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, visible: false })} 
        />
      )}

      <div className="max-w-md w-full space-y-8">
        {/* Back to Login */}
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Login</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              
              {/* Password Requirements */}
              {(passwordFocused || password) && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      {passwordValidation.minLength ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                      <span className={passwordValidation.minLength ? "text-green-600" : "text-gray-600"}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordValidation.hasUpperCase ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                      <span className={passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-600"}>
                        At least 1 uppercase letter (A-Z)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordValidation.hasLowerCase ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                      <span className={passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-600"}>
                        At least 1 lowercase letter (a-z)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordValidation.hasNumber ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                      <span className={passwordValidation.hasNumber ? "text-green-600" : "text-gray-600"}>
                        At least 1 number (0-9)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordValidation.hasSpecialChar ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                      <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-gray-600"}>
                        At least 1 special character (!@#$%^&*...)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            <CommonButton
              type="submit"
              label={loading ? "Resetting..." : "Reset Password"}
              disabled={loading || !token}
              className={`w-full ${loading || !token ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </form>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800 text-center">
            🔒 Your password will be encrypted and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
