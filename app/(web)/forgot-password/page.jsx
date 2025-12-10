"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
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

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "", visible: false });

  const showToast = (type, text) => {
    setToast({ type, text, visible: true });
    if (type === 'error') {
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ text: "", type: "", visible: false });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", data.message || "Password reset link sent to your email!");
        setEmail("");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        showToast("error", data.message || "Failed to send reset link");
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
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
            <p className="mt-2 text-sm text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <CommonButton
              type="submit"
              label={loading ? "Sending..." : "Send Reset Link"}
              disabled={loading}
              className={`w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800 text-center">
            🔒 For security reasons, the reset link will expire in 1 hour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
