"use client";
import React, { useState } from "react";
import CommonButton from "../../components/ul/Button";
import { useRouter } from "next/navigation";

const InputField = ({ label, name, value, onChange, type = "text", required = false, placeholder, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
    />
  </div>
);

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Login successful!" });
        // Store token in localStorage or cookie
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect logic would go here, e.g., to dashboard or home
         setTimeout(() => {
           if(data.user.role === 'admin') {
             router.push('/admin/dashboard');
           } else {
             router.push('/dashboard');
           }
         }, 1000);
      } else {
        setMessage({ type: "error", text: data.message || "Login failed." });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-dm-sans">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[var(--primary)] px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
            <p className="text-blue-100 text-center mt-2">Login to your account</p>
        </div>
        
        <div className="p-8">
          {message.text && (
            <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField 
              label="Email Address" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              type="email" 
              required 
              placeholder="john@example.com" 
            />
            
            <div className="space-y-1">
              <InputField 
                label="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                type="password" 
                required 
                placeholder="••••••••" 
              />
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm font-medium text-[var(--primary)] hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <CommonButton
                type="submit"
                label={loading ? "Logging in..." : "Login"}
                disabled={loading}
                className={`w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account? <a href="/register" className="text-[var(--primary)] font-semibold hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
